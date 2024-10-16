//src/middlewares/authenticate.js

import createError from 'http-errors';
import pkg from 'jsonwebtoken';
const { verify } = pkg;
import { env } from '../utils/env.js';

export const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return next(createError(401, 'No token provided'));
  }

  verify(token, env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(createError(403, 'Failed to authenticate token'));
    }

    req.userId = decoded.id;
    next();
  });
};
