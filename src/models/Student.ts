import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  lastName: string;
  tutor: string;
  phone: string;
  email: string;
  order: number;
  active: boolean;
  registerUser: string;
  updateUser: string;
  registerDate: Date;
  updateDate: Date;
}

const StudentSchema: Schema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  tutor: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  order: { type: Number, required: true },
  active: { type: Boolean, required: true },
  registerUser: { type: String, required: true },
  updateUser: { type: String, required: true },
  registerDate: { type: Date, required: true, default: Date.now },
  updateDate: { type: Date, required: true, default: Date.now },
});

export default mongoose.model<IStudent>('Student', StudentSchema);
