import { hash } from 'bcrypt';
import { User } from '../models/user';

const createUser = async (email: string, password: string) => {
  const saltRounds = 10;
  const hashedPassword = await hash(password, saltRounds);
  if (!hashedPassword) {
    console.log('Error hashing password');
    return null;
  }

  // const dumbUser = new dummyUser({
  //   email: email,
  //   password: hashedPassword,
  // });

  // console.log(`Creating user ${dumbUser}`);

  // const newUser = await User.create({
  //   accountType: 'internal',
  //   internalAccount: {
  //     email: email,
  //     password: hashedPassword,
  //   },
  // });

  const newUser = new User({
    accountType: 'internal',
    email: email,
    password: hashedPassword,
  });

  console.log(newUser);
  return newUser.save();
};

const retrieveUser = async (email: string) => {
  const user = await User.findOne({ email: email }).exec();
  console.log('user retrieved: ', user);
  return user;
};

export { createUser, retrieveUser };
