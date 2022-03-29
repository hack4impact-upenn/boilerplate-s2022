/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user';

// let secret: string;

// check that the expiration time for our JWT exists
// this is important since we want our JWTs to expire after a bit
// process.env.JWT_EXPIRATION_TIME &&

// // do the same for our JWT secret

const loginUserAndGetToken = async (user: IUser, password: string) => {
  if (!user.internalAccount || !user.internalAccount.email) {
    return null;
  }

  let secret: string;

  if (process.env.JWT_SECRET) {
    secret = process.env.JWT_SECRET;
  } else {
    throw Error('Environment Variables Not Set');
  }

  const result = await compare(password, user.internalAccount.password);

  if (result) {
    // password matched
    const payload = {
      _id: user._id,
      email: user.internalAccount.email,
    };
    const token = jwt.sign(JSON.stringify(payload), secret, {
      expiresIn: '1d',
    });
    return token;
  }

  return null;
};

const verifyToken = (token: string) => {
  let secret: string;

  if (process.env.JWT_SECRET) {
    secret = process.env.JWT_SECRET;
  } else {
    throw Error('Environment Variables Not Set');
  }

  const userPayload = jwt.verify(token, process.env.JWT_SECRET);

  return userPayload;
};

export { loginUserAndGetToken, verifyToken };
