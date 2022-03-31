import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import { verifyLocalUser } from '../controllers/auth.middleware';
import { IUser, User } from '../models/user';
import { NativeError } from 'mongoose';

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
