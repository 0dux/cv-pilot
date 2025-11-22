import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../db/db.js";
import { registerUserData, type RegisterUserData } from "../types/schema.js";


//Register a new user
export const registerUser = async (req: Request, res: Response) => {
  try {
    const userData: RegisterUserData = req.body;

    //validate data sent
    const result = registerUserData.safeParse(userData);
    if (!result.success) {
      res.status(400).json({ message: "Invalid data passed !!!" });
      return;
    }

    //destructure the data
    const { name, email, password } = result.data;

    //check if the user with that email already exists
    if (await User.findOne({ email: email })) {
      //dont use "find" here as it'll always be truthy because of [] even empty array is considered true.
      res.status(409).json({
        message: "User with this email already exists!!!",
      });
    }

    //create new user
    const newUser = await User.create({
      name: name,
      email: email,
      password: password,
    });

    const secret = process.env["JWT_SECRET"];
    if (!secret) throw new Error("JWT_SECRET not recieved!!!");

    const token = jwt.sign({ userId: newUser._id }, secret, {
      expiresIn: "2 days",
    });

    res.json({
      message: "User registered succesfully!!!",
      token,
    });
  } catch (error) {
    console.log(error);
  }
};
