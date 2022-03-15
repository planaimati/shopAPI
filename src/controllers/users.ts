import { Application, Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import passport from "passport";

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
          admin: false,
        })
      );

      res.status(200).json({ admin: newUser.admin, email: newUser.email });
    } else {
      return res
        .status(404)
        .json({ msg: `Login ${req.body.email} jest już zajęty` });
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
  // try {
  //   const user = await User.findOne({ email: req.body.email });

  //   res.status(200).json({ user });
  // } catch (error) {
  //   res.status(500).json({ msg: error });

  // }

  console.log(req.user);

  res.status(200).json(req.user);
};

export const logIn = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user)
      res.status(403).json({ msg: "Podany login lub hasło są nieprawidłowe" });
    else {
      req.logIn(user, (err) => {
        if (err) throw err;

        res.status(200).json({
          id: user.id,
          email: user.email,
          admin: user.admin,
        });
      });
    }
  })(req, res, next);
};

export const logOut = (req: Request, res: Response, next: NextFunction) => {
  req.logout();
  res.status(200).json({ msg: "pomyslnie wylogowano" });
};
