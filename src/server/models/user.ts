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
  },
  password: {
    type: String,
    required: true,
  },
});

const UserSchema = new mongoose.Schema({
  accountType: {
    type: String,
    required: true,
  },
  internalAccount: {
    type: InternalUserSchema,
  },
  googleAccount: {
    type: GoogleUserSchema,
  },
});

UserSchema.pre('validate', function (next) {
  console.log(this);
  if (this.accountType !== 'internal' || this.accountType !== 'google') {
    next(new Error('Account type is not internal or google.'));
  }

  if (
    (this.accountType === 'internal' && !this.internalAccount) ||
    (this.accountType === 'google' && !this.googleAccount)
  ) {
    next(new Error('Account type must match account info provided.'));
  } else {
    next();
  }
});

const User = mongoose.model<IUser>('User', UserSchema);

export {
  IInternalUser,
  IGoogleUser,
  IUser,
  InternalUserSchema,
  GoogleUserSchema,
  UserSchema,
  User,
};
