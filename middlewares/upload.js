const multer = require("multer");
const path = require("path");

const UPLOAD_DIR = path.resolve(process.env.UPLOAD_DIR);
const AVATARS_DIR = path.resolve(process.env.AVATARS_DIR);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const [filename, extension] = file.originalname.split(".");
    cb(null, `${filename}.${extension}`);
  },
});

const upload = multer({ storage: storage });

module.exports = { upload, UPLOAD_DIR, AVATARS_DIR };
