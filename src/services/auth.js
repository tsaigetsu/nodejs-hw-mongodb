//src/services.auth.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
import { User } from '../db/models/user.js';

export const register = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Username, password, and email are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, env('JWT_SECRET'), { expiresIn: '1h' });

    res.status(201).json({ userId: user._id, token });
  } catch (error) {
    console.error(`Error during registration: ${error.message}`);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, env('JWT_SECRET'), { expiresIn: '1h' });

    res.status(200).json({ userId: user._id, token });
  } catch (error) {
    console.error(`Error during login: ${error.message}`);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const createSessionService = async (userId) => {
  const accessToken = jwt.sign({ userId }, env('JWT_SECRET'), { expiresIn: '1h' });
  const refreshToken = jwt.sign({ userId }, env('JWT_SECRET'), { expiresIn: '30d' });


  return { accessToken, refreshToken };
};