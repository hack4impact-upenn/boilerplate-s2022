/**
 * All the middleware functions related to authentication
 */
import express from 'express';
import ApiError from '../util/apiError.ts';

/**
 * Middleware to check if a user is authenticated using Passport Strategy
 * and creates an {@link ApiError} to pass on to error handlers if not
 */
const isAuthenticated = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  // Check if user exists and is valid
  if (req.isAuthenticated()) {
    next();
  } else {
    next(ApiError.unauthorized('Need to be logged in.'));
  }
};

// eslint-disable-next-line import/prefer-default-export
export { isAuthenticated };
