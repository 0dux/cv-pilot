import multer from "multer";

//allowed file types
const allowed = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const maxSizeLimit = 2 * 1024 * 1024;
//multer setup
const storage = multer.memoryStorage(); //store in memory, as I don't want to keep those files for more time than they need to be

export const upload = multer({
  storage,
  //limiting file type to be allowed
  fileFilter(req, file, callback) {
    //checking for the right file type
    if (!allowed.includes(file.mimetype)) {
      return callback(new Error("Invalid file type")); //throw error if file type is not matching
    }

    //check for the file size
    if (file.size >= maxSizeLimit) {
      return callback(new Error("File size limit exceeded"));
    }
    callback(null, true);
  },
});
