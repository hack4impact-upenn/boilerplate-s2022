import { hash } from 'bcrypt';
import { User } from '../models/user';

const createUser = async (email: string, password: string) => {

  const saltRounds = 10;
  const hashedPassword = await hash(password, saltRounds);
  if (!hashedPassword) {
    return null;
  }

  const newUser = new User({
    accountType: 'internal',
    internalAccount: {
      email,
      password: hashedPassword,
    },
  });

  return newUser.save();
};

const retrieveUser = async (email: string) => {
  const user = await User.findOne({ internalAccount: { email } }).exec();
  return user;
};

export {createUser, retrieveUser};