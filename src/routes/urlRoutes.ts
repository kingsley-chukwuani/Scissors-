import { Router } from 'express';
import { createShortUrl, getShortUrl, getQRCode, getLinkHistory } from '../controllers/urlController';
import { rateLimiterMiddleware } from '../middlewares/rateLimiter';
import { loggerMiddleware } from '../middlewares/loggerMiddleware'; 

const router = Router();

router.use(loggerMiddleware);

router.post('/shorten', rateLimiterMiddleware, createShortUrl);
router.get('/history', getLinkHistory);
router.get('/:shortUrl', getShortUrl);
router.get('/qr/:shortUrl', getQRCode);

export default router;