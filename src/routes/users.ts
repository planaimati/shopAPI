import express from "express";
import { registerUser, getAllUsers, getUser } from "../controllers/users";

export const router = express.Router();

router.route("/login").post()
router.route("/register").post(registerUser);
router.route("/allusers").get(getAllUsers);
router.route("/user").get(getUser);
