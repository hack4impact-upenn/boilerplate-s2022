import express from 'express';
import passport from 'passport';
import crypto from 'crypto';
import { hash } from 'bcrypt';
import { IUser } from '../models/user';
import StatusCode from '../config/StatusCode';
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
import ApiError from '../config/ApiError';

const login = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (req.isAuthenticated()) {
    next(ApiError.badRequest('Already logged in'));
    return;
  }
  // TODO: look more into when each of these errors are thrown
  passport.authenticate(
    ['local'],
    {
      failureMessage: true,
    },
    // Callback function defined by passport strategy in configPassport.ts
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (err, user, info) => {
      if (err) {
        next(ApiError.internal('Failed to authenticate user.'));
        return;
      }
      if (!user) {
        next(ApiError.unauthorized('Incorrect credentials'));
        return;
      }
      if (!user!.verified) {
        next(ApiError.unauthorized('Need to verify account by email'));
        return;
      }
      req.logIn(user, (error) => {
        if (error) {
          next(ApiError.internal('Failed to log in user'));
          return;
        }
        res.status(StatusCode.OK).send(user);
      });
    },
  )(req, res, next);
};

const logout = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (!req.isAuthenticated()) {
    next(ApiError.unauthorized('Not logged in'));
    return;
  }
  // Logout with Passport which modifies the request object
  req.logout();

  // Destroy the session
  if (req.session) {
    req.session.destroy((e) => {
      if (e) {
        next(ApiError.internal('Unable to logout properly'));
      } else {
        res.sendStatus(StatusCode.OK);
      }
    });
  }
};

const register = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    next(
      ApiError.missingFields(['firstName', 'lastName', 'email', 'password']),
    );
    return;
  }

  if (req.isAuthenticated()) {
    next(ApiError.badRequest('Already logged in.'));
    return;
  }

  // Check if user exists
  const existingUser: IUser | null = await getUserByEmail(email);
  if (existingUser) {
    next(ApiError.badRequest(`An account with email ${email} aready exists.`));
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
    console.log(err);
    next(ApiError.internal('Unable to register user.'));
  }
};

const approve = async (req: express.Request, res: express.Response) => {
  res.sendStatus(StatusCode.OK);
};

const verifyAccount = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { token } = req.body;
  if (!token) {
    next(ApiError.missingFields(['token']));
    return;
  }

  const user = await getUserByVerificationToken(token);
  if (!user) {
    next(ApiError.badRequest('Invalid verification token.'));
    return;
  }
  user!.verificationToken = undefined;
  user!.verified = true;
  try {
    await user!.save();
    res.sendStatus(StatusCode.OK);
  } catch (err) {
    next(ApiError.internal('Unable to verify the acccount.'));
  }
};

const sendResetPasswordEmail = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { email } = req.body;
  if (!email) {
    next(ApiError.missingFields(['email']));
    return;
  }

  const user: IUser | null = await getUserByEmail(email);
  if (!user) {
    next(ApiError.notFound(`No user with email ${email} is registered.`));
    return;
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
      }),
    ) // TODO: should this code be OK?
    .catch(() => {
      next(ApiError.internal('Failed to email reset password link.'));
    });
};

const resetPassword = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { password, token } = req.body;
  if (!password || !token) {
    next(ApiError.missingFields(['password', 'token']));
    return;
  }

  const user: IUser | null = await getUserByResetPasswordToken(token);
  if (!user) {
    next(ApiError.badRequest('Invalid reset password token.'));
    return;
  }

  // Hash the password before storing
  let hashedPassword: string | undefined;
  try {
    hashedPassword = await hash(password, passwordHashSaltRounds);
  } catch (err) {
    next(ApiError.internal('Unable to reset the password'));
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
    next(ApiError.internal('Unable to reset the password'));
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
