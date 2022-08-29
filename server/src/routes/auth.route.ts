import express from 'express';
import {
  login,
  logout,
  register,
  approve,
  sendResetPasswordEmail,
} from '../controllers/auth.controller';
import ensureAuthenticated from '../controllers/auth.middleware';
import 'dotenv/config';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.post('/send-reset-password-email', sendResetPasswordEmail);

router.get('/authstatus', ensureAuthenticated, approve);

export default router;
