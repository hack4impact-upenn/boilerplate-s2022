import { postData } from '../util/api';

const BACKENDURL = 'http://localhost:4000';
async function login(email: string, password: string) {
  const res = await postData(`${BACKENDURL}/api/auth/login`, {
    email,
    password,
  });
  if (res.error) return false;
  return true;
}

async function register(email: string, password: string) {
  const res = await postData(`${BACKENDURL}/api/auth/register`, {
    email,
    password,
  });
  if (res.error) return false;
  return true;
}

async function forgotPassword(email: string) {
  alert('if email is registered, send email to reset password');
  return true;
}

async function resetPassword(email: string) {
  alert(
    'if email is registered, change password from old password to new password',
  );
  return true;
}

export { register, login, forgotPassword, resetPassword };
