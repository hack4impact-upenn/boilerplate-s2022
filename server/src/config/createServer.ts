import express from 'express';
import path from 'path';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import userRouter from '../routes/auth.route';
import initializePassport from './configPassport';
import 'dotenv/config';

const createServer = (): express.Express => {
  const app = express();

  // Set up passport and strategies
  initializePassport(passport);

  // sets the port for the app
  app.set('port', process.env.PORT || 4000);
  // gives express the ability to parse requests with JSON and turn the JSON into objects
  app.use(express.json());
  // gives express the ability to parse urlencoded payloads
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );
  // gives express the ability accept origins outside its own to accept requests from
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(express.urlencoded({ extended: true }));

  // TODO: see if need to change settings here for security
  app.use(
    session({
      secret: process.env.COOKIE_SECRET || 'mysecretkey',
      resave: true,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        secure: true,
        maxAge: Number(process.env.COOKIE_EXPIRATION_TIME) || 86400000,
      },
    }),
  );

  // Init passport on every route call and allow it to use "express-session"
  app.use(passport.initialize());
  app.use(passport.session());

  // Use the userRouter for any requests to the api/users route
  app.use('/api/user', userRouter);

  app.get('/', (req, res) => {
    res.json({
      message: 'Node Cookie JWT Service',
    });
  });

  // Serving static files
  if (process.env.NODE_ENV === 'production') {
    const root = path.join(__dirname, '..', 'client', 'build');

    app.use(express.static(root));
    app.get('*', (_: any, res: any) => {
      res.sendFile('index.html', { root });
    });
  }

  return app;
};
export default createServer;
