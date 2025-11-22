import dotenv from "dotenv";
import express from "express";
import authRouter from "./routes/authRouter.js";

import connectDB from "./config/config.js";

dotenv.config();
const app = express();

//dependencies
app.use(express.json());

//connect the database
connectDB();

//routes
app.use("/api/v1/auth", authRouter);

export default app;
