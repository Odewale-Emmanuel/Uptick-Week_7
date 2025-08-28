import { Router } from "express";
import getNotes, {
  deleteNote,
  updateNote,
  createNote,
} from "../controller/note.controller";
const router = Router();

router
  .get("/", getNotes)
  .post("/", createNote)
  .patch("/", updateNote)
  .delete("/", deleteNote);

export default router;
