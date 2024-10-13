// src/index.js

import express from 'express';
import cookieParser from 'cookie-parser';
import { initMongoConnections } from './db/initMongoConnections.js';
import authRouter from './routers/auth.js';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/contacts', contactsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
  await initMongoConnections();
  app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
  });
};

startServer();
