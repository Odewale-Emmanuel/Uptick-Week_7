import mongoose from "mongoose";
import userModel from "../model/user";
import noteModel from "../model/note";
import { Response, Request } from "express";
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

async function getUsers(req: Request, res: Response) {
  try {
    const { user_id } = req.query;

    if (user_id) {
      try {
        const user = await userModel.findOne({
          _id: user_id,
        });

        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).send(`User with id: ${user_id} not found`);
        }
      } catch (error: any) {
        res
          .status(400)
          .send(
            `An error occured while trying to get requested user: ${user_id} information. Please make sure you pass in a valid user id. ERROR-->: ${error.message}`
          );
      }
      return;
    }

    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error: any) {
    res
      .status(500)
      .send(`An error occured while getting all users -->: ${error.message} `);
  }
}

async function updateUser(req: Request, res: Response) {
  const userId = req.body.id;
  const userName = req.body.name;
  const userEmail = req.body.email;
  const updated_at = new Date();

  if (!userId || !userName || !userEmail) {
    res.status(400).send("Missing required fields: id, name, and email");
    return;
  }

  const foundUser = await userModel.findById({ _id: userId });
  if (!foundUser) {
    res.status(404).send("user not found please pass in a valid user id");
    return;
  }

  try {
    await userModel.findOneAndUpdate(
      { _id: userId },
      { name: userName, email: userEmail, updated_at: updated_at }
    );
    res.status(200).send("user updated successfully");
  } catch (error: any) {
    res
      .status(500)
      .send(
        `An error occured while trying to update user. ERROR-->: ${error.message} `
      );
  }
}

async function deleteUser(req: Request, res: Response) {
  const userId = req.body.id;

  if (!userId) {
    res.status(400).send("Missing required field: id");
    return;
  }

  try {
    const deletedUser = await userModel.deleteOne().where("_id").equals(userId);
    if (deletedUser.acknowledged && deletedUser.deletedCount >= 1) {
      await noteModel.deleteMany().where("user_id").equals(userId);
      res.status(200).send("User deleted successfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error: any) {
    res
      .status(500)
      .send(
        `An error occured while trying to delete user. ERROR-->: ${error.message} `
      );
  }
}

export { deleteUser, updateUser };
export default getUsers;
