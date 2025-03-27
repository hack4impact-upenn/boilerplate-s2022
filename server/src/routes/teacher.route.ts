import express from 'express';
import { isAdmin } from '../controllers/admin.middleware.ts';
import {
  getAllTeachers,
  getTeacher,
  createTeacherProfile,
  updateTeacherProfile,
  deleteTeacherProfile,
} from '../controllers/teacher.controller.ts';

const router = express.Router();

router.get('/all', getAllTeachers);

router.get('/:userId', getTeacher);

router.post('/create', createTeacherProfile);

router.put('/update/:userId', updateTeacherProfile);

router.delete('/:userId', isAdmin, deleteTeacherProfile);

export default router;
