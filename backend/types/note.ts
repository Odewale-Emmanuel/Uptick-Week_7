import mongoose, { Document } from "mongoose";
interface INote extends Document {
  title: string;
  content: string;
  user_id: mongoose.Types.ObjectId;
  favorite: boolean;
  tags: string[];
  created_at: Date;
  updated_at: Date;
}

export { INote };
