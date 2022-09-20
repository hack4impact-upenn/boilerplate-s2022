import express from 'express';
import {
  login,
  logout,
  register,
  approve,
  sendResetPasswordEmail,
  resetPassword,
  verifyAccount,
} from '../controllers/auth.controller';
import isAuthenticated from '../controllers/auth.middleware';
import 'dotenv/config';

const router = express.Router();

router.post('/register', register);

router.post('/verify-account', verifyAccount);

router.post('/login', login);

router.post('/logout', logout);

router.post('/send-reset-password-email', sendResetPasswordEmail);

router.post('/reset-password', resetPassword);

router.get('/authstatus', isAuthenticated, approve);

export default router;
