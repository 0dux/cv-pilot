import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../db/db.js";
import {
  loginUserData,
  registerUserData,
  type LoginUserData,
  type RegisterUserData,
} from "../types/schema.js";

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
      return;
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
    return;
  } catch (error) {
    console.log(error);
  }
};

//Login user
export const loginUser = async (req: Request, res: Response) => {
  try {
    const loginData: LoginUserData = req.body;

    //validate input data
    const result = loginUserData.safeParse(loginData);
    if (!result.success) {
      res.status(400).json({
        message: "Invalid data passed!!!",
      });
      return;
    }

    const { email, password } = result.data;

    if (!(await User.findOne({ email }))) {
      res.status(409).json({
        message: "User with this email doesn't exists!!!",
      });
      return;
    }

    const userFound = await User.findOne({ email, password });
    console.log(userFound);
    if (!userFound) {
      res.status(400).json({
        message: "Email or password is incorrect!!!",
      });
      return;
    }

    const secret = process.env["JWT_SECRET"];
    if (!secret) throw new Error("JWT_SECRET not recieved!!!");

    const token = jwt.sign({ userId: userFound._id }, secret);

    res.json({
      message: "Logged in succesfully!!!",
      token,
    });
    return;
  } catch (error) {
    console.log(error);
  }
};
