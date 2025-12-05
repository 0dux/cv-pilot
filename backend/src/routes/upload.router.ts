import { Router } from "express";
import { uploadAndAnalyzeResume } from "../controllers/upload.controllers.js";
import { upload } from "../middleware/multer.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";

//router for upload related routes
const uploadRouter = Router();

uploadRouter.post(
  "/test",
  authMiddleware,
  upload.single("test"),
  uploadAndAnalyzeResume
);

export default uploadRouter;
