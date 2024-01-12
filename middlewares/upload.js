import multer from "multer";
import path from "path";
import { HttpError } from "../helpers/index.js";

const destination = path.resolve("tmp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, callback) => {
    const uniquePrefix = `${Date.now()}`;
    const filename = `${uniquePrefix}_${file.originalname}`;
    callback(null, filename);
  },
});

const limits = {
  fileSize: 1024 * 1025 * 5,
};

const fileFilter = (req, file, callback) => {
  const extension = req.originalname.split(".").pop();
  if (extension === "exe") {
    callback(HttpError(400, ".exe not allowed"));
  }
};

const upload = multer({
  storage,
  limits,
  //   fileFilter,
});

export default upload;
