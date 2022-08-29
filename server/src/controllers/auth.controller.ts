import express from 'express';
import passport from 'passport';
import crypto from 'crypto';
import { hash } from 'bcrypt';
import { IUser } from '../models/user';
import StatusCode from '../config/statusCodes';
import {
  passwordHashSaltRounds,
  createUser,
  getUserByEmail,
  getUserByResetPasswordToken,
  getUserByVerificationToken,
} from '../services/user.service';
import {
  emailResetPasswordLink,
  emailVerificationLink,
} from '../services/mail.service';

const login = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (req.isAuthenticated()) {
    res.status(StatusCode.BAD_REQUEST).send({ message: 'Already logged in' });
  }
  passport.authenticate(
    ['local'],
    {
      failureMessage: true,
    },
    // Callback function defined by passport strategy in configPassport.ts
    (err, user, info) => {
      if (err) {
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).send(err);
      }
      if (!user) {
        return res.status(StatusCode.UNAUTHORIZED).send(info);
      }
      if (!user!.verified) {
        return res.status(StatusCode.UNAUTHORIZED).send({
          message: 'Pending Account. Please verify by email.',
        });
      }
      return req.logIn(user, (error) => {
        if (error) {
          console.log('error logging in3');
          return next(err);
        }
        return res.status(StatusCode.OK).send(user);
      });
    },
  )(req, res, next);
};

const logout = async (req: express.Request, res: express.Response) => {
  if (!req.isAuthenticated()) {
    res.status(StatusCode.UNAUTHORIZED).send({ message: 'Not logged in' });
    return;
  }
  // Logout with Passport which modifies the request object
  req.logout();
  // Only if there is an active session.
  if (req.session) {
    // Delete session object
    req.session.destroy((e) => {
      if (e) {
        res
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .send({ message: 'Unable to log out', error: e });
      } else {
        res.send({ logout: true });
      }
    });
  }
};

const register = async (req: express.Request, res: express.Response) => {
  const { firstName, lastName, email, password } = req.body;

  if (req.isAuthenticated()) {
    res.status(StatusCode.BAD_REQUEST).send({ message: 'Already logged in' });
  }
  // Check if user exists
  const existingUser: IUser | null = await getUserByEmail(email);
  if (existingUser) {
    res.status(StatusCode.BAD_REQUEST).send({
      message: `User with email ${email} already has an account.`,
    });
    return;
  }

  // Create user and send verification email
  try {
    const user = await createUser(firstName, lastName, email, password);
    // Don't need verification email if testing
    if (process.env.NODE_ENV === 'test') {
      user!.verified = true;
      await user?.save();
    } else {
      const verificationToken = crypto.randomBytes(32).toString('hex');
      user!.verificationToken = verificationToken;
      await user!.save();
      await emailVerificationLink(email, verificationToken);
    }
    res.sendStatus(StatusCode.CREATED);
  } catch (err) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send(err);
  }
};

const approve = async (req: express.Request, res: express.Response) => {
  res.sendStatus(StatusCode.OK);
};

const verifyAccount = async (req: express.Request, res: express.Response) => {
  const { token } = req.body;
  const user = await getUserByVerificationToken(token);
  if (!user) {
    res.status(StatusCode.BAD_REQUEST).send({
      error: `Invalid verification token`,
    });
  }
  user!.verificationToken = undefined;
  user!.verified = true;
  try {
    await user!.save();
    res.sendStatus(StatusCode.OK);
  } catch (err) {
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .send({ error: 'Unable to verify the user' });
  }
};

const sendResetPasswordEmail = async (
  req: express.Request,
  res: express.Response,
) => {
  const { email } = req.body;
  // Check if user exists
  const user: IUser | null = await getUserByEmail(email);
  if (!user) {
    res.status(StatusCode.NOT_FOUND).send({
      message: `No user with email ${email} is registered.`,
    });
  }

  // Generate a token for the user for this reset link
  const token = crypto.randomBytes(32).toString('hex');
  user!.resetPasswordToken = token;
  user!.resetPasswordTokenExpiryDate = new Date(
    new Date().getTime() + 60 * 60 * 1000,
  ); // Expires in an hour
  await user!.save();

  // Send the email and return an appropriate response
  emailResetPasswordLink(email, token)
    .then(() =>
      res.status(StatusCode.CREATED).send({
        message: `Reset link has been sent to ${email}`,
        token,
      }),
    ) // TODO: should this code be OK?
    .catch((e) => {
      res.status(e.code).send(e);
    });
};

const resetPassword = async (req: express.Request, res: express.Response) => {
  const { password, token } = req.body;
  const user: IUser | null = await getUserByResetPasswordToken(token);
  if (!user) {
    res
      .status(StatusCode.UNPROCESSABLE_ENTITY)
      .send({ error: 'Reset password token expired or incorect.' });
    return;
  }

  // Hash the password before storing
  let hashedPassword: string | undefined;
  try {
    hashedPassword = await hash(password, passwordHashSaltRounds);
  } catch (err) {
    console.log(`Error hashing new password, ${err}`);
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .send({ error: 'Unable to set new password securely.' });
    return;
  }

  // Set new password for user
  user!.password = hashedPassword;
  user!.resetPasswordToken = undefined;
  user!.resetPasswordTokenExpiryDate = undefined;
  try {
    await user.save();
    res.sendStatus(StatusCode.OK);
  } catch (err) {
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .send({ error: 'Unable to set new password.' });
  }
};

export {
  login,
  logout,
  register,
  approve,
  verifyAccount,
  sendResetPasswordEmail,
  resetPassword,
};
