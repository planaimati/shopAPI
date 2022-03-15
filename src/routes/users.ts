import express from "express";
import {
  registerUser,
  getAllUsers,
  getSingleUser,
  logIn,
  logOut,
} from "../controllers/users";

import {
  createProduct,
  getAllProducts,
  deleteProduct,
  getSingleProduct,
  editProduct
} from "../controllers/product";

export const router = express.Router();

router.route("/login").post(logIn);
router.route("/register").post(registerUser);
router.route("/user").get(getAllUsers);
router.route("/user/:id").get(getSingleUser);
router.route("/logout").get(logOut);
//products
router.route("/product").post(createProduct);
router.route("/product").get(getAllProducts);
router.route("/product/:id").delete(deleteProduct);
router.route("/product/:id").get(getSingleProduct);
router.route("/product/:id").patch(editProduct)
