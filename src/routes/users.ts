import express from "express";
import {
  registerUser,
  getAllUsers,
  getUser,
  logIn,
  logOut,
} from "../controllers/users";

export const router = express.Router();

router.route("/login").post(logIn);
router.route("/register").post(registerUser);
router.route("/allusers").get(getAllUsers);
router.route("/user").get(getUser);
router.route("/logout").get(logOut);
