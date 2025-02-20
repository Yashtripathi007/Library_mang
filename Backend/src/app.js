import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { config } from "dotenv";
config({
  path: "./src/config/.env",
});

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    credentials: true,
    optionsSuccessStatus: 200,
    exposedHeaders: ["Set-Cookie"],
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Access-Control-Allow-Origin",
      "Content-Type",
      "Authorization",
      "Set-Cookie",
    ],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log("\n");
  console.log("/******* Request ******/");
  console.log("method : ", req.method);
  console.log("url : ", req.url);
  console.log("/*************/");
  console.log("\n");
  next();
});

import authRoutes from "./routes/authRoute.js";
app.use("/api/auth", authRoutes);

export default app;
