/**
 * Defines the Session model for the database, which stores information
 * about user sessions, and also the interface to access the model in TypeScript.
 */
import mongoose from 'mongoose';

interface ISession extends mongoose.Document {
  _id: string;
  expires: Date;
  session: string;
}

const SessionSchema = new mongoose.Schema({
  expires: {
    type: Date,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
});

const Session = mongoose.model<ISession>('Session', SessionSchema);

export default Session;
