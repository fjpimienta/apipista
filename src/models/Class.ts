import mongoose, { Schema, Document } from 'mongoose';

export interface IClass extends Document {
  name: string;
  cost: number;
  startTime: string;
  endTime: string;
  teacher: mongoose.Schema.Types.ObjectId;
  active: boolean;
  registerUser: string;
  updateUser: string;
  registerDate: Date;
  updateDate: Date;
}

const ClassSchema: Schema = new Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  active: { type: Boolean, required: true },
  registerUser: { type: String, required: true },
  updateUser: { type: String, required: true },
  registerDate: { type: Date, required: true, default: Date.now },
  updateDate: { type: Date, required: true, default: Date.now },
});

export default mongoose.model<IClass>('Class', ClassSchema);
