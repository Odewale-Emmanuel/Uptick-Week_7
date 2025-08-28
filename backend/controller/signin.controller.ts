import mongoose from "mongoose";
import userModel from "../model/user";
import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const mongoUri = process.env.MONGODB_URI;
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;
const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;

if (!mongoUri) {
  throw new Error("MONGODB_URI is not defined in environment variables.");
}
if (!TOKEN_SECRET_KEY) {
  throw new Error("TOKEN_SECRET_KEY is not defined in environment variables.");
}
if (!REFRESH_TOKEN_SECRET_KEY) {
  throw new Error(
    "REFRESH_TOKEN_SECRET_KEY is not defined in environment variables."
  );
}

mongoose.connect(mongoUri);

async function signIn(req: Request, res: Response) {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  let existingUser = null;

  if (!userEmail || !userPassword) {
    res.status(400).send("Missing required fields: email and password");
    return;
  }

  try {
    existingUser = await userModel.findOne({
      email: userEmail,
    });
    if (!existingUser) {
      res.status(404).send(`User with email: ${userEmail} not found`);
    }
  } catch (error: any) {
    console.error(error.message);
    res
      .status(500)
      .send(
        `An error occurred while trying to verify user: ${userEmail} ERROR-MESSAGE: --> ${error.nessage}`
      );
    throw new Error(
      `An error occurred while trying to verify user: ${userEmail} ERROR-MESSAGE: --> ${error.nessage}`
    );
  }

  if (existingUser) {
    try {
      const isMatch = await bcrypt.compare(userPassword, existingUser.password);
      if (!isMatch) {
        res.status(401).send("incorrect user password");
        return;
      }

      const { _id, name, email } = existingUser;
      const accessToken = jwt.sign(
        { _id, name, email },
        String(TOKEN_SECRET_KEY),
        {
          expiresIn: "30m",
        }
      );

      const refreshToken = jwt.sign(
        { _id, name, email },
        String(REFRESH_TOKEN_SECRET_KEY),
        {
          expiresIn: "7d",
        }
      );

      res.cookie("accessToken", accessToken, {
        // httpOnly: true,
        secure: true,
        maxAge: 30 * 60 * 1000,
        sameSite: "none",
        partitioned: true,
      });

      res.cookie("refreshToken", refreshToken, {
        // httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "none",
        partitioned: true,
      });

      res.json({ accessToken });
    } catch (error: any) {
      console.error(`An error occurred. ERROR MESSAGE: ${error.message}`);
      res
        .status(500)
        .send(`An error occurred. ERROR MESSAGE: ${error.message}`);
    }
  }
}

export default signIn;
