import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.raw({ limit: '10mb' }));
app.use(express.text({ limit: '10mb' }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Frontend endpoint
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Socket.io connection for logging
io.on('connection', (socket) => {
  console.log('Client connected to logging socket');
  
  socket.on('disconnect', () => {
    console.log('Client disconnected from logging socket');
  });
});

// Function to log webhook requests
const logWebhookRequest = (method: string, url: string, query: any, body: any, headers: any) => {
  const logMessage = {
    timestamp: new Date().toISOString(),
    method,
    url,
    query,
    body,
    headers,
    userAgent: headers['user-agent']
  };
  
  console.log('Webhook received:', logMessage);
  io.emit('webhook-log', logMessage);
};

// Wildcard route handlers for all HTTP methods
const handleWebhook = (req: express.Request, res: express.Response) => {
  // Skip the root path and socket.io paths
  if (req.path === '/' || req.path.startsWith('/socket.io')) {
    return;
  }
  
  logWebhookRequest(
    req.method,
    req.originalUrl,
    req.query,
    req.body,
    req.headers
  );
  
  res.status(200).json({
    message: 'Webhook received',
    method: req.method,
    url: req.originalUrl,
    timestamp: new Date().toISOString()
  });
};

// Register wildcard handlers for all HTTP methods
app.all('*', handleWebhook);

server.listen(PORT, () => {
  console.log(`Webhook tester server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} to view the frontend`);
});
