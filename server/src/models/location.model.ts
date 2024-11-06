/**
 * Defines the User model for the database and also the interface to
 * access the model in TypeScript.
 */
import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

interface ILocation extends mongoose.Document {
  name: string;
  address: string;
  category: string;
}

const Location = mongoose.model<ILocation>('Location', locationSchema);

export { ILocation, Location };
