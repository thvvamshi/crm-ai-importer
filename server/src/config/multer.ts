import fs from "node:fs";
import path from "node:path";

import multer from "multer";
import { randomUUID } from "node:crypto";

import { env } from "./env.js";

const uploadDirectory = path.resolve(env.UPLOAD_DIR);

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, uploadDirectory);
  },

  filename: (_, file, cb) => {
    const extension = path.extname(file.originalname);

    cb(null, `${randomUUID()}${extension}`);
  },
});

const fileFilter: multer.Options["fileFilter"] = (
  _,
  file,
  cb
) => {
  const extension = path.extname(file.originalname).toLowerCase();

  if (extension !== ".csv") {
    return cb(new Error("Only CSV files are allowed."));
  }

  cb(null, true);
};

export const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: env.MAX_FILE_SIZE,
  },
});