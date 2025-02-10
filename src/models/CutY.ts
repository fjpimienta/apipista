import mongoose, { Schema, Document } from 'mongoose';

export interface ICutY extends Document {
  date: string;
  totalAmount: number;
  cutsX: mongoose.Schema.Types.ObjectId[];
  active: boolean;
  description: string;
  registerUser: string;
  updateUser: string;
  registerDate: Date;
  updateDate: Date;
}

const CutYSchema: Schema = new Schema({
  date: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  cutsX: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CutX', required: true }],
  active: { type: Boolean, required: true },
  description: { type: String, required: true },
  registerUser: { type: String, required: true },
  updateUser: { type: String, required: true },
  registerDate: { type: Date, required: true, default: Date.now },
  updateDate: { type: Date, required: true, default: Date.now },
});

export default mongoose.model<ICutY>('CutY', CutYSchema);
