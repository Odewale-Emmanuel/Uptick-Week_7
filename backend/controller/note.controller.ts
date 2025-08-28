import mongoose from "mongoose";
import noteModel from "../model/note";
import { Response, Request } from "express";
import dotenv from "dotenv";
dotenv.config();

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error("MONGODB_URI is not defined in environment variables.");
}

mongoose.connect(mongoUri);

async function createNote(req: Request, res: Response) {
  const title = req.body.title;
  const content = req.body.content;
  const tags = req.body.tags || [];
  const favorite = req.body.favorite || false;
  const user_id = req.body.user_id;

  if (!title || !content || !user_id) {
    res
      .status(400)
      .send("Missing required fields: title, content, and user_id");
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(user_id)) {
    res.status(400).send("Invalid user_id: must be a 24-character hex string");
    return;
  }

  try {
    await noteModel.create({
      title,
      content,
      user_id,
      tags,
      favorite,
    });
    res.status(201).send("note created successfully");
  } catch (error: any) {
    res
      .status(500)
      .send(
        `An error occured while trying to create new note. ERROR-->: ${error.message} `
      );
  }
}

async function getNotes(req: Request, res: Response) {
  try {
    const { user_id } = req.query;

    if (user_id) {
      try {
        const userNotes = await noteModel
          .find()
          .where("user_id")
          .equals(user_id);

        if (userNotes.length) {
          res.status(200).json(userNotes);
        } else {
          res.status(404).send(`No note found for user: ${user_id}`);
        }
      } catch (error: any) {
        res
          .status(400)
          .send(
            `An error occured while getting the notes for user: ${user_id}. Please make sure you pass in a valid user id. ERROR-->: ${error.message}`
          );
      }
      return;
    }

    const notes = await noteModel.find();
    res.status(200).json(notes);
  } catch (error: any) {
    res
      .status(500)
      .send(`An error occured while getting all notes -->: ${error.message} `);
  }
}

async function updateNote(req: Request, res: Response) {
  const noteId = req.body.note_id;
  const title = req.body.title;
  const content = req.body.content;
  const favorite = req.body.favorite || false;
  const tags = req.body.tags || [];
  const updated_at = req.body.updated_at || new Date();

  if (!noteId || !title || !content) {
    res
      .status(400)
      .send("Missing required fields: note_id, title, and content");
    return;
  }

  const foundNote = await noteModel.findById({ _id: noteId });
  if (!foundNote) {
    res.status(404).send("note not found please pass in a valid note id");
    return;
  }

  try {
    await noteModel.findOneAndUpdate(
      { _id: noteId },
      { title, content, favorite, tags, updated_at },
      { runValidators: true }
    );
    res.status(200).send("note updated successfully");
  } catch (error: any) {
    res
      .status(500)
      .send(
        `An error occured while trying to update note. ERROR-->: ${error.message} `
      );
  }
}

async function deleteNote(req: Request, res: Response) {
  const noteId = req.body.note_id || req.query.note_id;

  if (!noteId) {
    res.status(400).send("Missing required field: id");
    return;
  }

  try {
    const deletedNote = await noteModel.deleteOne().where("_id").equals(noteId);
    if (deletedNote.acknowledged && deletedNote.deletedCount >= 1) {
      res.status(200).send("Note deleted successfully");
    } else {
      res.status(404).send(`No Note found for the requested note id ${noteId}`);
    }
  } catch (error: any) {
    res
      .status(500)
      .send(
        `An error occured while trying to delete note. ERROR-->: ${error.message} `
      );
  }
}

export { deleteNote, updateNote, createNote };
export default getNotes;
