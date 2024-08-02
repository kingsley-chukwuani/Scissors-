"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
const loggerMiddleware = (req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    console.log(`Request body: ${JSON.stringify(req.body)}`);
    const originalSend = res.send.bind(res);
    res.send = function (body) {
        console.log(`Outgoing response: ${res.statusCode}`);
        console.log(`Response body: ${body}`);
        return originalSend(body);
    };
    next();
};
exports.loggerMiddleware = loggerMiddleware;
//# sourceMappingURL=loggerMiddleware.js.map