import { Router } from "express";
import signIn from "../controller/signin.controller";

const router = Router();

router.post("/", signIn);

export default router;
