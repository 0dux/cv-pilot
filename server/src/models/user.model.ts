import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  lastName: {
    type: String,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 13,
    max: 100,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 50,
  },
});

export const User = mongoose.model("User", userSchema);
