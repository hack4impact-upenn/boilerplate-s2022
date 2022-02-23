import passport from 'passport';
import passportJWT from 'passport-jwt';
import express from 'express';
import mongoose from 'mongoose';
import passport_google_oauth20 from 'passport-google-oauth20';

import { User } from '../models/user';

const JWTStrategy = passportJWT.Strategy;
const GoogleStrategy = passport_google_oauth20.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '38852361546-bdnfn6p686a8mcp1v9ie4kjnnp95vr3p.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: '/auth/google/callback',
    },
    function (
      accessToken: any,
      refreshToken: any,
      profile: any,
      callback: any,
    ) {
      console.log(profile);
      // User.findOne({ googleId: profile.id }, function (err: any, user: any) {
      //   return callback(err, user);
      // });
    },
  ),
);

const secret = process.env.JWT_SECRET;

const cookieExtractor = (req: express.Request) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies['jwt'];
  }

  return jwt;
};

passport.use(
  'jwt',
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: secret,
    },
    (jwtPayload, done) => {
      const { expiration } = jwtPayload;

      if (Date.now() > expiration) {
        done('Unauthorized', false);
      }

      done(null, jwtPayload);
    },
  ),
);
