import { Request, Response } from 'express';
import { shortenUrl, generateQRCode } from '../services/urlService';
import URL from '../models/urlModel';

export const createShortUrl = async (req: Request, res: Response) => {
  try {
    const { originalUrl, customUrl } = req.body;
    console.log(`Received request to create short URL: ${originalUrl} with custom URL: ${customUrl}`);
    const url = await shortenUrl(originalUrl, customUrl);
    console.log(`Short URL created: ${JSON.stringify(url)}`);
    res.json({ shortUrl: url.shortUrl, customUrl: url.customUrl });
  } catch (error) {
    console.error('Error creating short URL', error);
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getShortUrl = async (req: Request, res: Response) => {
  try {
    const { shortUrl } = req.params;
    console.log(`Received request to get original URL for short URL: ${shortUrl}`);
    const url = await URL.findOne({ shortUrl });

    if (!url) {
      console.log('URL not found');
      return res.status(404).json({ error: 'URL not found' });
    }

    url.clicks += 1;
    await url.save();
    console.log(`URL found and click count updated: ${JSON.stringify(url)}`);

    res.redirect(url.originalUrl);
  } catch (error) {
    console.error('Server error', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getQRCode = async (req: Request, res: Response) => {
  try {
    const { shortUrl } = req.params;
    console.log(`Received request to generate QR code for short URL: ${shortUrl}`);
    const url = await URL.findOne({ shortUrl });

    if (!url) {
      console.log('URL not found');
      return res.status(404).json({ error: 'URL not found' });
    }

    const qrCodeData = await generateQRCode(url.shortUrl);
    console.log('QR code generated successfully');
    res.json({ qrCode: qrCodeData });
  } catch (error) {
    console.error('Server error', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getLinkHistory = async (_req: Request, res: Response) => {
  try {
    console.log('Received request to get link history');
    const urls = await URL.find();
    console.log(`Link history retrieved: ${JSON.stringify(urls)}`);
    res.json(urls);
  } catch (error) {
    console.error('Server error', error);
    res.status(500).json({ error: 'Server error' });
  }
};