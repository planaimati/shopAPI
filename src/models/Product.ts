import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productPrice: { type: String, required: true },
  productBrand: { type: String, required: true },
  productAmount: { type: String, required: true },
  productDesc: { type: String, required: true },
  productImage: { type: String, required: true },
  productSize: { type: String, required: true },
});

export const Product = mongoose.model("Product", productSchema);
