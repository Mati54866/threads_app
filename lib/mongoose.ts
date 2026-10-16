import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URL) {
    console.error('MONGODB_URL not found in environment variables');
    throw new Error('MONGODB_URL environment variable is required');
  }

  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    isConnected = false;
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
};