import express from 'express';
import ApiError from '../config/ApiError';
import StatusCode from '../config/StatusCode';
import { IUser } from '../models/user';
import {
  toggleAdmin as upgradeUserToAdmin,
  getUserByEmail,
  getAllUsersFromDB,
  deleteUserById,
} from '../services/user.service';

const getAllUsers = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  return getAllUsersFromDB()
    .then((userList) => {
      res.status(StatusCode.OK).send(userList);
    })
    .catch((e) => {
      next(ApiError.internal('Unable to retrieve all users'));
    });
};

const upgradePrivilege = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { email } = req.body;
  if (!email) {
    next(ApiError.missingFields(['email']));
    return;
  }

  const user: IUser | null = await getUserByEmail(email);
  if (!user) {
    next(ApiError.notFound(`User with email ${email} does not exist`));
    return;
  }
  if (user.admin) {
    next(ApiError.badRequest(`User is already an admin`));
    return;
  }

  upgradeUserToAdmin(user._id)
    .then(() => {
      res.sendStatus(StatusCode.OK);
    })
    .catch((e) => {
      next(ApiError.internal('Unable to upgrade user to admin.'));
    });
};

const deleteUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { email } = req.params;
  if (!email) {
    next(ApiError.missingFields(['email']));
    return;
  }

  // Check if user to delete is an admin
  const user: IUser | null = await getUserByEmail(email);
  if (!user) {
    next(ApiError.notFound(`User with email ${email} does not exist`));
    return;
  }
  // TODO: check if this is the right response code, or do we even need this?
  const reqUser: IUser | undefined = req.user as IUser;
  if (!reqUser || !reqUser.email) {
    next(ApiError.unauthorized('Not a valid user'));
    return;
  }
  if (reqUser.email === user.email) {
    next(ApiError.badRequest('Cannot delete self.'));
    return;
  }
  if (user.admin) {
    next(ApiError.forbiden('Cannot delete an admin.'));
    return;
  }

  deleteUserById(user._id)
    .then(() => res.sendStatus(StatusCode.OK))
    .catch((e) => {
      next(ApiError.internal('Failed to delete user.'));
    });
};

export { getAllUsers, upgradePrivilege, deleteUser };
