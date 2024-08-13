import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import urlRoutes from './routes/urlRoutes';
import { connectDB } from './config/db';
const path = require('path');

const app = express();

// Connect to the database
connectDB();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

// Middleware to log incoming requests
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log('Request body:', req.body);
  next();
});

// API routes
app.use('/api', urlRoutes);

// Middleware to log outgoing responses
app.use((_req: Request, res: Response, next: NextFunction) => {
  const originalSend = res.send.bind(res);
  res.send = (body) => {
    console.log(`Outgoing response: ${res.statusCode}`);
    console.log('Response body:', body);
    return originalSend(body);
  };
  next();
});

// Basic error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;