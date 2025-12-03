import multer from "multer";

//multer setup
const storage = multer.memoryStorage(); //store in memory, as I don't want to keep those files for more time than they need to be

export const upload = multer({
  storage,
});
