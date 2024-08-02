import UrlModel, { IURL } from '../models/urlModel';
import { isValidUrl } from '../utils/validateUrl';
import shortid from 'shortid';
import NodeCache from 'node-cache';
import QRCode from 'qrcode';

const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

export const shortenUrl = async (originalUrl: string, customUrl?: string): Promise<IURL> => {
  console.log(`Received request to shorten URL: ${originalUrl} with custom URL: ${customUrl}`);

  if (!isValidUrl(originalUrl)) {
    console.error('Invalid URL');
    throw new Error('Invalid URL');
  }

  let url = cache.get<IURL>(originalUrl);

  if (!url) {
    const shortUrl = customUrl || shortid.generate();

    url = new UrlModel({
      originalUrl,
      shortUrl,
      customUrl,
    });

    try {
      await url.save();
      cache.set(originalUrl, url);
      console.log(`URL saved to database: ${JSON.stringify(url)}`);
    } catch (error) {
      console.error('Error saving URL to the database', error);
      throw new Error('Error saving URL to the database');
    }
  } else {
    console.log(`URL retrieved from cache: ${JSON.stringify(url)}`);
  }

  return url;
};

export const generateQRCode = async (url: string): Promise<string> => {
  console.log(`Received request to generate QR code for URL: ${url}`);

  try {
    const qrCodeData = await QRCode.toDataURL(url);
    console.log('QR code generated successfully');
    return qrCodeData;
  } catch (error) {
    console.error('Error generating QR code', error);
    throw new Error('Error generating QR code');
  }
};