# ----- Client image -----
# Stage 1: build the React app with Vite
FROM node:20-alpine AS build

WORKDIR /app

# Install deps (cached unless package.json changes)
COPY package.json ./
RUN npm install --no-audit --no-fund

# Copy source and produce the static bundle in /app/dist
COPY . .
RUN npm run build


# Stage 2: serve the static bundle with nginx
# Using alpine for a tiny final image (~50 MB total)
FROM nginx:alpine

# Replace nginx's default config with our SPA-friendly one
# (so /login, /home etc. don't 404 on browser refresh)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built static files into nginx's web root
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# nginx:alpine already has the right CMD, but be explicit
CMD ["nginx", "-g", "daemon off;"]
