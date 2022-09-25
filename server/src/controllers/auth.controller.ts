/**
 * All the controller functions containing the logic for routes relating to a
 * user's authentication such as login, logout, and registration.
 */
import express from 'express';
import passport from 'passport';
import crypto from 'crypto';
import { hash } from 'bcrypt';
import { IUser } from '../models/user';
import StatusCode from '../config/statusCode';
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
import ApiError from '../config/apiError';

/**
 * A controller function to login a user and create a session with Passport.
 * On success, the user's information is returned.
 * Else, send an appropriate error message.
 */
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

/**
 * A controller function to logout a user with Passport and clear the session.
 */
const logout = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
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

/**
 * A controller function to register a user in the database.
 */
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
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g;

  const passwordRegex = /^[a-zA-Z0-9!?$%^*)(+=._-]{6,61}$/;

  const nameRegex = /^[a-z ,.'-]+/i;

  if (
    !email.match(emailRegex) ||
    !password.match(passwordRegex) ||
    !firstName.match(nameRegex) ||
    !lastName.match(nameRegex)
  ) {
    next(ApiError.badRequest('Invalid email, password, or name.'));
    return;
  }

  if (req.isAuthenticated()) {
    next(ApiError.badRequest('Already logged in.'));
    return;
  }
  const lowercaseEmail = email.toLowerCase();
  // Check if user exists
  const existingUser: IUser | null = await getUserByEmail(lowercaseEmail);
  if (existingUser) {
    next(
      ApiError.badRequest(
        `An account with email ${lowercaseEmail} already exists.`,
      ),
    );
    return;
  }

  // Create user and send verification email
  try {
    const user = await createUser(
      firstName,
      lastName,
      lowercaseEmail,
      password,
    );
    // Don't need verification email if testing
    if (process.env.NODE_ENV === 'test') {
      user!.verified = true;
      await user?.save();
    } else {
      const verificationToken = crypto.randomBytes(32).toString('hex');
      user!.verificationToken = verificationToken;
      await user!.save();
      await emailVerificationLink(lowercaseEmail, verificationToken);
    }
    res.sendStatus(StatusCode.CREATED);
  } catch (err) {
    next(ApiError.internal('Unable to register user.'));
  }
};

/**
 * A dummy controller function which sends a 200 OK status code. Should be used to close a request after a middleware call.
 */
const approve = async (req: express.Request, res: express.Response) => {
  res.sendStatus(StatusCode.OK);
};

/**
 * A controller function to verify an account with a verification token.
 */
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
    next(ApiError.internal('Unable to verify the account.'));
  }
};

/**
 * A controller function to send a password reset link to a user's email.
 */
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
  const lowercaseEmail = email.toLowerCase();

  const user: IUser | null = await getUserByEmail(lowercaseEmail);
  if (!user) {
    next(
      ApiError.notFound(`No user with email ${lowercaseEmail} is registered.`),
    );
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
  emailResetPasswordLink(lowercaseEmail, token)
    .then(() =>
      res.status(StatusCode.CREATED).send({
        message: `Reset link has been sent to ${lowercaseEmail}`,
      }),
    ) // TODO: should this code be OK?
    .catch(() => {
      next(ApiError.internal('Failed to email reset password link.'));
    });
};

/**
 * A controller function to reset a user's password.
 */
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
