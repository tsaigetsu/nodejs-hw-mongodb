// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';
import { getAllStudents, getStudentById } from './services/students.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  // Маршрут для отримання всіх контактів
  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  // Маршрут для отримання контакту за ідентифікатором
  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;

    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({
        message: 'Contact not found',
      });
      return;
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  });

  // Новий маршрут для отримання всіх студентів
  app.get('/students', async (req, res) => {
    const students = await getAllStudents();

    res.status(200).json({
      status: 200,
      message: 'Successfully found students!',
      data: students,
    });
  });

  // Новий маршрут для отримання студента за ідентифікатором
  app.get('/students/:studentId', async (req, res, next) => {
    const { studentId } = req.params;
    const student = await getStudentById(studentId);

    if (!student) {
      res.status(404).json({
        message: 'Student not found',
      });
      return;
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found student with id ${studentId}!`,
      data: student,
    });
  });

  // Маршрут для всіх невідомих запитів
  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  // Обробник помилок
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  // Запуск сервера
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
