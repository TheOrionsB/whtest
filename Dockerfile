# Use Node.js 24 LTS as base image
FROM node:24-alpine3.21

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json ./
COPY package-lock.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Remove dev dependencies to reduce image size
RUN npm ci --only=production && npm cache clean --force

# Expose port 3000
EXPOSE 3000

# Set environment variable
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
