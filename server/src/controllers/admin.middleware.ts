import express from 'express';
import { IUser } from '../models/user';

/**
 * Middleware to check if a user is an admin using any Passport Strategy
 * and handles error if the user is not an admin.
 */
const isAdmin = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  // Get User
  const user: IUser | null = req.user as IUser;
  console.log('in is admin ')
  // Check is user exists and is valid
  if (!user) {
    res.status(401).send({ message: 'not valid user'});
    return;
  }
  // Check if the user is an admin
  if (user.admin) {
    return next();
  }
  res.status(401).send({ message: 'not admin'});
  return;
};

export { isAdmin };
