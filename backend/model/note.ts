import { Schema, model } from "mongoose";
import { INote } from "../types/note";

const noteSchema = new Schema<INote>({
  title: {
    type: String,
    maxLength: [150, `maximum allowed character is 150`],
    required: true,
  },
  content: {
    type: String,
    maxLength: [10000, `maximum allowed character is 10,000`],
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    minLength: [24, `minimum character for user id [Object(_id)] is 24`],
    maxLength: [24, `maximum character for user id [Object(_id)] is 24`],
    required: true,
    ref: "user",
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  tags: {
    type: [String],
    default: [],
  },
  created_at: {
    type: Date,
    immutable: true,
    default: () => new Date(),
  },
  updated_at: {
    type: Date,
    default: () => new Date(),
  },
});

export default model<INote>("note", noteSchema);
