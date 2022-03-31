import express from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../services/auth.service';
import { authJWTName } from '../models/user';

/**
 * Error message for missing environment variables
 */
const envVarErrMsg = 'Environment Variables Not Set';

function auth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const token = req.cookies[authJWTName];
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const userPayload = verifyToken(token);
    req.user = userPayload;
    return next();
  } catch (e: any) {
    if (e.message === envVarErrMsg) {
      return res.status(500).send({
        success: false,
        message: e.message,
      });
    }
    return res.status(403).send({
      success: false,
      message: e.message,
    });
  }
}
export { auth, envVarErrMsg };
