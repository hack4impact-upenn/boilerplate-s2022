import express from 'express';
import { isAdmin } from '../controllers/user.middleware';
import {
  getAllUsers,
  upgradePrivilege,
  deleteUser,
} from '../controllers/user.controller';
import ensureAuthenticated from '../controllers/auth.middleware';
import 'dotenv/config';

const router = express.Router();

router.get('/all', ensureAuthenticated, isAdmin, getAllUsers);
router.put(
  '/upgrade-privilege',
  ensureAuthenticated,
  isAdmin,
  upgradePrivilege,
);
router.delete('/:email', ensureAuthenticated, isAdmin, deleteUser);

export default router;
