import type { UploadApiResponse } from "cloudinary";
import handleCloudinaryUpload from "../integrations/cloudinary.integration.js";
import handleAnalysisGemini from "../integrations/gemini.integration.js";
import type { Request, Response } from "express";
import Resume from "../db/resumes.db.js";

export const uploadAndAnalyzeResume = async (req: Request, res: Response) => {
  try {
    const text = req.body.test;
    const file = req.file;
    // console.log(file);
    // console.log(req.payload);

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
    const cloudinaryUploadResponse = await handleCloudinaryUpload(
      fileName,
      fileBuffer
    );

    //get resume analysis
    const geminiAnalysisResponse = await handleAnalysisGemini(
      fileBuffer,
      mimeType
    );
    //gather info for resume document
    const { userId } = req.payload;
    const { asset_id, url } = cloudinaryUploadResponse;
    const analysis = geminiAnalysisResponse?.text;

    // console.log(userId);
    // console.log(asset_id, url);
    // console.log(analysis);

    const resumeCount = await Resume.countDocuments({ userId });
    console.log(resumeCount);

    if (resumeCount > 3) {
      res.status(401).json({
        message:
          "Too many files uploaded, limit exceeded only 5 files allowed per user!!!",
      });
      return;
    }
    const resumeAnalysisSaved = await Resume.create({
      userId,
      asset_id,
      cloudinary_url: url,
      analysis,
    });

    //respond with the feedback
    res.json({
      resumeAnalysisSaved,
      cloudinaryUploadResponse,
      analysis,
      text,
      message: "Upload succesfull!!",
    });
    return;
  } catch (error) {
    console.error("Some error has occured while upload & analysis:", error);
    res.status(500).json({
      message: "Some error happened during upload and analysis!",
    });
    return;
  }
};
