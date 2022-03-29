import express from 'express';
import path from 'path';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from '../routes/auth.route';
import 'dotenv/config';

// const port = process.env.PORT || 8000;

const createServer = (): express.Express => {
  const app = express();
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
  app.use(passport.initialize());
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
