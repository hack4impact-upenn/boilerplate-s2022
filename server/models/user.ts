import mongoose from 'mongoose';

interface IInternalUser extends mongoose.Document {
  _id: string;
  email: string;
  password: string;
}

interface IGoogleUser extends mongoose.Document {
  _id: string;
  googleId: string;
  displayName: string;
  firstName: string;
  lastName: string;
  image: string;
  createdAt: Date;
}

interface IUser extends mongoose.Document {
  _id: string;
  accountType: string;
  internalAccount: IInternalUser;
  googleAccount: IGoogleUser;
}

const GoogleUserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const InternalUserSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g,
  },
  password: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9!?$%^*)(+=._-]{6,61}$/g,
  },
});

const UserSchema = new mongoose.Schema({
  accountType: {
    type: String,
    required: true,
    match: /^internal$|^google$/g,
  },
  internalAccount: {
    type: InternalUserSchema,
  },
  googleAccount: {
    type: GoogleUserSchema,
  },
});

const User = mongoose.model<IUser>('User', UserSchema);

// defines the name of the cookie stored by the user.
/* 
  TODO: change this using your project name, but make sure this
  is not generic. You don't want it to interfere with other cookies
  stored by the user. We suggest 'authToken-[projectName]-[randomString]'
  although you can omit the [randomString].
*/
const authJWTName = 'authToken-h4i-boilerplate';

export { IInternalUser, IGoogleUser, IUser, User, authJWTName };
