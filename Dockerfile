# Use Node LTS image
FROM node:16-alpine

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install && npm cache clean --force

# Copy source
COPY . .

# Expose default port used by gulp connect
EXPOSE 8080

# Default command serves the project
CMD ["npx", "gulp", "serve"]
