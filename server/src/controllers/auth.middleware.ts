import express from 'express';
import { IVerifyOptions } from 'passport-local';
import { retrieveUser } from '../services/user.service';
import { compare } from 'bcrypt';

/**
 * Middleware to check if a user is authenticated using the Local Strategy.
 * @param email Email of the user
 * @param password Password of the user
 * @param done Callback function to return
 */
const verifyLocalUser = (
  email: string,
  password: string,
  done: (error: any, user?: any, options?: IVerifyOptions | undefined) => void,
): void => {
  // Match user with email
  retrieveUser(email)
    .then((user: any) => {
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      // Match user with password
      compare(password, user.password, (err: any, isMatch: boolean) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password.' });
        }
      });
    })
    .catch((error: any) => {
      return done(error);
    });
};

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
    return next(req);
  }
  res.sendStatus(401);
  res.redirect('/api/user/login'); // TODO: codify this route
};

export { verifyLocalUser, ensureAuthenticated };
