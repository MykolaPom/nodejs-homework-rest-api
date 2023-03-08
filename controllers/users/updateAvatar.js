const fs = require("fs/promises");
const path = require("path");

const Jimp = require("jimp");

const User = require("../../models/userModel");

const UPLOAD_DIR = process.env.UPLOAD_DIR;
const AVATARS_DIR = process.env.AVATARS_DIR;

const PORT = process.env.PORT;

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;

  console.log(req.file);

  try {
    const { _id } = req.user;
    const avatarName = `${_id}_${originalname}`;
    const resultUpload = path.join(UPLOAD_DIR, avatarName);
    await fs.rename(tempUpload, resultUpload);

    Jimp.read(resultUpload.toString(), (err, file) => {
      if (err) throw err;
      file.resize(250, 250).quality(60).write(`${AVATARS_DIR}/${avatarName}`);
    });

    const avatarURL = `http://localhost:${PORT}/${AVATARS_DIR}/filename`;
  
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({ status: "success", avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
