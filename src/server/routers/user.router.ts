import express from 'express';
import passport from 'passport';
import login from '../auth/login';
import register from '../auth/register';
import 'dotenv/config';
import logout from '../auth/logout';

const router = express.Router();

router.post('/register', async (req, res) => {
  register(req, res);
});

// what is going on here?
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback', passport.authenticate('google'));

router.post('/login', async (req, res) => {
  login(req, res);
});

router.get('/logout', (req, res) => {
  logout(req, res);
});

export default router;
