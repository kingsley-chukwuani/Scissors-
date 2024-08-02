import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import urlRoutes from './routes/urlRoutes';
import { connectDB } from './config/db';

const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log('Request body:', req.body);
  next();
});

// Middleware to log outgoing responses
app.use((req, res, next) => {
  const originalSend = res.send.bind(res);
  res.send = (body) => {
    console.log(`Outgoing response: ${res.statusCode}`);
    console.log('Response body:', body);
    return originalSend(body);
  };
  next();
});

app.use('/api', urlRoutes);

export default app;