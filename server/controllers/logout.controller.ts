import express from 'express';
import { authJWTName } from '../models/user';

const logout = (req: express.Request, res: express.Response) => {
  if (req.cookies.jwt) {
    res.clearCookie(authJWTName, { httpOnly: true }).status(200).json({
      message: 'You have logged out',
    });
  } else {
    res.status(401).json({
      error: 'Invalid jwt',
    });
  }
};

export default logout;
