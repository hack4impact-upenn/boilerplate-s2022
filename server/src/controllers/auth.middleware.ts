import express from 'express';
import ApiError from '../config/ApiError';

/**
 * Middleware to check if a user is authenticated using any Passport Strategy
 */
const ensureAuthenticated = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (req.isAuthenticated()) {
    next(); // No params means go to the next non-error-handling middleware
    return;
  }
  next(ApiError.unauthorized('Must be logged in.'));
};

export default ensureAuthenticated;
