import { postData } from '../util/api';

// const BACKENDURL = 'http://localhost:4000';
async function login(email: string, password: string) {
  const res = await postData('auth/login', {
    email,
    password,
  });
  console.log('login res is', res);
  if (res.error) return false;
  return true;
}

async function register(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) {
  const res = await postData('auth/register', {
    firstName,
    lastName,
    email,
    password,
  });
  console.log('register res is', res);
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
