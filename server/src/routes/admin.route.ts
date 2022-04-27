import express from 'express';
import { isAdmin } from '../controllers/admin.middleware';
import {
  getAllUsers,
  upgradePrivilege,
  deleteUser,
} from '../controllers/admin.controller';
import ensureAuthenticated from '../controllers/auth.middleware';
import 'dotenv/config';

const router = express.Router();

router.get('/allusers', ensureAuthenticated, isAdmin, getAllUsers);
router.put(
  '/upgrade-privilege',
  ensureAuthenticated,
  isAdmin,
  upgradePrivilege,
);
router.delete('user/:email', ensureAuthenticated, isAdmin, deleteUser);

export default router;
