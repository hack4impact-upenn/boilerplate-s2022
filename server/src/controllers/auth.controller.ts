/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
import express from 'express';
import { IUser, authJWTName } from '../models/user';
import { loginUserAndGetToken } from '../services/auth.service';
// import retrieveUser from '../services/retrieveUser.service';
import { createUser, retrieveUser } from '../services/user.service';

const login = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;

  const user: IUser | null = await retrieveUser(email);

  if (!user) {
    return res.status(401).send({
      success: false,
      message: `User ${email} does not exist`,
    });
  } else {
    try {
      const token = loginUserAndGetToken(user, password);
      if (token) {
        // this is a session cookie which means it expires when the session ends
        return res
          .cookie(authJWTName, token, {
            httpOnly: true,
            secure: false, // --> TODO: SET TO TRUE ON PRODUCTION
            signed: true,
            maxAge: 86400000,
          })
          .status(200)
          .json({
            message: 'successful login',
          });
      } else {
        return res.status(401).send({
          success: false,
          message: 'Authentication Failure',
        });
      }
    } catch (e: any) {
      return res.status(500).send({
        success: false,
        message: e.message,
      });
    }
  }
};

const logout = async (req: express.Request, res: express.Response) => {
  if (req.signedCookies[authJWTName]) {
    return res
      .clearCookie(authJWTName, {
        httpOnly: true,
        secure: false, // --> TODO: SET TO TRUE ON PRODUCTION
        signed: true,
        maxAge: 86400000,
      })
      .status(200)
      .json({
        message: 'logged out successfully',
      });
  } else {
    res.status(400).json({
      error: 'cookie does not exist',
    });
  }
};

const register = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;
  const user: IUser | null = await retrieveUser(email);

  console.log('IN REGISTER');

  if (user) {
    res.status(400).send({
      message: `User with email: ${email} already has an account.`,
    });
  }

  // hash + salt password
  // return should be separate
  return createUser(email, password)
    .then(() => res.sendStatus(201))
    .catch((e) => res.status(400).send({ message: e }));
};

export { login, logout, register };
