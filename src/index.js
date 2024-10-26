// src/index.js
import express from 'express';
import cookieParser from 'cookie-parser';
import { initMongoConnections } from './db/initMongoConnections.js';
import authRouter from './routers/auth.js';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { env } from './utils/env.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
const app = express();

// Загружаем документ OpenAPI из YAML файла
const swaggerDocument = YAML.load('./docs/openapi.yaml');

app.use(express.json());
app.use(cookieParser());

// Настройка Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Подключение роутов
app.use('/auth', authRouter);
app.use('/contacts', contactsRouter);

// Обработчики ошибок
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

// Запуск сервера
startServer();
