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
    if (req.user && req.user.admin) {
      const newProduct = await Product.create({
        productName,
        productPrice,
        productBrand,
        productAmount,
        productDesc,
        productSize,
        productImage,
      });

      return res.status(200).json({ newProduct });
    } else {
      return res.status(401).json({ msg: "Need to have admin acces" });
    }
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

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user && req.user.admin) {
      const { id } = req.params;

      const product = await Product.findOneAndDelete({ _id: id });

      if (!product) {
        return res.status(404).json({ msg: "Product does not exist" });
      }

      res.status(200).json({ product });
    } else {
      return res.status(401).json({ msg: "Need to have admin acces" });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const getSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({ _id: id });

    if (!product) {
      return res.status(404).json({ msg: "Product does not exist" });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const editProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user && req.user.admin) {
      const { id } = req.params;

      const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      });

      res.status(200).json({ product });

      if (!product) {
        return res.status(404).json({ msg: `No product with id: ${id}` });
      }
    } else {
      return res.status(401).json({ msg: "Need to have admin acces" });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
