import express from 'express';
import ApiError from '../util/apiError.ts';
import StatusCode from '../util/statusCode.ts';
import { ITeacher } from '../models/teacher.model.ts';
import {
  createTeacher,
  getTeacherByUserId,
  getAllTeachers,
  updateTeacher,
  deleteTeacher,
} from '../services/teacher.service.ts';

/**
 * Get all teachers from the database
 */
const getAllTeachersHandler = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const teachers = await getAllTeachers();
    res.status(StatusCode.OK).json(teachers);
  } catch (error) {
    next(ApiError.internal('Unable to retrieve teachers'));
  }
};

/**
 * Get a specific teacher by userId
 */
const getTeacher = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { userId } = req.params;
  if (!userId) {
    next(ApiError.missingFields(['userId']));
    return;
  }

  try {
    const teacher = await getTeacherByUserId(userId);
    if (!teacher) {
      next(ApiError.notFound('Teacher not found'));
      return;
    }
    res.status(StatusCode.OK).json(teacher);
  } catch (error) {
    next(ApiError.internal('Unable to retrieve teacher'));
  }
};

/**
 * Create a new teacher profile
 */
const createTeacherProfile = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { userId, school, location } = req.body;

  if (!userId || !school || !location) {
    next(ApiError.missingFields(['userId', 'school', 'location']));
    return;
  }

  try {
    const existingTeacher = await getTeacherByUserId(userId);
    if (existingTeacher) {
      next(ApiError.badRequest('Teacher profile already exists'));
      return;
    }

    const teacher = await createTeacher(userId, school, location);
    res.status(StatusCode.CREATED).json(teacher);
  } catch (error) {
    next(ApiError.internal('Unable to create teacher profile'));
  }
};

/**
 * Update a teacher's profile
 */
const updateTeacherProfile = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { userId } = req.params;
  const updateData = req.body;

  if (!userId) {
    next(ApiError.missingFields(['userId']));
    return;
  }

  try {
    const teacher = await updateTeacher(userId, updateData);
    if (!teacher) {
      next(ApiError.notFound('Teacher not found'));
      return;
    }
    res.status(StatusCode.OK).json(teacher);
  } catch (error) {
    next(ApiError.internal('Unable to update teacher profile'));
  }
};

/**
 * Delete a teacher profile
 */
const deleteTeacherProfile = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { userId } = req.params;

  if (!userId) {
    next(ApiError.missingFields(['userId']));
    return;
  }

  try {
    const teacher = await deleteTeacher(userId);
    if (!teacher) {
      next(ApiError.notFound('Teacher not found'));
      return;
    }
    res.status(StatusCode.OK).json(teacher);
  } catch (error) {
    next(ApiError.internal('Unable to delete teacher profile'));
  }
};

export {
  getAllTeachersHandler as getAllTeachers,
  getTeacher,
  createTeacherProfile,
  updateTeacherProfile,
  deleteTeacherProfile,
}; 