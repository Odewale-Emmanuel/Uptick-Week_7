import { Router } from "express";
import signUp from "../controller/signup.controller";
const router = Router();

router.post("/", signUp);

export default router;
