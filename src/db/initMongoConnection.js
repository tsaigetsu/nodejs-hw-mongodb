// src/db/initMongoConnections.js

import mongoose from 'mongoose';

import mongoose from 'mongoose';
import { config } from '../utils/env.js';

export const initMongoConnections = async () => {
  try {
    await mongoose.connect(config.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
