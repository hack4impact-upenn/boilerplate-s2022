import express from 'express';
import passport from 'passport';
import login from '../controllers/login.controller';
import 'dotenv/config';
import logout from '../controllers/logout.controller';
import register from '../controllers/register.controller';
import forgotPassword from '../controllers/forgotPassword.controller';

const router = express.Router();

router.post('/register', register);

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback', passport.authenticate('google'));

router.post('/login', login);

router.get('/logout', logout);

router.post('/forgotPassword', forgotPassword);

export default router;
