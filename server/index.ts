import createServer from './src/config/createServer';
import db from './src/config/database';

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
};
<<<<<<< HEAD:server/index.ts

=======
>>>>>>> master:src/server/index.ts
// instantiate app
main();
