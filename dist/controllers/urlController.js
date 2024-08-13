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
// Create Short URL
const createShortUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { originalUrl, customUrl } = req.body;
        const url = yield (0, urlService_1.shortenUrl)(originalUrl, customUrl);
        res.status(200).json(url); // Fixed typo in status method
    }
    catch (error) {
        console.error('Error creating short URL:', error);
        res.status(400).json({ error: error.message });
    }
});
exports.createShortUrl = createShortUrl;
// Handle redirection from the short URL
const getShortUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { shortUrl } = req.params;
        const url = yield urlModel_1.default.findOne({ shortUrl });
        if (!url) {
            res.status(404).json({ error: 'URL not found' });
            return; // Ensure the function exits after sending the response
        }
        // Increment the click count for analytics
        url.clicks += 1;
        yield url.save();
        // Redirect to the original URL
        res.redirect(url.originalUrl);
    }
    catch (error) {
        console.error('Error redirecting to original URL:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.getShortUrl = getShortUrl;
// Generate QR Code for a short URL
const getQRCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { shortUrl } = req.params;
        const url = yield urlModel_1.default.findOne({ shortUrl });
        if (!url) {
            res.status(404).json({ error: 'URL not found' });
            return; // Ensure the function exits after sending the response
        }
        // Generate the QR code
        const qrCodeData = yield (0, urlService_1.generateQRCode)(shortUrl);
        res.status(200).json({ qrCode: qrCodeData });
    }
    catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.getQRCode = getQRCode;
// Fetch link history
const getLinkHistory = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const urls = yield urlModel_1.default.find();
        res.status(200).json(urls);
    }
    catch (error) {
        console.error('Error fetching link history:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.getLinkHistory = getLinkHistory;
//# sourceMappingURL=urlController.js.map