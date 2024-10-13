// src/middlewares/notFoundHandler.js

import createError from 'http-errors';

export const notFoundHandler = (req, res, next) => {
  next(createError(404, 'Resource not found'));
};
