import { postData, putData } from '../util/api.tsx';

/**
 * Makes a request to the server to logout a user from the current session
 * @returns true if successful, false otherwise
 */
async function logout() {
  const res = await postData('auth/logout');
  if (res.error) return false;
  return true;
}
/**
 * Makes a request to the server to upgrade a self to admin from the current session
 * @returns true if successful, false otherwise
 * PLEASE REMOVE THIS FUNCTION AND BACKEND ENDPOINT UPON DEPLOYMENT
 */
async function selfUpgrade(email: string) {
  const res = await putData('admin/autopromote', { email });
  if (res.error) return false;
  return true;
}

// eslint-disable-next-line import/prefer-default-export
export { logout, selfUpgrade };
