import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

/* uncomment for database logger */
// mongoose.set('debug', process.env.DEBUG !== 'production');

// options for the mongodb connection
const opts = {
  // keepAlive is a feature true by default in MongoDB which allows for long TCP connections which allows for long running applications.
  // keepAliveInitialDelay causes keepAlive to start after 300000 milliseconds to prevent excessive network traffic
  keepAliveInitialDelay: 300000,
  // serverSelectionTimeoutMS sets the amount of time in milliseconds Mongoose will spend attempting to connect to a valid server.
  serverSelectionTimeoutMS: 5000,
  // socketTimeoutMS details how long mongoose will wait after opening a socket
  // (which is more or less an indiviual network connection with with the database) before closing it due to inactivity.
  // This prevents sockets from remaining open during operations that take more than 45 seconds and hence prevents infinite loops and/or excessive connections.
  // This should be set to 2x-3x the slowest operation.
  socketTimeoutMS: 45000,
};

class MongoConnection {
  private static _instance: MongoConnection;

  // underscore in front indicates the property should be treated as private
  // question mark at the end indicates the property is optional
  private _mongoServer?: MongoMemoryServer;

  static getInstance(): MongoConnection {
    if (!MongoConnection._instance) {
      MongoConnection._instance = new MongoConnection();
    }
    return MongoConnection._instance;
  }

  public async open(): Promise<void> {
    try {
      // If the environment is test, create a new MongoDB server using mongodb-memory-server. This server allows us to store data in memory,
      // preventing database pollution with testing and allowing for quicktesting. If the environment is not test, we attempt to connect to the db.
      if (process.env.NODE_ENV === 'test') {
        console.log('Connecting to In-Memory MongoDB');
        this._mongoServer = new MongoMemoryServer();
        const mongoUrl = await this._mongoServer.getUri();
        await mongoose.connect(mongoUrl, opts);
      } else {
        console.log('Connecting to MongoDB...');
        const uri =
          process.env.ATLAS_URI ||
          'mongodb+srv://NO:CONNECTION@STRING.FOUND.mongodb.net/FAILURE?retryWrites=true&w=majority';
        mongoose
          .connect(uri, opts)
          .catch((e) =>
            console.error(
              `Connection to MongoDB failed at: ${uri}. Please check your env file to ensure you have the correct link. ${e}`,
            ),
          );
      }

      mongoose.connection.on('connected', () => {
        console.log('MongoDB: Connected ✅');
      });

      mongoose.connection.on('disconnected', () => {
        console.log('MongoDB: Disconnected 🛑');
      });

      mongoose.connection.on('error', (err: Error) => {
        console.log(`ERROR MongoDB:  ${String(err)}`);
        if (err.name === 'MongoNetworkError') {
          setTimeout(
            () =>
              mongoose.connect(
                process.env.ATLAS_URI || 'mongodb://localhost:27017/myproject',
                opts,
              ),
            5000,
          );
        }
      });
    } catch (err) {
      console.log(`ERROR db.open: ${err}`);
      throw err;
    }
  }

  // close connection to db and
  public async close(): Promise<void> {
    try {
      await mongoose.disconnect();
      if (process.env.NODE_ENV === 'test') {
        // ! at end indicates to typescript that mongoServer cannot be null or undefined
        await this._mongoServer!.stop();
      }
    } catch (err) {
      console.log(`db.open: ${err}`);
      throw err;
    }
  }
}

export default MongoConnection.getInstance();
