import express from 'express';
import { isAuthenticated } from '../controllers/auth.middleware';

import { getOneProgramOutcomesController } from '../controllers/program.outcomes.controller.ts';

const router = express.Router();

router.get('/:year/:orgName', getOneProgramOutcomesController); // no authentication for now

export default router;
