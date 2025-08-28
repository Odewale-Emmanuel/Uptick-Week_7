import { Router } from "express";
import getUsers, {
  deleteUser,
  updateUser,
} from "../controller/user.controller";
const router = Router();

router.get("/", getUsers).patch("/", updateUser).delete("/", deleteUser);

export default router;
