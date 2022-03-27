/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
import express from 'express';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, IUser, authJWTName } from '../models/user';

let expirationtimeInMs: string;
let secret: string;

// check that the expiration time for our JWT exists
// this is important since we want our JWTs to expire after a bit
process.env.JWT_EXPIRATION_TIME &&
  (expirationtimeInMs = process.env.JWT_EXPIRATION_TIME);

// do the same for our JWT secret
process.env.JWT_SECRET && (secret = process.env.JWT_SECRET);

const login = (req: express.Request, res: express.Response) => {
  const { email } = req.body;
  const { password } = req.body;
  let user: IUser;

  User.findOne(
    { email },
    function loginCallback(err: any, userObj: IUser): any {
      if (err) {
        console.log(err);
        res.status(400).send({
          success: false,
          message: `User ${email} does not exist`,
        });
      } else if (userObj) {
        user = userObj;
        // ************************************************************
        return compare(
          password,
          user.internalAccount.password,
          (error, result) => {
            if (error) {
              res.status(400).send({
                success: false,
                message: error.message,
              });
            }

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
              res
                .cookie(authJWTName, token, {
                  httpOnly: true,
                  secure: false, // --> TODO: SET TO TRUE ON PRODUCTION
                })
                .status(200)
                .json({
                  message: 'You have logged in :D',
                });
            }
          },
        );
        // ******************************************************************
      } else {
        res.status(400).send({
          success: false,
          message: `User with email ${email} not found.`,
        });
      }
    },
  );
};

module.exports = login;
export default login;
