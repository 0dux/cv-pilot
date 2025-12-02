import { v2 as cloudinary } from "cloudinary";
import { Router } from "express";
import multer from "multer";

//router for upload related routes
const uploadRouter = Router();

//multer setup
const storage = multer.memoryStorage();
const upload = multer({
  storage,
});

//using a special helper function created to get the required env variables
// const vars = getEnv([
//   "CLOUDINARY_CLOUD_NAME",
//   "CLOUDINARY_API_KEY",
//   "CLOUDINARY_API_SECRET",
// ]);

// console.log(vars);

cloudinary.config({
  //If you put in CLOUDINARY_URL in the env variables it'll automatically get it without any need for mentioning. Crazy wasted 2hrs on this but I think, It'll cause the issue in future if you change the api key or secret of cloudinary. Then the url might change and changing it in prod by updating the env variables through backend hosting site won't be possible.
  //So I'll continue with using the api_key and rest of the stuff.
  secure: true,
});

console.log(cloudinary.config());

uploadRouter.post("/test", upload.single("test"), (req, res) => {
  const text = req.body.test;
  const file = req.file;
  res.json({
    file,
    text,
    message: "Upload succesfull!!",
  });
  return;
});

export default uploadRouter;
