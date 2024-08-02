"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLinkHistory = exports.getQRCode = exports.getShortUrl = exports.createShortUrl = void 0;
const urlService_1 = require("../services/urlService");
const urlModel_1 = __importDefault(require("../models/urlModel"));
const createShortUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { originalUrl, customUrl } = req.body;
        console.log(`Received request to create short URL: ${originalUrl} with custom URL: ${customUrl}`);
        const result = yield (0, urlService_1.shortenUrl)(originalUrl, customUrl);
        const url = result.url;
        console.log(`Short URL created: ${JSON.stringify(url)}`);
        res.json({ shortUrl: url.shortUrl, originalUrl: url.originalUrl, clicks: url.clicks, _id: url._id, createdAt: url.createdAt, __v: url.__v });
    }
    catch (error) {
        console.error('Error creating short URL', error);
        res.status(400).json({ error: error.message });
    }
});
exports.createShortUrl = createShortUrl;
const getShortUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { shortUrl } = req.params;
        console.log(`Received request to get original URL for short URL: ${shortUrl}`);
        const url = yield urlModel_1.default.findOne({ shortUrl });
        if (!url) {
            console.log('URL not found');
            return res.status(404).json({ error: 'URL not found' });
        }
        url.clicks += 1;
        yield url.save();
        console.log(`URL found and click count updated: ${JSON.stringify(url)}`);
        res.redirect(url.originalUrl);
    }
    catch (error) {
        console.error('Server error', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.getShortUrl = getShortUrl;
const getQRCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { shortUrl } = req.params;
        console.log(`Received request to generate QR code for short URL: ${shortUrl}`);
        const url = yield urlModel_1.default.findOne({ shortUrl });
        if (!url) {
            console.log('URL not found');
            return res.status(404).json({ error: 'URL not found' });
        }
        const qrCodeData = yield (0, urlService_1.generateQRCode)(url.shortUrl);
        console.log('QR code generated successfully');
        res.json({ qrCode: qrCodeData });
    }
    catch (error) {
        console.error('Server error', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.getQRCode = getQRCode;
const getLinkHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Received request to get link history');
        const urls = yield urlModel_1.default.find();
        console.log(`Link history retrieved: ${JSON.stringify(urls)}`);
        res.json(urls);
    }
    catch (error) {
        console.error('Server error', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.getLinkHistory = getLinkHistory;
//# sourceMappingURL=urlController.js.map