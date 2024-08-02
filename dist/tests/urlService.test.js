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
const mongoose_1 = __importDefault(require("mongoose"));
const urlService_1 = require("../services/urlService");
const urlModel_1 = __importDefault(require("../models/urlModel"));
const db_1 = require("../config/db"); // Assuming you have a closeDB function in db.ts
// Setup and Teardown
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.connectDB)();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.dropDatabase();
    yield (0, db_1.closeDB)();
}));
// URL Shortening Service Test Suite
describe('URL Shortening Service', () => {
    // Test shortening a valid URL
    it('should shorten a valid URL', () => __awaiter(void 0, void 0, void 0, function* () {
        const url = yield (0, urlService_1.shortenUrl)('https://example.com');
        expect(url.shortUrl).toBeDefined();
        expect(url.originalUrl).toBe('https://example.com');
    }));
    // Test handling of invalid URLs
    it('should throw an error for an invalid URL', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((0, urlService_1.shortenUrl)('invalid-url')).rejects.toThrow('Invalid URL');
    }));
    // Test creating a shortened URL with a custom alias
    it('should create a shortened URL with a custom alias', () => __awaiter(void 0, void 0, void 0, function* () {
        const url = yield (0, urlService_1.shortenUrl)('https://example.com', 'custom-alias');
        expect(url.shortUrl).toBe('custom-alias');
    }));
    // Test returning the same shortened URL for an already shortened original URL
    it('should return the same shortened URL if the original URL was already shortened', () => __awaiter(void 0, void 0, void 0, function* () {
        const firstShorten = yield (0, urlService_1.shortenUrl)('https://example.com');
        const secondShorten = yield (0, urlService_1.shortenUrl)('https://example.com');
        expect(secondShorten.shortUrl).toBe(firstShorten.shortUrl);
    }));
    // Test generating a QR code for a valid shortened URL
    it('should generate a QR code for a valid shortened URL', () => __awaiter(void 0, void 0, void 0, function* () {
        const url = yield (0, urlService_1.shortenUrl)('https://example.com');
        const qrCode = yield (0, urlService_1.generateQRCode)(url.shortUrl);
        expect(qrCode).toBeDefined();
    }));
    // Test tracking the number of clicks on a shortened URL
    it('should track the number of clicks on a shortened URL', () => __awaiter(void 0, void 0, void 0, function* () {
        const url = yield (0, urlService_1.shortenUrl)('https://example.com');
        yield urlModel_1.default.updateOne({ shortUrl: url.shortUrl }, { $inc: { clicks: 1 } }); // Simulate a click
        const updatedUrl = yield urlModel_1.default.findOne({ shortUrl: url.shortUrl });
        expect(updatedUrl.clicks).toBe(1);
    }));
});
//# sourceMappingURL=urlService.test.js.map