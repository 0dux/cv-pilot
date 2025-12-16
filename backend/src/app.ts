import express from "express";
import authRouter from "./routes/auth.router.js";

import connectDB from "./config/config.js";
import resumeRouter from "./routes/resume.router.js";

const app = express();

//dependencies
app.use(express.json());

//connect the database
connectDB();

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/resume", resumeRouter);


export default app;
