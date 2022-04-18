import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import { IUser, User } from '../models/user';
import { NativeError } from 'mongoose';
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
        return done(null, false, { message: 'User not found' });
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
 * Initializes all the configurations for passport regarding strategies.
 * @param passport The passport instance to use.
 */
const initializePassport = (passport: passport.PassportStatic) => {
  // Set up middleware to use for each type of auth strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
      },
      verifyLocalUser,
    ),
  );

  // Set up serialization and deserialization of user objects
  passport.serializeUser((user: any, done: any) => {
    done(null, user._id);
  });
  passport.deserializeUser((id: any, done: any) => {
    User.findById(id, (err: NativeError, user: IUser) => {
      done(err, user);
    });
  });
};

export default initializePassport;
