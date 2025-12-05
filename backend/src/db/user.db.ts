import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 254,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
