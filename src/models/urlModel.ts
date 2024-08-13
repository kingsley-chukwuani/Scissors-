import mongoose, { Document, Schema } from 'mongoose';

export interface IURL extends Document {
  originalUrl: string;
  shortUrl: string;
  customUrl?: string;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
}

const urlSchema = new Schema<IURL>(
  {
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    customUrl: { type: String, unique: true, sparse: true }, // sparse index to allow multiple documents without this field
    clicks: { type: Number, default: 0 },
  },
  {
    timestamps: true, // automatically manage createdAt and updatedAt fields
  }
);

// Add indexes for better query performance
urlSchema.index({ shortUrl: 1 });
urlSchema.index({ customUrl: 1 });

const UrlModel = mongoose.model<IURL>('URL', urlSchema);

export default UrlModel;