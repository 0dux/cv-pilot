import mongoose from "mongoose";

const connectDB = async () => {
  try {
    //get uri
    const MONGO_URI = process.env["MONGO_URI"];
    if (!MONGO_URI) throw new Error("MONGO_URI not recieved!!!");

    //connect db
    await mongoose.connect(MONGO_URI);
    console.log(`Database Connected Succesfully!!!✅ `);
  } catch (error) {
    console.log(`Some error has occured!!!❌
    error::${error}`);
  }
};

export default connectDB;
