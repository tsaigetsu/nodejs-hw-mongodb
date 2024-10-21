// src/index.js
// src/index.js

import express from 'express';
import cookieParser from 'cookie-parser';
import { initMongoConnections } from './db/initMongoConnections.js';
//import authRouter from './routers/auth.js';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { env } from './utils/env.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

//app.use('/auth', authRouter);
app.use('/contacts', contactsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
  try {
    await initMongoConnections();
    const PORT = Number(env('PORT', 3000));
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};
startServer();

