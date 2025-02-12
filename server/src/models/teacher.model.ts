import mongoose from 'mongoose';

const TeacherSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

interface ITeacher extends mongoose.Document {
  _id: string;
  userId: string;
  school: string;
  location: string;
}

const Teacher = mongoose.model<ITeacher>('Teacher', TeacherSchema);

export { ITeacher, Teacher };
