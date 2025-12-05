import type { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils/jwt.js";

declare global {
  namespace Express {
    interface Request {
      payload: JwtPayload;
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers["authorization"]; //dont keep on forgetting that in express the header are expected in smallCase.
    if (!authorizationHeader) {
      res.status(401).json({
        message: "No authorization headere passed !!!",
      });
      return;
    }

    const parts = authorizationHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      res.status(401).json({
        message: "Invalid authorization header format.",
      });
      return;
    }
    const token = parts[1];
    const payload = verifyToken(token as string); //I don't need !verified token part as it'll throw incase there is some error.
    // console.log(payload);
    req.payload = payload as JwtPayload;
    next();
  } catch (error) {
    console.error("Yoo cuh!! here is some error::", error);
    res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

export default authMiddleware;
