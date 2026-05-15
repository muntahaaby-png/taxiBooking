# Taxi — Docker Setup

This project ships with Dockerfiles for both the client and server, plus a
`docker-compose.yml` that runs the whole stack with one command.

## Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) installed and running
- A `taxi-server/.env` file with your secrets (it's already there for local dev)
- MongoDB Atlas (or any MongoDB) reachable from your machine — and if it's Atlas,
  the IP allowlist should include either your machine's IP or `0.0.0.0/0`

## Quick start

From this directory (the `Taxi/` folder):

```bash
docker compose up --build
```

That builds both images and starts the stack. Once you see:

```
taxi-server  | 🚀 Server running on port 7500
taxi-client  | nginx ... start worker process
```

open **http://localhost:5173** in your browser.

## What's running

| Service       | Host port | Container port | What it does                             |
|---------------|-----------|----------------|------------------------------------------|
| `taxi-server` | 7500      | 7500           | Express API, connects to MongoDB         |
| `taxi-client` | 5173      | 80             | Vite build served by nginx               |

## Common commands

```bash
docker compose up --build           # build + start (foreground)
docker compose up -d --build        # build + start (background)
docker compose down                 # stop and remove containers
docker compose down -v              # also delete the uploads volume
docker compose logs -f taxi-server  # tail server logs
docker compose logs -f taxi-client  # tail client logs
docker compose ps                   # see container status
docker compose restart taxi-server  # restart just one service
```

## What persists between restarts

- **Uploaded files** (driver licenses, profile photos) live in the named
  Docker volume `taxi-uploads`. They survive `docker compose down` but get
  wiped if you run `docker compose down -v`.
- **MongoDB data** is in Atlas (external), not in any container, so it's
  always safe.

## Troubleshooting

**Port already in use.** Some other process is bound to 5173 or 7500. Either
stop it, or change the host-side port in `docker-compose.yml` (e.g. `8080:80`).

**Server exits immediately.** Check `docker compose logs taxi-server`. The
two usual causes are:
1. `MONGODB_URI environment variable is not set` — make sure `taxi-server/.env`
   exists and contains it.
2. MongoDB Atlas refusing the connection — add `0.0.0.0/0` to your Atlas
   Network Access allowlist.

**Client loads but API calls fail with CORS errors.** Make sure the server
container is running and the host port mapping for 7500 is intact. The
client talks to `http://localhost:7500` from the browser, which goes through
your host's 7500 → server container's 7500.

**I changed code and don't see the update.** Add `--build` to the `up`
command, or rebuild the affected image: `docker compose build taxi-client`.
