import express from 'express';
import ApiError from '../util/apiError.ts';
import StatusCode from '../util/statusCode.ts';
import {
  deleteUserById,
  getAllUsersFromDB,
  getUserById,
  updateUser,
} from '../services/user.service.ts';

const getUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { userId } = req.params;
  if (!userId) {
    next(ApiError.missingFields(['userId']));
    return;
  }

  try {
    const user = await getUserById(userId);
    console.log(user);
    if (!user) {
      next(ApiError.notFound('User not found'));
      return;
    }
    res.status(StatusCode.OK).json(user);
  } catch (error) {
    next(ApiError.internal('Unable to retrieve user'));
  }
};

const getAllUsersHandler = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const users = await getAllUsersFromDB();
    res.status(StatusCode.OK).json(users);
  } catch (error) {
    next(ApiError.internal('Unable to retrieve users'));
  }
};

const updateUserProfile = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { userId } = req.params;
  const updateData = req.body;

  if (!userId) {
    next(ApiError.missingFields(['userId']));
    return;
  }

  try {
    const user = await updateUser(userId, updateData);
    if (!user) {
      next(ApiError.notFound('User not found'));
      return;
    }
    res.status(StatusCode.OK).json(user);
  } catch (error) {
    next(ApiError.internal('Unable to update user profile'));
  }
};

/**
 * Delete a user profile
 */
const deleteUserProfile = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { userId } = req.params;

  if (!userId) {
    next(ApiError.missingFields(['userId']));
    return;
  }

  try {
    const user = await deleteUserById(userId);
    if (!user) {
      next(ApiError.notFound('User not found'));
      return;
    }
    res.status(StatusCode.OK).json(user);
  } catch (error) {
    next(ApiError.internal('Unable to delete user profile'));
  }
};

export { getUser, getAllUsersHandler, updateUserProfile, deleteUserProfile };
