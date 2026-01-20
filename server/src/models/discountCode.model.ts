/**
 * Defines the DiscountCode model for the database
 */
import mongoose from 'mongoose';
import { randomUUID } from 'crypto';

const PopcornPricesSchema = new mongoose.Schema({
  caramel: { type: Number, default: 5.75, min: 0 },
  respresso: { type: Number, default: 5.75, min: 0 },
  butter: { type: Number, default: 5.75, min: 0 },
  cheddar: { type: Number, default: 5.75, min: 0 },
  kettle: { type: Number, default: 5.75, min: 0 },
});

const DiscountCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: false,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    default: '',
    lowercase: true,
    trim: true,
  },
  price: {
    type: Number,
    required: false,
    min: 0,
    default: 5.75,
  },
  popcornPrices: {
    type: PopcornPricesSchema,
    required: false,
  },
  description: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Generate UUID for code if not provided
DiscountCodeSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  if (!this.code) {
    this.code = randomUUID();
  }
  next();
});

interface IPopcornPrices {
  caramel: number;
  respresso: number;
  butter: number;
  cheddar: number;
  kettle: number;
}

interface IDiscountCode extends mongoose.Document {
  _id: string;
  code: string;
  email: string;
  price: number;
  popcornPrices?: IPopcornPrices;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DiscountCode = mongoose.model<IDiscountCode>(
  'DiscountCode',
  DiscountCodeSchema,
);

export { IDiscountCode, DiscountCode, IPopcornPrices };
