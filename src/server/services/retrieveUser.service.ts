/* eslint-disable no-underscore-dangle */
import { User } from '../models/user';

const retrieveUser = async (email: string) => {
  const user = await User.findOne({ internalAccount: { email } });
  return user;
};

export default retrieveUser;
