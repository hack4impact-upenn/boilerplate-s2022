import express from 'express';
import { isAuthenticated } from '../controllers/auth.middleware';
import { getOrgByName, getAll } from '../controllers/organization.controller';

const router = express.Router();

router.get('/name/:name', getOrgByName);
router.get('/organizations', getAll);
export default router;
