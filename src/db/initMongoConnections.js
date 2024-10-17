// src/db/initMongoConnections.js

import mongoose from 'mongoose';
import { env } from '../utils/env.js';

export const initMongoConnections = async () => {
  try {
    const MONGODB_USER = env('MONGODB_USER');
    const MONGODB_PASSWORD = env('MONGODB_PASSWORD');
    const MONGODB_URL = env('MONGODB_URL');
    const MONGODB_DB = env('MONGODB_DB');

    if (!MONGODB_USER || !MONGODB_PASSWORD || !MONGODB_URL || !MONGODB_DB) {
      throw new Error('MongoDB connection details are missing in environment variables');
    }

    const DB_URL = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

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
