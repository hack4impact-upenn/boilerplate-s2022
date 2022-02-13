import mongoose from 'mongoose';

interface IUser extends mongoose.Document {
    email: String;
    password: String;
}

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model<IUser>('User', UserSchema);

export { User, IUser };