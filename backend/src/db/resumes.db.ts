import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  asset_id: {
    type: String,
    required: true,
    trim: true,
  },
  cloudinary_url: {
    type: String,
    required: true,
    trim: true,
  },
  analysis: {
    type: mongoose.Schema.Types.Mixed, //basically allows you to store any type of data
    default: null,
  },
});

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
