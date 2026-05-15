# ----- Server image -----
# Use a small Node 20 image. Node 20 is LTS and works with all the libs we use.
FROM node:20-alpine

# Create app dir
WORKDIR /app

# Install deps first (separate from copying source) so Docker can cache this
# layer when only source changes — much faster rebuilds.
COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund

# Copy the rest of the source
COPY . .

# Make sure the uploads dir exists inside the container.
# In production we'd mount this as a volume so files persist across restarts.
RUN mkdir -p uploads

# Document the port the server listens on
EXPOSE 7500

# Start the server
CMD ["node", "index.js"]
