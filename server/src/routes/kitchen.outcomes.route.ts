import express from 'express';
import { isAuthenticated } from '../controllers/auth.middleware';

import { getOneKitchenOutcomesController } from '../controllers/kitchen.outcomes.controller.ts';

const router = express.Router();

// router.get('/:year/:orgName', isAuthenticated, getOneKitchenOutcomesController);
router.get('/:year/:orgId', getOneKitchenOutcomesController); // no authentication for now

export default router;
