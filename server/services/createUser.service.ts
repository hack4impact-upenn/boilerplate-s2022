import { hash } from 'bcrypt';
import { User } from '../models/user';

const saltRounds = 10;

const createUser = async (email: string, password: string) => {
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

export default createUser;
