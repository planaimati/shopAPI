import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true },
});

export const User = mongoose.model("User", userSchema);
