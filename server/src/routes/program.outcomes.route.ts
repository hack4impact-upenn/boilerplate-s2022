import express from 'express';
import { isAuthenticated } from '../controllers/auth.middleware';

import {
  getOneProgramOutcomesController,
  getAllProgramOutcomesByYearController,
  addProgramOutcomesController,
} from '../controllers/program.outcomes.controller.ts';

const router = express.Router();

router.get('/:year/:orgId', getOneProgramOutcomesController); // no authentication for now
router.get('/:year', getAllProgramOutcomesByYearController); // no authentication for now
router.post('/', addProgramOutcomesController); // no auth for now
export default router;
