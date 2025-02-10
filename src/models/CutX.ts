import mongoose, { Schema, Document } from 'mongoose';

export interface ICutX extends Document {
  date: string;
  amount: number;
  active: boolean;
  description: string;
  registerUser: string;
  updateUser: string;
  registerDate: Date;
  updateDate: Date;
}

const CutXSchema: Schema = new Schema({
  date: { type: String, required: true },
  amount: { type: Number, required: true },
  active: { type: Boolean, required: true },
  description: { type: String, required: true },
  registerUser: { type: String, required: true },
  updateUser: { type: String, required: true },
  registerDate: { type: Date, required: true, default: Date.now },
  updateDate: { type: Date, required: true, default: Date.now },
});

export default mongoose.model<ICutX>('CutX', CutXSchema);
