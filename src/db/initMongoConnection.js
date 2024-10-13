// src/db/initMongoConnections.js

import mongoose from 'mongoose';
import { env } from '../utils/env.js';

export const initMongoConnections = async () => {
  try {
    const DB_URL = env('DB_URL');
    if (!DB_URL) {
      throw new Error('DB_URL is not defined in environment variables');
    }
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
