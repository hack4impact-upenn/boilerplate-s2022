/**
 * Defines the Order model for the database and also the interface to
 * access the model in TypeScript.
 */
import mongoose from 'mongoose';

const PopcornQuantitiesSchema = new mongoose.Schema({
  caramel: { type: Number, default: 0 },
  respresso: { type: Number, default: 0 },
  butter: { type: Number, default: 0 },
  cheddar: { type: Number, default: 0 },
  kettle: { type: Number, default: 0 },
});

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  uuid: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    default: '',
  },
  company: {
    type: String,
    default: '',
  },
  shippingAddress: {
    type: String,
    default: '',
  },
  shippingAddress1: {
    type: String,
    default: '',
  },
  shippingAddress2: {
    type: String,
    default: '',
  },
  shippingCity: {
    type: String,
    default: '',
  },
  shippingState: {
    type: String,
    default: '',
  },
  shippingPostalCode: {
    type: String,
    default: '',
  },
  discountCode: {
    type: String,
    default: '',
  },
  discountPrice: {
    type: Number,
    default: 0,
  },
  amountPaid: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    enum: [
      'Inquiry',
      'Confirmed',
      'In Production',
      'Ready to Ship',
      'Shipped',
      'Invoiced',
    ],
    required: true,
    default: 'Inquiry',
  },
  // Status date tracking - records when order entered each status
  statusDates: {
    inquiry: { type: Date, default: null },
    confirmed: { type: Date, default: null },
    inProduction: { type: Date, default: null },
    readyToShip: { type: Date, default: null },
    shipped: { type: Date, default: null },
    invoiced: { type: Date, default: null },
  },
  popcornQuantities: {
    type: PopcornQuantitiesSchema,
    required: true,
    default: () => ({
      caramel: 0,
      respresso: 0,
      butter: 0,
      cheddar: 0,
      kettle: 0,
    }),
  },
  submittedAt: {
    type: Date,
    required: true,
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

// Update the updatedAt field before saving
OrderSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

interface IPopcornQuantities {
  caramel: number;
  respresso: number;
  butter: number;
  cheddar: number;
  kettle: number;
}

interface IStatusDates {
  inquiry: Date | null;
  confirmed: Date | null;
  inProduction: Date | null;
  readyToShip: Date | null;
  shipped: Date | null;
  invoiced: Date | null;
}

interface IOrder extends mongoose.Document {
  _id: string;
  orderId: string;
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  phoneNumber: string;
  company: string;
  shippingAddress: string;
  shippingAddress1: string;
  shippingAddress2: string;
  shippingCity: string;
  shippingState: string;
  shippingPostalCode: string;
  discountCode: string;
  discountPrice: number;
  amountPaid: number;
  status:
    | 'Inquiry'
    | 'Confirmed'
    | 'In Production'
    | 'Ready to Ship'
    | 'Shipped'
    | 'Invoiced';
  statusDates: IStatusDates;
  popcornQuantities: IPopcornQuantities;
  submittedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const Order = mongoose.model<IOrder>('Order', OrderSchema);

export { IOrder, Order, IPopcornQuantities, IStatusDates };
