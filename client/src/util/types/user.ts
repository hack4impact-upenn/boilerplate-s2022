/**
 * Interface for the user data type return from the backend
 */
interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'teacher' | 'admin' | 'speaker';
  admin: boolean;
}

export default IUser;
