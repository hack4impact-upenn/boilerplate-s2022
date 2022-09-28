import express from 'express';
import 'dotenv/config';
import {
  getAllToxicPeople,
  getToxicPersonByFirstAndName,
  createToxicPerson,
  deleteToxicPerson,
  updateToxicPerson,
} from '../controllers/toxicperson.controller';

const router = express.Router();

router.get('/all', getAllToxicPeople);
router.get('/', getToxicPersonByFirstAndName);
router.put('/', createToxicPerson);
router.delete('/', deleteToxicPerson);
router.put('/update', updateToxicPerson);

export default router;
