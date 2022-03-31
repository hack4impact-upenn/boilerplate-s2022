/* eslint-disable no-unused-expressions */
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser, AuthenticationType } from '../models/user';
import { envVarErrMsg } from '../controllers/auth.middleware';

// let secret: string;

// check that the expiration time for our JWT exists
// this is important since we want our JWTs to expire after a bit
// process.env.JWT_EXPIRATION_TIME &&

// // do the same for our JWT secret

const generateTokenForUser = async (user: IUser, password: string) => {
  // if (user.accountType != AuthenticationType.Internal) {
  //   return null;
  // }
  let secret: string;
  let exptime: number; // expiration time in seconds
  if (process.env.JWT_SECRET && process.env.JWT_EXPIRATION_TIME) {
    secret = process.env.JWT_SECRET;
    exptime = Number(process.env.JWT_EXPIRATION_TIME);
  } else {
    throw Error(envVarErrMsg);
  }
  const result = await compare(password, user.password);
  if (result) {
    // Passwords matched so create token
    const payload = {
      _id: user._id,
      email: user.email,
    };
    const token = jwt.sign(payload, secret, {
      expiresIn: exptime,
    });
    console.log('token: ', token);
    return token;
  }
  return null;
};

const verifyToken = (token: string) => {
  let secret: string;
  if (process.env.JWT_SECRET) {
    secret = process.env.JWT_SECRET;
  } else {
    throw Error(envVarErrMsg);
  }
  const userPayload = jwt.verify(token, process.env.JWT_SECRET);
  return userPayload;
};

export { generateTokenForUser, verifyToken };
