//src/services.auth.js

import { Session } from '../db/models/session.js';
import pkg from 'jsonwebtoken';
const { sign } = pkg;
import { env } from '../utils/env.js';
import { User } from '../db/models/user.js';

export const createSessionService = async (userId) => {
  const accessToken = sign({ id: userId }, env.JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = sign({ id: userId }, env.JWT_SECRET, { expiresIn: '7d' });

  const session = new Session({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: Date.now() + 15 * 60 * 1000,
    refreshTokenValidUntil: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });

  await session.save();
  return { accessToken, refreshToken };
};

export const refreshSessionService = async (refreshToken) => {
  try {
    const decoded = verify(refreshToken, env.JWT_SECRET);
    const session = await Session.findOne({ refreshToken });

    if (!session || session.userId.toString() !== decoded.id) {
      throw new Error('Invalid refresh token');
    }

    const newAccessToken = sign({ id: decoded.id }, env.JWT_SECRET, { expiresIn: '15m' });
    const newRefreshToken = sign({ id: decoded.id }, env.JWT_SECRET, { expiresIn: '7d' });

    session.accessToken = newAccessToken;
    session.refreshToken = newRefreshToken;
    session.accessTokenValidUntil = Date.now() + 15 * 60 * 1000;
    session.refreshTokenValidUntil = Date.now() + 7 * 24 * 60 * 60 * 1000;

    await session.save();

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (error) {
    throw new Error('Failed to refresh session: ' + error.message);
  }
};

export const logoutService = async (refreshToken) => {
  await Session.deleteOne({ refreshToken });
};
