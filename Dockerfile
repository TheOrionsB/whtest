# Use Node.js 18 LTS as base image
FROM node:24-alpine3.21

RUN apk update && apk upgrade

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Set environment variable
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
