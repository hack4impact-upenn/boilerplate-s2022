import express from 'express';
import passport from 'passport';
import crypto from 'crypto';
import { hash } from 'bcrypt';
import { IUser } from '../models/user';
import {
  passwordHashSaltRounds,
  createUser,
  getUserByEmail,
  getUserByResetPasswordToken,
} from '../services/user.service';
import { emailResetPasswordLink } from '../services/mail.service';

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
      return req.logIn(user, function (error) {
        if (error) {
          console.log('error logging in3');
          return next(err);
        }
        return res.status(200).send(user);
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
        res.status(500).send({ message: 'Unable to log out', error: e });
      } else {
        res.send({ logout: true });
      }
    });
  }
};

const register = async (req: express.Request, res: express.Response) => {
  const { firstName, lastName, email, password } = req.body;

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
  createUser(firstName, lastName, email, password)
    .then(() => res.sendStatus(201))
    .catch((e) => {
      console.log(e);
      res.status(400).send({ message: e });
    });
};

const approve = async (req: express.Request, res: express.Response) => {
  res.sendStatus(200);
};

const sendResetPasswordEmail = async (
  req: express.Request,
  res: express.Response,
) => {
  const { email } = req.body;
  // Check if user exists
  const user: IUser | null = await getUserByEmail(email);
  if (!user) {
    res.status(400).send({
      message: `No user with email ${email} is registered.`,
    });
  }

  // Generate a token for the user for this reset link
  const token = crypto.randomBytes(20).toString('hex');
  user!.resetPasswordToken = token;
  user!.resetPasswordTokenExpiryDate = new Date(
    new Date().getTime() + 60 * 60 * 1000,
  ); // Expires in an hour
  await user!.save();

  // Send the email and return an appropriate response
  emailResetPasswordLink(email, token)
    .then(() =>
      res.status(201).send({
        message: `Reset link has been sent to ${email}`,
        token,
      }),
    ) // TODO: should this be 200?
    .catch((e) => {
      res.status(e.code).send(e);
    });
};

const resetPassword = async (req: express.Request, res: express.Response) => {
  const { password, token } = req.body;
  const user: IUser | null = await getUserByResetPasswordToken(token);
  if (!user) {
    res
      .status(422)
      .send({ error: 'Reset password token expired or incorect.' });
    return;
  }

  // Hash the password before storing
  let hashedPassword: string | undefined;
  try {
    hashedPassword = await hash(password, passwordHashSaltRounds);
  } catch (err) {
    console.log(`Error hashing new password, ${err}`);
    res.status(500).send({ error: 'Unable to set new password securely.' });
    return;
  }

  // Set new password for user
  user!.password = hashedPassword;
  user!.resetPasswordToken = undefined;
  user!.resetPasswordTokenExpiryDate = undefined;
  try {
    await user.save();
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send({ error: 'Unable to set new password.' });
  }
};

export {
  login,
  logout,
  register,
  approve,
  sendResetPasswordEmail,
  resetPassword,
};
