import { Router } from "express";
import {
  handleGetAllResume,
  handleGetSingleResume,
} from "../controllers/resume.controller.js";
import { uploadAndAnalyzeResume } from "../controllers/upload.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

//router for upload related routes
const resumeRouter = Router();

resumeRouter.post(
  "/upload-analyse",
  authMiddleware,
  upload.single("resume_form"),
  uploadAndAnalyzeResume
);

resumeRouter.get("/all", authMiddleware, handleGetAllResume);
resumeRouter.get("/:resumeId", authMiddleware, handleGetSingleResume);

export default resumeRouter;
