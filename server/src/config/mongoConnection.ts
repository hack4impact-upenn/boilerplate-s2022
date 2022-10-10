import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import 'dotenv/config';
import MongoStore from 'connect-mongo';

/* uncomment for database logger */
// mongoose.set('debug', process.env.DEBUG !== 'production');

// Options for the mongodb connection
const opts = {
  // keepAlive is a feature true by default in MongoDB which allows for long TCP connections which allows for long running applications.
  // keepAliveInitialDelay causes keepAlive to start after 300000 milliseconds to prevent excessive network traffic
  keepAliveInitialDelay: 300000,
  // the amount of time in milliseconds Mongoose will spend attempting to connect to a valid server.
  serverSelectionTimeoutMS: 5000,
  // how long mongoose will wait after opening a socket
  // This should be set to 2x-3x the slowest operation.
  socketTimeoutMS: 45000,
};

/**
 * The class for creating, using, and closing the single connection to the
 * MongoDB database this server is configured for. If in a testing environment,
 * the database will be in memory instead of linking to the URI specified by
 * the .env file.
 */
class MongoConnection {
  private static instance: MongoConnection;

  private mongoMemoryServer: MongoMemoryServer | null;

  private mongoUri: string;

  private constructor(
    mongoUrl: string,
    memoryServer: MongoMemoryServer | null = null,
  ) {
    this.mongoUri = mongoUrl;
    this.mongoMemoryServer = memoryServer;
  }

  static async getInstance(): Promise<MongoConnection> {
    if (!MongoConnection.instance) {
      // If in a testing environment, create an in memory database to connect to
      if (process.env.NODE_ENV === 'test') {
        const mongod = await MongoMemoryServer.create();
        MongoConnection.instance = new MongoConnection(mongod.getUri(), mongod);
      } else {
        MongoConnection.instance = new MongoConnection(
          process.env.ATLAS_URI || 'NO ATLAS_URI IN .ENV',
        );
      }
    }
    return MongoConnection.instance;
  }

  /**
   * Opens a connection to the MongoDB database the project is configured for
   */
  public async open(): Promise<void> {
    try {
      mongoose
        .connect(this.mongoUri, opts)
        .catch((e) =>
          console.error(
            `Connection to MongoDB failed at: ${this.mongoUri}. ` +
              `Please check your env file to ensure you have the correct link. \n`,
            e,
          ),
        );

      mongoose.connection.on('connected', () => {
        console.log('MongoDB: Connected ✅');
      });

      mongoose.connection.on('disconnected', () => {
        if (process.env.NODE_ENV === 'test') {
          return; // Can't log after tests are done, Jest fails
        }
        console.log('MongoDB: Disconnected 🛑');
      });

      mongoose.connection.on('error', (err: Error) => {
        console.log(`ERROR MongoDB: `, err);
        if (err.name === 'MongoNetworkError') {
          setTimeout(() => mongoose.connect(this.mongoUri, opts), 5000);
        }
      });
    } catch (err) {
      console.log('ERROR while opening: ', err);
      throw err;
    }
  }

  /**
   * Clears all the collections of the {@link MongoMemoryServer} the
   * instance is connected to. If not connected to an in memory server, nothing
   * occurs. Useful to call in between tests.
   */
  public async clearInMemoryCollections(): Promise<void> {
    if (this.mongoMemoryServer && mongoose.connection.db) {
      const collections = await mongoose.connection.db.collections();
      Object.values(collections).forEach(async (collection) => {
        await collection.deleteMany({}); // No filter deletes all documents
      });
    }
  }

  /**
   * @returns A new {@link MongoStore} instance for storing user sessions in
   * the instance's database
   */
  public createSessionStore(): MongoStore {
    return new MongoStore({ mongoUrl: this.mongoUri });
  }

  /**
   * Closes the connection to the MongoDB database for the instance
   */
  public async close(): Promise<void> {
    try {
      await mongoose.disconnect();
      if (process.env.NODE_ENV === 'test') {
        await this.mongoMemoryServer!.stop();
      }
    } catch (err) {
      console.log('db.close: ', err);
      throw err;
    }
  }
}

export default MongoConnection;
