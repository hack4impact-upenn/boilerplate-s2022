/**
 * Defines the PopcornPrice model for the database
 */
import mongoose from 'mongoose';

const PopcornPriceSchema = new mongoose.Schema({
  caramel: {
    type: Number,
    required: true,
    default: 5.75,
    min: 0,
  },
  respresso: {
    type: Number,
    required: true,
    default: 5.75,
    min: 0,
  },
  butter: {
    type: Number,
    required: true,
    default: 5.75,
    min: 0,
  },
  cheddar: {
    type: Number,
    required: true,
    default: 5.75,
    min: 0,
  },
  kettle: {
    type: Number,
    required: true,
    default: 5.75,
    min: 0,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
PopcornPriceSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

interface IPopcornPrice extends mongoose.Document {
  _id: string;
  caramel: number;
  respresso: number;
  butter: number;
  cheddar: number;
  kettle: number;
  updatedAt: Date;
}

const PopcornPrice = mongoose.model<IPopcornPrice>(
  'PopcornPrice',
  PopcornPriceSchema,
);

export { IPopcornPrice, PopcornPrice };
