import { hash } from 'bcrypt';
import { User } from '../models/user';

const passwordHashSaltRounds = 10;
const createUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) => {
  const hashedPassword = await hash(password, passwordHashSaltRounds);
  if (!hashedPassword) {
    console.log('Error hashing password');
    return null;
  }
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    admin: false,
  });
  const user = await newUser.save();
  return user;
};

const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email }).select(['-password']).exec();
  return user;
};

const getUserByVerificationToken = async (verificationToken: string) => {
  const user = await User.findOne({ verificationToken })
    .select(['-password'])
    .exec();
  return user;
};

const getUserById = async (id: string) => {
  const user = await User.findById(id).select(['-password']).exec();
  return user;
};

const getUserByResetPasswordToken = async (resetPasswordToken: string) => {
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTokenExpiryDate: { $gt: Date.now() },
  }).exec();
  return user;
};

const getUserByEmailWithPassword = async (email: string) => {
  const user = await User.findOne({ email }).exec();
  return user;
};

const getAllUsersFromDB = async () => {
  const userList = await User.find({}).select(['-password']).exec();
  return userList;
};

/**
 * A function that upgrades a certain user to an admin.
 * @param id
 * @returns updated user
 */
const toggleAdmin = async (id: string) => {
  const user = await User.findByIdAndUpdate(id, [
    { $set: { admin: { $eq: [false, '$admin'] } } },
  ]).exec();
  return user;
};

const deleteUserById = async (id: string) => {
  const user = await User.findByIdAndDelete(id).exec();
  return user;
};

export {
  passwordHashSaltRounds,
  createUser,
  getUserByEmail,
  getUserByVerificationToken,
  getUserById,
  getUserByEmailWithPassword,
  getUserByResetPasswordToken,
  getAllUsersFromDB,
  toggleAdmin,
  deleteUserById,
};
