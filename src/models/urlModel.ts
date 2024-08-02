import mongoose, { Document, Schema } from 'mongoose';

export interface IURL extends Document {
  originalUrl: string;
  shortUrl: string;
  customUrl?: string;
  clicks: number;
  createdAt: Date;
}

const urlSchema = new Schema<IURL>({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  customUrl: { type: String, unique: true },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const UrlModel = mongoose.model<IURL>('URL', urlSchema);

export default UrlModel;