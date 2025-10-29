import mongoose from "mongoose";

const connectDb = async () => {
  try {
    if (!process.env.MONGO_DB_URI) {
      throw new Error("No, db url recieved !!!");
    }
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(`Database connected succesfully ✅`);
  } catch (error) {
    console.log(`Mongo DB connection failed 
---> error :::: ${error} 
     ❌❌❌❌❌❌❌`);
    process.exit(1);
  }
};

export default connectDb;
