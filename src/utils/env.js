import dotenv from 'dotenv';

dotenv.config();

export const env = (key, defaultValue = undefined) => {
  return process.env[key] || defaultValue;
};
