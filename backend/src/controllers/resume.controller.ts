import type { Request, Response } from "express";
import Resume from "../db/resumes.db.js";

export const handleGetSingleResume = async (req: Request, res: Response) => {
  try {
    const resume_id = req.params["resumeId"] as string;
    // console.log(resume_id);

    const resume_info = await Resume.findOne({ resume_id });
    // console.log(resume_info);
    if (resume_info === null) {
      res.json({
        success: false,
        data: {
          message: "Incorrect resume-id passed, such a resume doesn't exist.",
        },
      });
      return;
    }

    res.json({
      success: true,
      data: {
        message: "resume found here are the details",
        resume_info,
      },
    });
  } catch (error) {
    console.error("Some error has occured::: ", error);
    res.json({
      success: false,
      data: {
        message: "Some error has occured while fetching the resume",
      },
    });
    return;
  }
};

export const handleGetAllResume = async (req: Request, res: Response) => {
  try {
    const { userId } = req.payload;

    const resumesFound = await Resume.find({ userId }).select("resume_id");
    res.json({
      resumesFound,
    });
  } catch (error) {
    console.error("Some error has occured ::", error);
    res.json({
      success: false,
      data: {
        message: "Some error has occured while fetching the resumes",
      },
    });
  }
};
