import { User } from '../models/user';

const retrieveGoogleUser = (googleId: string, callback: any) => {
  return User.findOne({ googleAccount: { googleId } }, callback);
};

export default retrieveGoogleUser;

// TODO: handle errors as part of promise in passport.ts
// is there a cleaner way to handle this? other than passing
// the callback as a parameter?
