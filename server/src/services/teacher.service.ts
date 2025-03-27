import { ITeacher, Teacher } from '../models/teacher.model.ts';
import { User } from '../models/user.model.ts';

/**
 * Creates a new teacher profile in the database.
 * @param userId - string representing the user ID
 * @param school - string representing the school name
 * @param location - string representing the location
 * @returns The created Teacher profile
 */
const createTeacher = async (
  userId: string,
  school: string,
  location: string,
) => {
  const newTeacher = new Teacher({
    userId,
    school,
    location,
  });
  const teacher = await newTeacher.save();
  return teacher;
};

/**
 * Gets a teacher from the database by their userId
 * @param userId The userId of the teacher to get
 * @returns The Teacher or null if not found
 */
const getTeacherByUserId = async (userId: string) => {
  const teacher = await Teacher.findOne({ userId }).exec();
  return teacher;
};

/**
 * Gets all teachers from the database
 * @returns Array of all teachers
 */
const getAllTeachers = async () => {
  const teachers = await Teacher.find({})
    .populate('userId', 'firstName lastName email')
    .exec();
  return teachers;
};

/**
 * Updates a teacher's information
 * @param userId - The userId of the teacher to update
 * @param updateData - Object containing the fields to update
 * @returns The updated teacher
 */
const updateTeacher = async (userId: string, updateData: Partial<ITeacher>) => {
  const teacher = await Teacher.findOneAndUpdate({ userId }, updateData, {
    new: true,
  }).exec();
  return teacher;
};

/**
 * Deletes a teacher profile
 * @param userId - The userId of the teacher to delete
 * @returns The deleted teacher
 */
const deleteTeacher = async (userId: string) => {
  const teacher = await Teacher.findOneAndDelete({ userId }).exec();
  return teacher;
};

export {
  createTeacher,
  getTeacherByUserId,
  getAllTeachers,
  updateTeacher,
  deleteTeacher,
}; 