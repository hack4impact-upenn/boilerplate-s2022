import { isAdmin } from '../controllers/admin.middleware.ts';
import { isAuthenticated } from '../controllers/auth.middleware.ts';
import {
  deleteUserProfile,
  getAllUsersHandler,
  getUser,
  updateUserProfile,
} from '../controllers/user.controller.ts';
import express from 'express';

const router = express.Router();

router.get('/all', getAllUsersHandler);

router.get('/:userId', getUser);

router.get('/:userId', updateUserProfile);

router.delete('/:userId', deleteUserProfile);

export default router;
