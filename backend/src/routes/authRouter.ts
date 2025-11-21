import { Router } from "express";
import { registerUser } from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
// authRouter.post("/login");

export default authRouter;
