import { Request, Response, NextFunction } from 'express';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
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