import { postData } from '../util/api';

async function logout() {
  const res = await postData('auth/logout');
  console.log('login res is', res);
  if (res.error) return false;
  return true;
}

// eslint-disable-next-line import/prefer-default-export
export { logout };
