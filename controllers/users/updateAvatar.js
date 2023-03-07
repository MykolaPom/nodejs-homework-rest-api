const fs = require("fs/promises");
const path = require("path");

const Jimp = require("jimp");

const User = require("../../models/userModel");

const UPLOAD_DIR = path.resolve(process.env.UPLOAD_DIR);
const AVATARS_DIR = path.resolve(process.env.AVATARS_DIR);

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(AVATARS_DIR, filename);
  await fs.rename(tempUpload, resultUpload);

  Jimp.read(UPLOAD_DIR, (err, avatar) => {
    if (err) throw err;
    avatar.resize(250, 250).quality(60).write(AVATARS_DIR);
  });

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;

