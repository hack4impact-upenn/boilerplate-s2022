import express from 'express';
import { isAdmin } from '../controllers/admin.middleware.ts';
import {
  getAllSpeakers,
  getSpeaker,
  createSpeakerProfile,
  updateSpeakerProfile,
  deleteSpeakerProfile,
  filterSpeaker,
} from '../controllers/speaker.controller.ts';

const router = express.Router();

router.get('/all', getAllSpeakers);

router.get('/:userId', getSpeaker);

router.post('/create', createSpeakerProfile);

router.put('/update/:userId', updateSpeakerProfile);

router.delete('/:userId', isAdmin, deleteSpeakerProfile);

router.get('/', filterSpeaker);

export default router;
