import type { Request, Response } from "express";
import { registerUserData, type RegisterUserData } from "../types/schema.js";

export const registerUser = (req: Request, res: Response) => {
  const userData: RegisterUserData = req.body;

  //validate data sent
  if (!registerUserData.safeParse(userData).success) {
    res.status(400).json({ message: "Invalid data passed !!!" });
    return;
  }

  res.json({
    userData,
  });
};
