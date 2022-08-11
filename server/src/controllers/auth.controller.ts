/* eslint-disable consistent-return */
import express from 'express';
import { IUser } from '../models/user';
import { createUser, getUserByEmail } from '../services/user.service';
import passport from 'passport';

const login = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (req.isAuthenticated()) {
    res.status(400).send({ message: 'Already logged in' }); // Already logged in
  }
  passport.authenticate(
    ['local'],
    {
      failureMessage: true,
    },
    // Callback function defined by passport strategy in configPassport.ts
    (err, user, info) => {
      if (err) {
        console.log('error logging in1');
        return res.status(400).send(err);
      }
      if (!user) {
        console.log('error logging in2');
        return res.status(401).send(info);
      }
      req.logIn(user, function (err) {
        if (err) {
          console.log('error logging in3');
          return next(err);
        }
        return res.status(200).send({ message: 'Successful Login' });
      });
    },
  )(req, res, next);
};

const logout = async (req: express.Request, res: express.Response) => {
  if (!req.isAuthenticated()) {
    console.log('not authenticated by passport');
    res.status(400).send({ message: 'Not logged in' });
    return;
  }
  // Logout with Passport which modifies the request object
  req.logout();
  // Only if there is an active session.
  if (req.session) {
    // Delete session object
    req.session.destroy((e) => {
      if (e) {
        res.status(400).send({ message: 'Unable to log out', error: e });
      } else {
        res.send({ logout: true });
      }
    });
  }
};

const register = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;

  if (req.isAuthenticated()) {
    res.status(400).send({ message: 'Already logged in' }); // Already logged in
  }
  // Check if user exists
  const user: IUser | null = await getUserByEmail(email);
  if (user) {
    res.status(400).send({
      message: `User with email ${email} already has an account.`,
    });
    return;
  }
  // Create user
  return createUser(email, password)
    .then(() => res.sendStatus(201))
    .catch((e) => {
      console.log(e);
      res.status(400).send({ message: e });
    });
};

const approve = async (req: express.Request, res: express.Response) => {
  res.sendStatus(200);
};

export { login, logout, register, approve };
