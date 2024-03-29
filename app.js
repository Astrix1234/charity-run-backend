import express from "express";
import cors from "cors";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";

// import router from "./routes/api/contacts.js";
import routerUsers from "./routes/api/users.js";

import "./config/config-passport.js";

import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use(cookieParser());

app.use(passport.initialize());

app.use(express.static(path.join(__dirname, "public")));

// app.use("/api", router);
app.use("/api", routerUsers);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Not found",
    data: "Not found",
  });
});

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

export default app;
