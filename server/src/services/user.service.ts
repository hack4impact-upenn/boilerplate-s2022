import { hash } from 'bcrypt';
import { User, IUser } from '../models/user';
import { AuthenticationType } from '../models/user';

const createUser = async (email: string, password: string) => {
  const saltRounds = 10;
  const hashedPassword = await hash(password, saltRounds);
  if (!hashedPassword) {
    console.log('Error hashing password');
    return null;
  }
  const newUser = new User({
    accountType: AuthenticationType.Internal,
    email: email,
    password: hashedPassword,
    admin: false,
  });
  const user = await newUser.save();
  return user;
};

const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email: email }).exec();
  return user;
};

const getAllUsersFromDB = async () => {
  const userList = await User.find({}).exec();
  return userList;
};

/**
 * A function that upgrades a certain user to an admin.
 * @param email
 * @returns A boolean indicating whether the upgrade was successful or not
 */
const toggleAdmin = async (user: IUser) => {
  if (user) {
    user.admin = !user.admin;
    await user.save();
    return true;
  } else {
    return false;
  }
};

const deleteUserById = async (id: string) => {
  const user = await User.findByIdAndDelete(id).exec();
  return user;
};

export {
  createUser,
  getUserByEmail,
  getAllUsersFromDB,
  toggleAdmin,
  deleteUserById,
};
