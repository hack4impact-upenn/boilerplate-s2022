import express from 'express';
import { isAdmin } from '../controllers/user.middleware';
import {
  getAllUsers,
  upgradePrivilege,
  deleteUser,
} from '../controllers/user.controller';
import ensureAuthenticated from '../controllers/auth.middleware';
import { approve } from '../controllers/auth.controller';
import 'dotenv/config';

const router = express.Router();

router.get('/all', ensureAuthenticated, isAdmin, getAllUsers);
router.get('/adminstatus', ensureAuthenticated, isAdmin, getAllUsers);

router.put('/promote', ensureAuthenticated, isAdmin, approve);

// delete during deployment
router.put('/autopromote', upgradePrivilege);

router.delete('/:email', ensureAuthenticated, isAdmin, deleteUser);

export default router;
