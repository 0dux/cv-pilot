import { v2 as cloudinary, type UploadApiResponse } from "cloudinary"; // replacement for require("cloudinary").v2;
import { env } from "../config/env.js";
//deleted the generic type function for env retrieval
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface CloudinaryUploadResult extends UploadApiResponse {
  //this is actuall amazing.
  asset_id: string;
}
// initializing cloudinary uploader
const handleCloudinaryUpload = async (fileName: string, fileBuffer: Buffer) =>
  await new Promise<CloudinaryUploadResult>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { resource_type: "auto", public_id: fileName, folder: "resume" },
        (error, uploaded) => {
          if (error) {
            console.error("error -----> ", error);
            return reject(error);
          }
          // console.log("----->", uploaded);
          return resolve(uploaded as CloudinaryUploadResult);
        }
      )
      .end(fileBuffer);
  });

export default handleCloudinaryUpload;
