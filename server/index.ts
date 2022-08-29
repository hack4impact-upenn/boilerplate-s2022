import db from './src/config/database';
import { createServer } from './src/config/createServer';
import 'dotenv/config';

const main = async () => {
  console.log('TEST ', process.env.ATLAS_URI);
  // Listen for termination
  process.on('SIGTERM', () => process.exit());

  // Set up the datbase
  await db.open();

  // Create server on designated port
  const app = createServer();
  app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')} 🚀`);
    console.log('  Press Control-C to stop\n');
  });
};

// instantiate app
main();
