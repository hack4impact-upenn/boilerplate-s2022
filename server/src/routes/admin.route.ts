/**
 * Specifies the middleware and controller functions to call for each route
 * relating to admin users.
 */
import express from 'express';
import { isAdmin } from '../controllers/admin.middleware';
import {
  getAllUsers,
  upgradePrivilege,
  deleteUser,
} from '../controllers/admin.controller';
import { isAuthenticated } from '../controllers/auth.middleware';
import { approve } from '../controllers/auth.controller';
import 'dotenv/config';

const router = express.Router();

/**
 * A GET route to get all users. Checks first if the user is a authenticated and is an admin.
 */
router.get('/all', isAuthenticated, isAdmin, getAllUsers);

router.get('/adminstatus', isAuthenticated, isAdmin, getAllUsers);

router.put('/promote', isAuthenticated, isAdmin, approve);

// delete during deployment
router.put('/autopromote', upgradePrivilege);

router.delete('/:email', isAuthenticated, isAdmin, deleteUser);

export default router;
