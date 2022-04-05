import express from 'express';
import path from 'path';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import authRouter from '../routes/auth.route';
import initializePassport from './configPassport';
import MongoStore from 'connect-mongo';
import 'dotenv/config';

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
  app.use(cors({ credentials: true }));
  app.use(express.json());
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(express.urlencoded({ extended: true }));

  // Use express-session to maintain sessions
  app.use(
    session({
      secret: process.env.COOKIE_SECRET || 'mysecretkey',
      resave: false, // don't save session if unmodified
      saveUninitialized: false, // don't create session until something stored
      store: new MongoStore({ mongoUrl: process.env.ATLAS_URI }), // use MongoBD to store session info
      cookie: {
        maxAge: Number(process.env.COOKIE_EXP_TIME) || 1000 * 60 * 60 * 24, // 1 day default
      },
    }),
  );

  // Init passport on every route call and allow it to use "express-session"
  app.use(passport.initialize());
  app.use(passport.session());

  // Use the authRouter for any requests to any routes prefixed with /api/auth
  app.use('/api/auth', authRouter);

  // Print out the request session of any requests to the server
  // app.use(
  //   (
  //     req: express.Request,
  //     res: express.Response,
  //     next: express.NextFunction,
  //   ) => {
  //     console.log('hi');
  //     console.log(`${req.method} request to ${req.url}:`);
  //     next();
  //   },
  // );

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
