import mongoose from 'mongoose';

const SpeakerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  inperson: {
    type: Boolean,
    required: true,
  },
});

interface ISpeaker extends mongoose.Document {
  _id: string;
  userId: string;
  organization: string;
  bio: string;
  location: string;
  inperson: boolean;
}

const Speaker = mongoose.model<ISpeaker>('Speaker', SpeakerSchema);

export { ISpeaker, Speaker };
