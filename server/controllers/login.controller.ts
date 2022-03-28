/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
import express from 'express';
import { IUser, authJWTName } from '../models/user';
import loginUserAndGetToken from '../services/login.service';
import retrieveUser from '../services/retrieveUser.service';

const login = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;

  const user: IUser | null = await retrieveUser(email);

  if (!user) {
    res.status(400).send({
      success: false,
      message: `User ${email} does not exist`,
    });
  } else {
    const token = loginUserAndGetToken(user, password);
    if (token) {
      res
        .cookie(authJWTName, token, {
          httpOnly: true,
          secure: false, // --> TODO: SET TO TRUE ON PRODUCTION
        })
        .status(200)
        .json({
          message: 'You have logged in :D',
        });
    } else {
      res.status(400).send({
        success: false,
        message: 'Wrong password',
      });
    }
  }
};

export default login;
