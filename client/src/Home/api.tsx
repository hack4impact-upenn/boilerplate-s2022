import { postData, putData } from '../util/api';

async function logout(dispatchLogout: () => void) {
  const res = await postData('auth/logout');
  console.log('login res is', res);
  if (res.error) return false;
  dispatchLogout();
  return true;
}

async function selfUpgrade(email: string) {
  const res = await putData('user/autopromote', { email });
  console.log('register res is', res);
  if (res.error) return false;
  return true;
}

// eslint-disable-next-line import/prefer-default-export
export { logout, selfUpgrade };
