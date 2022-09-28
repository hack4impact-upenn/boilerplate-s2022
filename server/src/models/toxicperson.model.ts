import mongoose from 'mongoose';

interface IToxicPerson extends mongoose.Document {
  _id: string;
  firstName: string;
  lastName: string;
  pictureUrl: string;
  toxicTraits: [string];
}

const ToxicPersonSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  pictureUrl: { type: String, required: true },
  toxicTraits: { type: Array, required: true },
});

const ToxicPerson = mongoose.model<IToxicPerson>(
  'ToxicPerson',
  ToxicPersonSchema,
);

export { IToxicPerson, ToxicPerson };
