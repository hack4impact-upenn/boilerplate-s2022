/* eslint-disable consistent-return */
import express from 'express';
import { IUser, authJWTName } from '../models/user';
import { createUser, retrieveUser } from '../services/user.service';
import passport from 'passport';

// const login = async (req: express.Request, res: express.Response) => {
//   const { email, password } = req.body;
//   const user: IUser | null = await retrieveUser(email);

//   if (!user) {
//     return res.status(401).send({
//       success: false,
//       message: `User ${email} does not exist`,
//     });
//   } else {
//     try {
//       let token = await generateTokenForUser(user, password);
//       let expireTime = 0; // expiration time in milliseconds
//       if (process.env.COOKIE_EXPIRATION_TIME) {
//         expireTime = Number(process.env.COOKIE_EXPIRATION_TIME);
//       } else {
//         token = null;
//       }
//       if (token) {
//         // The token is valid and we have found the user
//         console.log('hey');
//         return res
//           .cookie(authJWTName, token, {
//             httpOnly: true,
//             secure: false, // --> TODO: SET TO TRUE ON PRODUCTION
//             signed: true,
//             maxAge: expireTime,
//           })
//           .status(200)
//           .json({
//             message: 'Successful Login',
//           });
//       } else {
//         return res.status(401).send({
//           success: false,
//           message: 'Authentication Failure',
//         });
//       }
//     } catch (e: any) {
//       return res.status(500).send({
//         success: false,
//         message: e.message,
//       });
//     }
//   }
// };

// const logout = async (req: express.Request, res: express.Response) => {
//   if (req.signedCookies[authJWTName]) {
//     return res.clearCookie(authJWTName).status(200).json({
//       message: 'Logged out successfully',
//     });
//   } else {
//     res.status(400).json({
//       error: 'Cookie does not exist',
//     });
//   }
// };

const login = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  passport.authenticate(
    'local',
    {
      failureMessage: true,
    },
    (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send({ Message: 'User does not exist' });
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.send({ Message: 'Successful Login' });
      });
    },
  )(req, res, next);
};

const logout = async (req: express.Request, res: express.Response) => {
  req.logout();
  return res.send({ authenticated: req.isAuthenticated() });
  // res.redirect('api/user/login');
};

const register = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;
  // Check if user exists
  const user: IUser | null = await retrieveUser(email);
  if (user) {
    res.status(400).send({
      message: `User with email ${email} already has an account.`,
    });
    return;
  }
  // Create user
  return createUser(email, password)
    .then(() => res.sendStatus(201))
    .catch((e) => {
      console.log(e);
      res.status(400).send({ message: e });
    });
};

export { login, logout, register };
