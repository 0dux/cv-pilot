import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import cloudinaryUploader from "../integrations/cloudinary.js";
import handleAnalysisGemini from "../integrations/gemini.js";

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
  const fileName: string = file.originalname;
  const fileBuffer: Buffer = file.buffer;
  if (!fileBuffer) {
    console.error("No file was uploaded!!!");
    return;
  }

  const cloudinaryUploadResponse = await cloudinaryUploader(fileName, fileBuffer);
  const geminiAnalysisResponse = await handleAnalysisGemini(fileBuffer);
  res.json({
    cloudinaryUploadResponse,
    geminiAnalysisResponse,
    text,
    message: "Upload succesfull!!",
  });
  return;
});

export default uploadRouter;
