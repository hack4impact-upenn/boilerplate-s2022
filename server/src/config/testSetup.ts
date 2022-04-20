// adapted from https://easyontheweb.com/in-memory-mongodb-for-testing/
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import 'dotenv/config';

let mongo: any;
beforeAll(async () => {
  // Set up new mock DB instance in memory
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  console.log('mock db uri: ', mongoUri);
  process.env.ATLAS_URI = mongoUri; // Set env var so expresss instance can use it
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  // Fixes timeout issue with mongoose
  jest.useFakeTimers('legacy');
  // Clear out all collections before each test
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  // Stop the in-memory MongoDB server and close the connection
  await mongo.stop();
  await mongoose.connection.close();
});
