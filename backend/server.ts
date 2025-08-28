import express, { Response, Request } from "express";
import userRouter from "./routes/user.route";
import noteRouter from "./routes/note.route";
import signInRouter from "./routes/signin.route";
import signUpRouter from "./routes/signup.route";
import signOutRouter from "./routes/signout.route";
// import { expressjwt } from "express-jwt";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { tokenAuthenticaton } from "./middleware/authenticate-user-token";
const cors = require("cors");
dotenv.config();

const app = express();
const PORT = process.env.PORT;

const allowedOrigins = [
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin: any, callback: any) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  }),
  express.json(),
  cookieParser()
);

app.get("/", async (req: Request, res: Response) => {
  try {
    res.send("my third server using express, mongoose and mongodb");
  } catch (err) {
    res.status(500).json({ error: "a server side error occurred" });
  }
});

app.use("/api/sign-up", signUpRouter);
app.use("/api/sign-in", signInRouter);
app.use("/api/sign-out", signOutRouter);
app.use("/api/user", tokenAuthenticaton, userRouter);
app.use("/api/note", tokenAuthenticaton, noteRouter);

app.listen(PORT, () => {
  console.log(`App is Listening on port: ${PORT}`);
});
