// src/utils/env.js

import dotenv from 'dotenv';

dotenv.config();

export const config = {
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT || 3000,
};
