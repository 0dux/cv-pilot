import mongoose from "mongoose";

const connectDB = async() => {
  try {
    await mongoose.connect(process.env["MONGO_URI"] || "No url passed!!!");
    console.log(`Database Connected Succesfully!!!✅ `);
  } catch (error) {
    console.log(`Some error has occured!!!❌
error::${error}`);
  }
};

export default connectDB;
