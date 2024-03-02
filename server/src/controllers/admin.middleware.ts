/**
 * All the middleware functions related to admin users
 */
import express from 'express';
import ApiError from '../util/apiError.ts';
import { IUser } from '../models/user.model.ts';

/**
 * Middleware to check if a user is an admin using Passport Strategy
 * and creates an {@link ApiError} to pass on to error handlers if not
 */
const isAdmin = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  // Get User
  const user: IUser | null = req.user as IUser;
  // Check is user exists and is valid
  if (!user) {
    next(ApiError.unauthorized('Not a valid user.')); // TODO: see if this is the correct message
    return;
  }
  // Check if the user is an admin
  if (user.admin) {
    next();
  } else {
    next(ApiError.unauthorized('Need admin status.'));
  }
};

// eslint-disable-next-line import/prefer-default-export
export { isAdmin };
