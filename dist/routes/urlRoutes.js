"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const urlController_1 = require("../controllers/urlController");
const rateLimiter_1 = require("../middlewares/rateLimiter");
const loggerMiddleware_1 = require("../middlewares/loggerMiddleware");
const router = (0, express_1.Router)();
router.use(loggerMiddleware_1.loggerMiddleware);
router.post('/shorten', rateLimiter_1.rateLimiterMiddleware, urlController_1.createShortUrl);
router.get('/:shortUrl', urlController_1.getShortUrl);
router.get('/qr/:shortUrl', urlController_1.getQRCode);
router.get('/history', urlController_1.getLinkHistory);
exports.default = router;
//# sourceMappingURL=urlRoutes.js.map