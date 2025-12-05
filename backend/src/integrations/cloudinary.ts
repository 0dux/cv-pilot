import { v2 as cloudinary } from "cloudinary"; // replacement for require("cloudinary").v2;
import { env } from "../config/env.js";
//deleted the generic type function for env retrieval
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

// initializing cloudinary uploader
const cloudinaryUploader = async (fileName: string, fileBuffer: Buffer) =>
  await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { resource_type: "auto", public_id: fileName, folder: "resume" },
        (error, uploaded) => {
          if (error) {
            console.error("----->", error);
            return reject(error);
          }
          console.log("----->", uploaded);
          return resolve(uploaded);
        }
      )
      .end(fileBuffer);
  });

export default cloudinaryUploader;
