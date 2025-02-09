import mongoose, { Schema, Document } from 'mongoose';

export interface ITeacher extends Document {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  active: boolean;
  registerUser: string;
  updateUser: string;
  registerDate: Date;
  updateDate: Date;
}

const TeacherSchema: Schema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  active: { type: Boolean, required: true },
  registerUser: { type: String, required: true },
  updateUser: { type: String, required: true },
  registerDate: { type: Date, required: true, default: Date.now },
  updateDate: { type: Date, required: true, default: Date.now },
});

export default mongoose.model<ITeacher>('Teacher', TeacherSchema);
