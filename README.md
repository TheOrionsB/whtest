# WebHook Tester

A real-time webhook testing and monitoring tool built with Express.js, TypeScript, and Socket.io.

## Features

- 🚀 Real-time webhook logging with WebSocket connections
- 📊 Beautiful web interface with live log display
- 🔗 Captures all HTTP methods (GET, POST, PUT, DELETE, PATCH, etc.)
- 📝 Displays method, URL, query parameters, request body, and headers
- 🎯 Wildcard endpoint handling - any path except `/` is treated as a webhook
- 💻 Built with TypeScript for type safety
- 🎨 Modern, responsive UI with syntax highlighting

## Quick Start

1. Install dependencies:
```bash
yarn install
```

2. Start the development server:
```bash
yarn dev
```

3. Open your browser to `http://localhost:3000`

4. Send webhook requests to any endpoint:
```bash
# Examples:
curl -X POST http://localhost:3000/webhook/test -H "Content-Type: application/json" -d '{"test": true}'
curl -X GET http://localhost:3000/api/payment?user=123
curl -X PUT http://localhost:3000/webhook/github -d "payload data"
```

## Scripts

- `yarn dev` - Start development server with hot reload
- `yarn dev:watch` - Start development server with auto-restart on file changes
- `yarn build` - Build for production
- `yarn start` - Start production server

## API Endpoints

- `GET /` - Webhook testing interface
- `*` - All other paths are treated as webhook endpoints and will be logged

## Production Build

```bash
yarn build
yarn start
```

## Docker Setup

### Using Docker Compose (Recommended)

1. **Start the application:**
```bash
docker-compose up -d
```

2. **View logs:**
```bash
docker-compose logs -f
```

3. **Stop the application:**
```bash
docker-compose down
```

### Using Docker directly

1. **Build the image:**
```bash
docker build -t webhook-tester .
```

2. **Run the container:**
```bash
docker run -d -p 3000:3000 --name webhook-tester webhook-tester
```

The application will be available at `http://localhost:3000`

## Environment Variables

- `PORT` - Server port (default: 3000)

## Tech Stack

- **Backend**: Express.js, TypeScript, Socket.io
- **Frontend**: Vanilla JavaScript, Socket.io client
- **Build**: TypeScript compiler
- **Package Manager**: Yarn