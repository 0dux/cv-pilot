import { v2 as cloudinary } from "cloudinary"; // replacement for require("cloudinary").v2;
import { getEnv } from "../config/env.js";

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
export const cloudinaryUploader = cloudinary.uploader;
