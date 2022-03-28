/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user';

let expirationtimeInMs: string;
let secret: string;

// check that the expiration time for our JWT exists
// this is important since we want our JWTs to expire after a bit
process.env.JWT_EXPIRATION_TIME &&
  (expirationtimeInMs = process.env.JWT_EXPIRATION_TIME);

// do the same for our JWT secret
process.env.JWT_SECRET && (secret = process.env.JWT_SECRET);

const loginUserAndGetToken = async (user: IUser, password: string) => {
  const result = await compare(password, user.internalAccount.password);

  if (result) {
    // password matched
    const payload = {
      _id: user._id,
      username: user.internalAccount.email
        ? user.accountType === 'internal'
        : user.googleAccount.displayName,
      expiration: parseInt(expirationtimeInMs, 10),
    };
    const token = jwt.sign(JSON.stringify(payload), secret);
    return token;
  }

  return null;
};

export default loginUserAndGetToken;
