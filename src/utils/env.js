//src/utils/env.js

import dotenv from 'dotenv';
dotenv.config();

export const env = (key, defaultValue = undefined) => process.env[key] || defaultValue;

export const getMongoDbUrl = () => {
  const user = env('MONGODB_USER');
  const password = env('MONGODB_PASSWORD');
  const clusterUrl = env('MONGODB_URL');
  const dbName = env('MONGODB_DB');

  if (!user || !password || !clusterUrl || !dbName) {
    throw new Error('MongoDB connection details are missing in environment variables');
  }

  return `mongodb+srv://${user}:${password}@${clusterUrl}/${dbName}?retryWrites=true&w=majority`;
};
