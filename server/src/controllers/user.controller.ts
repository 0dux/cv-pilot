import { Request, Response } from "express";

export const test = (req: Request, res: Response) => {
  res.json({
    message: "User test controller and route is working!!!!",
  });
};
