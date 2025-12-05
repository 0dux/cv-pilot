import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  assetId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  cloudinaryUrl: {
    type: String,
    required: true,
    trim: true,
  },
  analysis: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
});

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
