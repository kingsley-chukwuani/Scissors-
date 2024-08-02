import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
    });
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('MongoDB connection error:', (error as any).message);
    process.exit(1);
  }
};

export const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed...');
  } catch (error: any) {
    console.error('MongoDB disconnection error:', error.message);
  }
};
