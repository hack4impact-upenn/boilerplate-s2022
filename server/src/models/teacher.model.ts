import mongoose from 'mongoose';

const TeacherSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
});

interface ITeacher extends mongoose.Document {
  _id: string;
  userId: string;
  subject: string;
}

const Teacher = mongoose.model<ITeacher>('Teacher', TeacherSchema);

export { ITeacher, Teacher };
