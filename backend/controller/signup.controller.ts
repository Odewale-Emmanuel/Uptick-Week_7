import mongoose from "mongoose";
import userModel from "../model/user";
import { Response, Request } from "express";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const mongoUri = process.env.MONGODB_URI;
const salt = process.env.SALT;
if (!mongoUri) {
  throw new Error("MONGODB_URI is not defined in environment variables.");
}
if (!salt) {
  throw new Error("salt is not defined in environment variables.");
}

mongoose.connect(mongoUri);

async function signUp(req: Request, res: Response) {
  const hashedPassword = await bcrypt.hash(req.body.password, Number(salt));
  const userName = req.body.name;
  const userEmail = req.body.email;
  const userPassword = hashedPassword;

  if (!userName || !userEmail || !userPassword) {
    res.status(400).send("Missing required fields: name, email and password");
    return;
  }
  try {
    await userModel.create({
      name: userName,
      email: userEmail.toLowerCase(),
      password: userPassword,
    });
    res.status(201).send("user created successfully");
  } catch (error: any) {
    res
      .status(500)
      .send(
        `An error occured while trying to create new user. ERROR-->: ${error.message} `
      );
  }
}

export default signUp;
