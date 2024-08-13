"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const urlRoutes_1 = __importDefault(require("./routes/urlRoutes"));
const db_1 = require("./config/db");
const path = require('path');
const app = (0, express_1.default)();
// Connect to the database
(0, db_1.connectDB)();
// Middleware setup
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Serve static files
app.use(express_1.default.static('public'));
// Middleware to log incoming requests
app.use((req, _res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    console.log('Request body:', req.body);
    next();
});
// Define a route to render the EJS template
app.get('/', (req, res) => {
    res.render('index', { originalUrl: '', errorMessage: '' });
});
// Serve static files (if any)
app.use(express_1.default.static(path.join(__dirname, 'public')));
// API routes
app.use('/api', urlRoutes_1.default);
// Middleware to log outgoing responses
app.use((_req, res, next) => {
    const originalSend = res.send.bind(res);
    res.send = (body) => {
        console.log(`Outgoing response: ${res.statusCode}`);
        console.log('Response body:', body);
        return originalSend(body);
    };
    next();
});
// Basic error handling middleware
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
exports.default = app;
//# sourceMappingURL=app.js.map