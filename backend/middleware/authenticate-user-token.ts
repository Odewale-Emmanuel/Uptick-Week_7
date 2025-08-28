import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;
const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;

if (!TOKEN_SECRET_KEY) {
  throw new Error("TOKEN_SECRET_KEY is not defined in environment variables.");
}
if (!REFRESH_TOKEN_SECRET_KEY) {
  throw new Error(
    "REFRESH_TOKEN_SECRET_KEY is not defined in environment variables."
  );
}

function tokenAuthenticaton(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const userToken = authHeader && authHeader.split(" ")[1];

  if (!userToken) {
    res.status(401).send("user token is required!");
  }

  jwt.verify(
    String(userToken),
    String(TOKEN_SECRET_KEY),
    function (err: any, user: any) {
      if (err) {
        res.status(403).send("invalid user token");
      }

      req.user = user;
      next();
    }
  );
}

export { tokenAuthenticaton };
