import { Router } from "express";
import { upload } from "../middleware/multer.js";
import { cloudinaryUploader } from "../integrations/cloudinary.js";

//router for upload related routes
const uploadRouter = Router();

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

  const cloudinaryUploadResult = await new Promise((resolve, reject) => {
    cloudinaryUploader
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
    cloudinaryUploadResult,
    text,
    message: "Upload succesfull!!",
  });
  return;
});

export default uploadRouter;
