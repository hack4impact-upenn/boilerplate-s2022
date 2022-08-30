import express from 'express';
import path from 'path';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import MongoStore from 'connect-mongo';
import routers from '../routes/routers';
import initializePassport from './configPassport';
import 'dotenv/config';
import apiErrorResponder from './apiErrorResponder';
import ApiError from './ApiError';

/**
 * Sets the session store of the express instance to use the mongoDB URI
 * specified by the curreent environment variables.
 * @param app The express instance to set the express-session of.
 */
const setExpressSession = (app: express.Express): void => {
  console.log(
    'process.env.ATLAS_URI in resetSessionStore: ',
    process.env.ATLAS_URI,
  );
  app.use(
    session({
      secret: process.env.COOKIE_SECRET || 'mysecretkey',
      resave: false, // don't save session if unmodified
      saveUninitialized: false, // don't create session until something stored
      store: new MongoStore({ mongoUrl: process.env.ATLAS_URI }), // use MongoDB to store session info
      cookie: {
        maxAge:
          Number(process.env.COOKIE_EXPIRATION_TIME) || 1000 * 60 * 60 * 24, // 1 day default
      },
    }),
  );
};

const createServer = (): express.Express => {
  const app = express();

  // Set up passport and strategies
  initializePassport(passport);

  // Sets the port for the app
  app.set('port', process.env.PORT || 4000);
  // Gives express the ability to parse requests with JSON and turn the JSON into objects
  app.use(express.json());
  // Gives express the ability to parse urlencoded payloads
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );
  // Gives express the ability accept origins outside its own to accept requests from
  app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
  // Gives express the ability to parse client cookies and add them to req.cookies
  app.use(cookieParser(process.env.COOKIE_SECRET));

  // Use express-session to maintain sessions
  setExpressSession(app);

  // Init passport on every route call and allow it to use "express-session"
  app.use(passport.initialize());
  app.use(passport.session());

  // Inits routers listed in routers.ts file
  routers.forEach((entry) => app.use(entry.prefix, entry.router));

  // Serving static files
  if (process.env.NODE_ENV === 'production') {
    const root = path.join(__dirname, '..', 'client', 'build');

    app.use(express.static(root));
    app.get('*', (_: any, res: any) => {
      res.sendFile('index.html', { root });
    });
  }

  // Handles all non matched routes
  app.use((req, res, next) => {
    next(ApiError.notFound('Endpoint unavailable'));
  });

  // Sets the error handler to use for all errors passed on by previous handlers
  app.use(apiErrorResponder);

  return app;
};

export { createServer, setExpressSession };
