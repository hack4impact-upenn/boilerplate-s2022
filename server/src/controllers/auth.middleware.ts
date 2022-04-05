import express from 'express';

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
  res.sendStatus(401);
  // res.redirect('/api/user/login'); // TODO: codify this route
};

export default ensureAuthenticated;
