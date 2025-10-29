import express from "express";
import userRouter from "./routes/user.routes";
import dotenv from "dotenv";
import connectDb from "./config/db";

dotenv.config();
connectDb();

const app = express();
//imported modules
app.use(express.json());

//routers
app.use("/user", userRouter);

export default app;
