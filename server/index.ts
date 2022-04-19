import db from './src/config/database';
import createServer from './src/config/createServer';

const main = async () => {
  // Listen for termination
  process.on('SIGTERM', () => process.exit());

  // Set up the datbase
  db.open().then(() => {
    // Create server on designated port
    const app = createServer();
    app.listen(app.get('port'), () => {
      console.log(`Listening on port ${app.get('port')} 🚀`);
      console.log('  Press Control-C to stop\n');
    });
  });
};

// instantiate app
main();
