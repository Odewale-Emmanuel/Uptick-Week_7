import { Document } from "mongoose";
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export { IUser };
