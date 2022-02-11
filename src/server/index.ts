import createServer from './config/createServer';
import db from './config/database';
import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { userRouter } from './routers/user.router'

const main = async () => {
  // listen for termination
  process.on('SIGTERM', () => process.exit());
  await db.open();

  // creater server on designated port
  const app = createServer();
  app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')} 🚀`);
    console.log('  Press Control-C to stop\n');
  });

  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(passport.initialize());
  app.use(userRouter)

  const port = process.env.PORT || 8000;
  app.get('/', (req, res) => {
    res.json({
        message: "Node Cookie JWT Service"
    })
})

};

let a = 2;

// instantiate app
main();
