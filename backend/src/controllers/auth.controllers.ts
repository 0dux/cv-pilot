import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import User from "../db/user.db.js";
import {
  loginUserData,
  registerUserData,
  type LoginUserData,
  type RegisterUserData,
} from "../types/schema.js";
import { signToken } from "../utils/jwt.js";

//Register a new user
export const registerUser = async (req: Request, res: Response) => {
  try {
    const userData: RegisterUserData = req.body;

    //validate data sent
    const result = registerUserData.safeParse(userData);
    if (!result.success) {
      res.status(400).json({
        message: "Invalid data passed !!!",
        errors: result.error.issues,
      });
      return; //at every response it is important to return - to let the program know to finish
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

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env["BCRYPT_ROUNDS"] || "10")
    );
    //create new user
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const token = signToken({ userId: newUser._id });

    res.status(201).json({
      message: "User registered succesfully!!!",
      token,
    });
    return;
  } catch (error) {
    console.error(`Register user error: ${error}`);
    res.status(500).json({
      message: "Internal server error!!!",
    });
    return;
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
        errors: result.error.issues,
      });
      return;
    }

    const { email, password } = result.data;

    const userFound = await User.findOne({ email });

    if (!userFound) {
      res.status(401).json({
        message: "User with this email doesn't exists!!!",
      });
      return;
    }

    const hashedPassword = userFound.password;

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      res.status(401).json({
        message: "Email or password is incorrect!!!",
      });
      return;
    }

    const token = signToken({ userId: userFound._id });

    res.status(200).json({
      message: "Logged in succesfully!!!",
      token,
    });
    return;
  } catch (error) {
    console.error(`Login user error:${error}`);
    res.status(500).json({
      message: "Internal server error!!!",
    });
    return;
  }
};
