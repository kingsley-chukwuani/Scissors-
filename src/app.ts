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

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static('public'));

// Middleware to log incoming requests
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log('Request body:', req.body);
  next();
});

// Define a route to render the EJS template
app.get('/', (req, res) => {
  res.render('index', { originalUrl: '', errorMessage: '' });
});


// Serve static files (if any)
app.use(express.static(path.join(__dirname, 'public')));


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