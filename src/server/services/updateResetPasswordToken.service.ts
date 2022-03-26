import crypto from 'crypto';
import { User } from '../models/user';

const updateResetPasswordToken = async (email: string) => {
  // note that we use the native crypto library since we want it to be fast
  const token = crypto.randomBytes(20).toString('hex');
  const filter = { internalAccount: { email } };
  const update = {
    resetPasswordToken: token,
    resetPasswordTokenExpires: Date.now() + 3600000,
  };

  await User.findOneAndUpdate(filter, update);
  return token;
};

export default updateResetPasswordToken;
