import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

// Route Imports
import authRoutes from './routes/authRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import routeRoutes from './routes/routeRoutes.js';
import disruptionRoutes from './routes/disruptionRoutes.js';
import deliveryRoutes from './routes/deliveryRoutes.js';
import fieldReportRoutes from './routes/fieldReportRoutes.js';
import alertRoutes from './routes/alertRoutes.js';
import districtRoutes from './routes/districtRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
const allowedOrigins = CLIENT_URL.split(',').map((origin) => origin.trim()).filter(Boolean);

const defaultAllowed = [
  'http://localhost:3000',
  'http://localhost:3002',
  'http://localhost:5173',
];

// Setup Socket.IO
const io = new SocketIOServer(server, {
  cors: {
    origin: [...new Set([...allowedOrigins, ...defaultAllowed])],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true,
  },
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`[Socket.io] Client connected: ${socket.id}`);

  socket.on('join_command_center', () => {
    socket.join('command_center_channel');
    console.log(`[Socket.io] Socket ${socket.id} joined command center channel`);
  });

  socket.on('disconnect', () => {
    console.log(`[Socket.io] Client disconnected: ${socket.id}`);
  });
});

// Middleware
app.use(
  cors({
    origin: [...new Set([...allowedOrigins, ...defaultAllowed])],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'NER Logistics API',
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/disruptions', disruptionRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/field-reports', fieldReportRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/districts', districtRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/weather', weatherRoutes);

// Serve static uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Global Error Handler
app.use(errorHandler);

// Start Server & Connect to DB
const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`===========================================`);
      console.log(`🚀 NER Logistics API running on port ${PORT}`);
      console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
      console.log(`===========================================`);
    });
  } catch (error) {
    console.error(`[Server] Startup aborted: ${(error as Error).message}`);
    process.exitCode = 1;
  }
};

startServer();

export { app, server, io };
