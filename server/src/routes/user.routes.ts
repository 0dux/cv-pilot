import { Router } from "express";
import { test } from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", test);

export default userRouter;
