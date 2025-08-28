import mongoose from "mongoose";
import { Response, Request } from "express";
import dotenv from "dotenv";
dotenv.config();

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("MONGODB_URI is not defined in environment variables.");
}

mongoose.connect(mongoUri);

async function signOut(req: Request, res: Response) {
  const logout = res.clearCookie("jwt");
}

export default signOut;
