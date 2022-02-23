import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';

import { User, IUser } from '../models/user';
import login from '../auth/login';

const router = express.Router();
const saltRounds = 10;
var expirationtimeInMs: string;
var secret: string;
process.env.JWT_EXPIRATION_TIME &&
  (expirationtimeInMs = process.env.JWT_EXPIRATION_TIME);

process.env.JWT_SECRET && (secret = process.env.JWT_SECRET);

router.post('/register', async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;

  if (await User.findOne({ email })) {
    res.status(400).send({
      success: false,
      message: `User with email: ${email} already has an account.`,
    });
  }

  // hash + salt password
  return hash(password, saltRounds, (err: any, hashedPassword: String) => {
    if (err) {
      res.status(400).send({
        success: false,
        message: err.message,
      });
    }

    console.log(hashedPassword);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    return newUser
      .save()
      .then(() => res.status(200).send({ success: true }))
      .catch((e) => res.status(400).send({ errorMessage: e }));
  });
});

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  },
);

router.post('/login', async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;
  let user: IUser;

  User.findOne({ email: email }, function (err: any, userObj: any) {
    if (err) {
      console.log(err);
      res.status(400).send({
        success: false,
        message: err.message,
      });
    } else if (userObj) {
      user = userObj;
      // ************************************************************
      return compare(password, user.internalAccount.password, (err, result) => {
        if (err) {
          res.status(400).send({
            success: false,
            message: err.message,
          });
        }

        if (result) {
          // password matched
          const payload = {
            username: user,
            expiration: Date.now() + parseInt(expirationtimeInMs),
          };
          secret = 'somethingrandom';
          const token = jwt.sign(JSON.stringify(payload), secret);

          res
            .cookie('jwt', token, {
              httpOnly: true,
              secure: false, //--> TODO: SET TO TRUE ON PRODUCTION
            })
            .status(200)
            .json({
              message: 'You have logged in :D',
            });
        }
      });
      // ******************************************************************
    } else {
      res.status(400).send({
        success: false,
        message: `User with email ${email} not found.`,
      });
    }
  });

  console.log('user object found');
});

router.get('/logout', (req, res) => {
  if (req.cookies['jwt']) {
    res.clearCookie('jwt').status(200).json({
      message: 'You have logged out',
    });
  } else {
    res.status(401).json({
      error: 'Invalid jwt',
    });
  }
});

router.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send(200).json({
      message: 'welcome to the protected route!',
    });
  },
);

export { router as userRouter };
