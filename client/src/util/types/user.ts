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

interface ITeacherDetails {
  department: string;
  subjects: string[];
  officeHours?: string;
  officeLocation?: string;
}

interface IStudentDetails {
  studentId: string;
  grade: number;
  enrollmentDate: Date;
  courses: string[];
}

export type { IUser, ITeacherDetails, IStudentDetails };
