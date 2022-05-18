// S3 - AWS file storage service
// BunnyCDN
// endpoint /upload => POST pozwoli na wgranie zdjęcia
// imagemagick -> brew install imagemagick

const fs = require("fs").promises;
const express = require("express");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { createFolderIfNotExist, isImage } = require("./helpers");
const app = express();

const uploadDir = path.join(process.cwd(), "uploads"); // świeżo wgrane pliki
const storeDir = path.join(process.cwd(), "images"); // przechowywanie plików

// logika uploadu
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // zdecydować gdzie plik ma się znaleźć
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}${file.originalname}`);
  },
});

const extensionAllowedList = [".jpg", ".jpeg", ".png", ".gif"];
const mimetypeAllowedList = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/gif",
];

const multerInstance = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const mimetype = file.mimetype;

    if (
      !extensionAllowedList.includes(extension) ||
      !mimetypeAllowedList.includes(mimetype)
    ) {
      //   return cb({ message: "this is not a photo" }, false);
      return cb(null, false);
    }
    return cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024, // 1 MB
    // fileSize: 1024 * 1024 * 1024 // 1 GB
    // fileSize: 3 * 1024 * 1024 * 1024 // 3 GB
    // 60 * 60 * 24 * 5 // days in second
  },
});

app.post(
  "/upload",
  multerInstance.single("picture"), // array
  async (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ message: "this is not a photo" });
    }
    const { description } = req.body;
    const { path: temporaryName } = req.file;

    const extension = path.extname(temporaryName);
    // const extension = temporaryName.split(".").pop(); // alt
    const fileName = path.join(storeDir, `${uuidv4()}${extension}`);

    try {
      await fs.rename(temporaryName, fileName);
    } catch (err) {
      await fs.unlink(temporaryName);
      return next(err);
    }

    const isValidImage = await isImage(fileName);
    if (!isValidImage) {
      await fs.unlink(fileName);
      return res.status(400).json({ message: "this is not a photo" });
    }

    return res.json({ description, fileName });
  }
);

app.use((req, res, next) => {
  res.status(404).json({ message: "page not found" });
});

const PORT = process.env.PORT || 3000;

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message, status: err.status });
});

app.listen(PORT, async () => {
  createFolderIfNotExist(uploadDir);
  createFolderIfNotExist(storeDir);
  console.log(`Server is running at ${PORT}`);
});
