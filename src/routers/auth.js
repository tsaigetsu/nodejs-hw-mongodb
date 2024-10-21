//src/routers/auth.js

import express from 'express';
import { register, login, refreshSession, logout } from '../controllers/auth.js';
import { sendResetEmail } from '../controllers/emails.js';
import { resetPassword } from '../controllers/resetPassword.js';


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshSession);
router.post('/logout', logout);
router.post('/send-reset-email', sendResetEmail);
router.post('/reset-pwd', resetPassword);


export default router;
