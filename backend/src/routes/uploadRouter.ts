import { v2 as cloudinary } from "cloudinary"; // replacement for require("cloudinary").v2;
import { Router } from "express";
import multer from "multer";
import { getEnv } from "../utils/envHelper.js";

//router for upload related routes
const uploadRouter = Router();

//multer setup
const storage = multer.memoryStorage();
const upload = multer({
  storage,
});
// finally starting with integrating gemini api
//using a special helper function created to get the required env variables
const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = // Also learnt about generics
  getEnv([
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
  ]);
//Generic type is a type of function which we create when we dont the the input variable types and and want to operate on those type and return the output of that type only.

//it is not a type of function but a special thing which is used to make out code type compatible

cloudinary.config({
  //If you put in CLOUDINARY_URL in the env variables it'll automatically get it without any need for mentioning. Crazy wasted 2hrs on this but I think, It'll cause the issue in future if you change the api key or secret of cloudinary. Then the url might change and changing it in prod by updating the env variables through backend hosting site won't be possible.

  //So I'll continue with using the api_key and rest of the stuff.

  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

// console.log(cloudinary.config());

//initializing cloudinary uploader
const uploader = cloudinary.uploader;

uploadRouter.post("/test", upload.single("test"), async (req, res) => {
  const text = req.body.test;
  const file = req.file;
  if (!file) {
    res.json({
      message: "No file was uploaded !!!",
    });
    throw new Error("No file uploaded!!");
  }
  const fileName = file.originalname as string;
  const fileBuffer = file.buffer as Buffer;
  if (!fileBuffer) {
    console.error("No file was uploaded!!!");
    return;
  }

  const uploadResult = await new Promise((resolve, reject) => {
    uploader
      .upload_stream({ public_id: fileName }, (error, uploaded) => {
        if (error) {
          console.log("----->", error);
          return reject(error);
        }
        console.log("----->", uploaded);
        return resolve(uploaded);
      })
      .end(fileBuffer);
  });

  res.json({
    uploadResult,
    text,
    message: "Upload succesfull!!",
  });
  return;
});

export default uploadRouter;
