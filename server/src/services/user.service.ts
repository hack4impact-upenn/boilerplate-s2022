import { hash } from 'bcrypt';
import { User } from '../models/user';
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
  });
  console.log('newUser: ', newUser);
  const user = await newUser.save();
  return user;
};

const retrieveUser = async (email: string) => {
  const user = await User.findOne({ email: email }).exec();
  return user;
};



export { createUser, retrieveUser };
