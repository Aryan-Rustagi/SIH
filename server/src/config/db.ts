import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tourist_safety_db';

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB] Connection error: ${(error as Error).message}`);
    throw new Error('MongoDB is unavailable. Check MONGO_URI, network access, and Atlas IP allowlist.');
  }

  mongoose.connection.on('disconnected', () => {
    console.warn('[MongoDB] Disconnected from database');
  });

  mongoose.connection.on('error', (err) => {
    console.error(`[MongoDB] Runtime error: ${err.message}`);
  });
};
