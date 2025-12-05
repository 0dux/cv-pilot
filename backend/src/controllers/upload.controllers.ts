import cloudinaryUploader from "../integrations/cloudinary.js";
import handleAnalysisGemini from "../integrations/gemini.js";
import type { Request, Response } from "express";

export const uploadAndAnalyzeResume = async (req: Request, res: Response) => {
  const text = req.body.test;
  const file = req.file;
  console.log(file);

  console.log(req.payload);

  //check if recieved any file
  if (!file) {
    res.json({
      message: "No file was uploaded !!!",
    });
    return;
  }

  //get file and it's info
  const fileName: string = file.originalname;
  const fileBuffer: Buffer = file.buffer;
  const mimeType = file.mimetype;

  //upload file to cloudinary
  const cloudinaryUploadResponse = await cloudinaryUploader(
    fileName,
    fileBuffer
  );

  //get resume analysis
  const geminiAnalysisResponse = await handleAnalysisGemini(
    fileBuffer,
    mimeType
  );

  //respond with the feedback
  res.json({
    cloudinaryUploadResponse,
    geminiAnalysisResponse,
    text,
    message: "Upload succesfull!!",
  });
  return;
};
