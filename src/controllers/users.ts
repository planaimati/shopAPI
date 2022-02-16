import { Application, Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";

export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userExist = await User.findOne({ email: email });

    if (!userExist) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create(
        new User({
          email: email,
          password: hashedPassword,
        })
      );

      res.status(200).json({ newUser });
    } else {
      return res
        .status(404)
        .json({ msg: `Email ${req.body.email} jest zajęty` });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find({});

    res.status(200).json({ allUsers });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
