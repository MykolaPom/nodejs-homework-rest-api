// const fs = require("fs").promises;
// const jimp = require("jimp");
// const path = require("path");
// const { AVATARS_DIR } = require("../middlewares/upload");
// const { v4: uuidv4 } = require("uuid");

// const avatarRenameAndSave = async (pathAvatar) => {
//   if (pathAvatar) {
//     const avatar = await jimp.read(pathAvatar);
//     await avatar
//       .autocrop()
//       .cover(
//         250,
//         250,
//         jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
//       )
//       .writeAsync(pathAvatar);
//     const newNameWithExt = [];
//     newNameWithExt.push(uuidv4());
//     newNameWithExt.push(pathAvatar.split(".")[1]);

//     const avatarPublicPath = path.join(AVATARS_DIR, newNameWithExt.join("."));
//     await fs.rename(pathAvatar, avatarPublicPath);
//     const lastFolder = AVATARS_DIR.split("\\").length - 1;
//     const avatarURL =
//       "/" +
//       AVATARS_DIR.split("\\")[lastFolder] +
//       "/" +
//       newNameWithExt.join(".");
//     return avatarURL;
//   }
// };

// const avatarDelete = async (avatarURL) => {
//   try {
//     console.log(avatarURL)
//     const avatarName = avatarURL.split("/")[2];
//     const avatarPublicPath = path.join(AVATARS_DIR, avatarName);
//     await fs.unlink(avatarPublicPath);
//   } catch (err) {
//   }
// };
// module.exports = {
//   avatarRenameAndSave,
//   avatarDelete,
// };
