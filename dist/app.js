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
const app = (0, express_1.default)();
(0, db_1.connectDB)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
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
app.use('/api', urlRoutes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map