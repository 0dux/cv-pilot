import type { Request, Response } from "express";
import { registerUserData, type RegisterUserData } from "../types/schema.js";
import { User } from "../db/db.js";

export const registerUser = async (req: Request, res: Response) => {
  const userData: RegisterUserData = req.body;

  //validate data sent
  const result = registerUserData.safeParse(userData);
  if (!result.success) {
    res.status(400).json({ message: "Invalid data passed !!!" });
    return;
  }

  //check if the user with that email already exists
  if (await User.find({ email: result.data.email })) {
    res.json({
      message: "User with this email already exists!!!",
    });
  }

  //destructure the data
  const { name, email, password } = result.data;

  //create new user
  const newUser = await User.create({
    name: name,
    email: email,
    password: password,
  });

  res.json({
    message: "User registered succesfully!!!",
    user_id: newUser._id,
  });
};
