import { Schema, model } from "mongoose";
import { IUser } from "../types/user";

const nameRegEx = /^[\p{L}\s'-]+$/u;
const emailRegEx =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
const passwordRegEx =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    maxLength: [150, `maximum allowed character is 150`],
    required: true,
    validate: {
      validator: (v: string) => nameRegEx.test(v),
      message: (props) =>
        `"${props.value}" is not a valid name. Name can only contain letters (including non-English characters), spaces, apostrophes, and hyphens. Examples: "firstname lastname", "firstName middleName lastName", or "Anne-Marie O'Connor".`,
    },
  },
  email: {
    type: String,
    maxLength: [150, `maximum allowed character is 150`],
    required: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: (v: string) => emailRegEx.test(v),
      message: (props) => `"${props.value}" is not a valid email address.`,
    },
  },
  password: {
    type: String,
    minLength: [8, `minimum allowed character is 8`],
    maxLength: [150, `maximum allowed character is 150`],
    required: true,
    validate: {
      validator: (v: string) => passwordRegEx.test(v),
      message: (props) => `"${props.value}" is not a valid email address.`,
    },
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

export default model<IUser>("user", userSchema);
