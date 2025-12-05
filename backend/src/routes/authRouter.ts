import type { Response, Request } from "express";
import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/test", authMiddleware, (req: Request, res: Response) => {
  const payload = req.payload;
  const { userId } = payload;
  res.json({
    userId,
    message: "Test route acces granted!!!",
  });
});

export default authRouter;
