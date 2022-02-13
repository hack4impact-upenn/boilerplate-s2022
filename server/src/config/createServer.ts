import express from 'express';
import path from 'path';
import cors from 'cors';
import 'dotenv/config';

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
