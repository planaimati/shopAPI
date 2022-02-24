import { Application, Request, Response, NextFunction } from "express";
import { Product } from "../models/Product";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    productName,
    productBrand,
    productAmount,
    productDesc,
    productSize,
    productImage,
    productPrice,
  } = req.body;

  try {
    const newProduct = await Product.create({
      productName,
      productPrice,
      productBrand,
      productAmount,
      productDesc,
      productSize,
      productImage,
    });

    res.status(200).json({ newProduct });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allProducts = await Product.find({});

    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
