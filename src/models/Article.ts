import mongoose, { Schema, Document } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  content: string;
  author: string;
  publishedDate: Date;
  tags: string[];
  active: boolean;
  registerUser: string;
  updateUser: string;
  registerDate: Date;
  updateDate: Date;
}

const ArticleSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  publishedDate: { type: Date, required: true },
  tags: { type: [String], required: true },
  active: { type: Boolean, required: true },
  registerUser: { type: String, required: true },
  updateUser: { type: String, required: true },
  registerDate: { type: Date, required: true, default: Date.now },
  updateDate: { type: Date, required: true, default: Date.now },
});

export default mongoose.model<IArticle>('Article', ArticleSchema);
