//src/services.auth.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
import { User } from '../db/models/user.js';

// Создание нового пользователя
export const register = async (req, res) => {
  const { username, password, email } = req.body;

  // Проверка входных данных
  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Username, password, and email are required' });
  }

  try {
    // Шаг 1: Проверка существования пользователя
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Шаг 2: Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 12);

    // Шаг 3: Создание нового пользователя
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    // Шаг 4: Генерация JWT токена
    const token = jwt.sign({ userId: user._id }, env('JWT_SECRET'), { expiresIn: '1h' });

    // Шаг 5: Успешный ответ
    res.status(201).json({ userId: user._id, token });
  } catch (error) {
    console.error(`Error during registration: ${error.message}`);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Аутентификация пользователя
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Проверка входных данных
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Шаг 1: Поиск пользователя
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Шаг 2: Проверка пароля
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Шаг 3: Генерация JWT токена
    const token = jwt.sign({ userId: user._id }, env('JWT_SECRET'), { expiresIn: '1h' });

    // Шаг 4: Успешный ответ
    res.status(200).json({ userId: user._id, token });
  } catch (error) {
    console.error(`Error during login: ${error.message}`);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Функция для создания сессии (пример реализации)
export const createSessionService = async (userId) => {
  const accessToken = jwt.sign({ userId }, env('JWT_SECRET'), { expiresIn: '1h' });
  const refreshToken = jwt.sign({ userId }, env('JWT_SECRET'), { expiresIn: '30d' });

  // Здесь вы можете добавить код для сохранения refreshToken в базе данных, если это необходимо.

  return { accessToken, refreshToken };
};