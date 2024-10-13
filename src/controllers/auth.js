//src/controllers/auth.js

import createError from 'http-errors';
import bcrypt from 'bcryptjs';
import { User } from '../db/models/user.js';
import { createSessionService } from '../services/auth.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(createError(400, 'Missing required fields'));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(409, 'Email in use'));
    }

    const newUser = new User({ name, email, password });
    await newUser.save();
    
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: userWithoutPassword,
    });
  } catch (error) {
    next(createError(500, 'Error registering user'));
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createError(400, 'Missing required fields'));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(401, 'Invalid email or password'));
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return next(createError(401, 'Invalid email or password'));
    }

    const session = await createSessionService(user._id);

    res.cookie('refreshToken', session.refreshToken, { httpOnly: true });

    res.status(200).json({
      status: 200,
      message: 'Successfully logged in a user!',
      data: { accessToken: session.accessToken },
    });
  } catch (error) {
    next(createError(500, 'Error logging in user'));
  }
};

export const refreshSession = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return next(createError(401, 'No refresh token provided'));
    }

    const session = await refreshSessionService(refreshToken);
    
    res.status(200).json({
      status: 200,
      message: 'Successfully refreshed a session!',
      data: { accessToken: session.accessToken },
    });
  } catch (error) {
    next(createError(500, 'Error refreshing session'));
  }
};

export const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return next(createError(401, 'No refresh token provided'));
    }

    await logoutService(refreshToken);
    
    res.status(204).send();
  } catch (error) {
    next(createError(500, 'Error logging out'));
  }
};
