/**
 * All the middleware functions related to authentication
 */
import express from 'express';
import ApiError from '../util/apiError.ts';

/**
 * Middleware to check if a user is authenticated using any Passport Strategy
 * and creates an {@link ApiError} to pass on to error handlers if not
 */
const isAuthenticated = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  // TODO: remove this in prod
  console.log(isAuthenticated);
  if (req.isAuthenticated()) {
    next(); // Go to the next non-error-handling middleware
    return;
  }
  // Providing a parameter means go to the next error handler
  next(ApiError.unauthorized('Must be logged in.'));
};

// eslint-disable-next-line import/prefer-default-export
export { isAuthenticated };
