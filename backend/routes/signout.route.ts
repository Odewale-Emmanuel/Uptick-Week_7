import { Router } from "express";
import signOut from "../controller/signout.controller";

const router = Router();

router.post("/", signOut);

export default router;
