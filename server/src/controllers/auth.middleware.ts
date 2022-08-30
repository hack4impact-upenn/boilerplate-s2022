import express from 'express';
import StatusCode from '../config/StatusCode';

/**
 * Middleware to check if a user is authenticated using any Passport Strategy
 * and handles redirecting to login page if not authenticated.
 */
const ensureAuthenticated = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.sendStatus(StatusCode.UNAUTHORIZED);
};

export default ensureAuthenticated;
