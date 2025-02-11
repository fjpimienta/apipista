import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  active: boolean;
  image: string;
  profile: 'admin' | 'collaborator';
  registerUser: string;
  updateUser?: string;
  registerDate: Date;
  updateDate?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  active: { type: Boolean, required: true, default: true },
  image: { type: String, required: false },
  profile: { type: String, required: true, enum: ['admin', 'collaborator'] },
  registerUser: { type: String, required: true },
  updateUser: { type: String, required: false },
  registerDate: { type: Date, required: true, default: Date.now },
  updateDate: { type: Date, required: false, default: Date.now },
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  console.log('candidatePassword:', candidatePassword);
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);