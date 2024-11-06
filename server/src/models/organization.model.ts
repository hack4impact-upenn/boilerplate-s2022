import mongoose from 'mongoose';

interface IOrganization extends mongoose.Document {
  _id: string;
  organizationName: string;
  status: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}
const OrganizationSchema = new mongoose.Schema(
  {
    organizationName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Member', 'DJIBRIL', 'Model Member'],
      required: true,
    },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  },
  {
    collection: 'organization',
  },
);

const Organization = mongoose.model<IOrganization>(
  'Organization',
  OrganizationSchema,
);
export { IOrganization, Organization };
