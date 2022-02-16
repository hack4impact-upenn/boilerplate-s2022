import mongoose from 'mongoose';

interface IUser extends mongoose.Document {
    _id: string;
    email: string;
    password: string;
}

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model<IUser>('User', UserSchema);

export { User, IUser };