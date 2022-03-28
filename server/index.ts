import db from './config/database';
import createServer from './config/createServer';

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

  app.get('/', (req, res) => {
    res.json({
      message: 'Node Cookie JWT Service',
    });
  });
};

// instantiate app
main();
