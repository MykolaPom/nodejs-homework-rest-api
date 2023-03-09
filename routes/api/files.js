// const express = require("express");
// const multer = require("multer");
// const path = require("path");

// const updateAvatar = require("../../controllers/files/uploadFiles");
// const { ctrlWrapper } = require("../../helpers");

// const router = new express.Router();

// //статична директорія
// // const upload = multer({dest: 'upload/'}) // такий запис створює папку за заданим маршрутом

// const FILE_DIR = path.resolve("./tmp");

// //динамічна директорія ===> задається шлях до файлу та імя
// const multerConfig = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, FILE_DIR);
//   },
//   filename: (req, file, cb) => {
//     const [filename, extension] = file.originalname.split(".");
//     cb(null, `${filename}.${extension}`);
//   },
// });

// const upload = multer({ storage: multerConfig });

// // тут avatar повязаний буде з атрибутом name='avatar' в html файлі
// router.post("/avatars", upload.single("avatar"), ctrlWrapper(updateAvatar));
// // router.use("/download", express.static(FILE_DIR));

// module.exports = router;

// //--------------------------------------------------------//

// // const express = require("express");
// // const multer = require("multer");
// // const path = require('path');

// // const uploadController = require("../../controllers/files/uploadFiles");
// // const { ctrlWrapper } = require("../../helpers");

// // const router = new express.Router();

// // //статична директорія
// // // const upload = multer({dest: 'upload/'}) // такий запис створює папку за заданим маршрутом

// // const FILE_DIR = path.resolve("./tmp");

// // //динамічна директорія ===> задається шлях до файлу та імя
// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, FILE_DIR);
// //   },
// //   filename: (req, file, cb) => {
// //     const [filename, extension] = file.originalname.split('.');
// //     cb(null, `${filename}.${extension}`);
// //   }
// // },
// // );

// // const uploadMiddleware = multer({storage})

// // // тут avatar повязаний буде з атрибутом name='avatar' в html файлі
// // router.post("/upload", uploadMiddleware.single('avatar'), ctrlWrapper(uploadController));
// // router.use("/download", express.static(FILE_DIR));

// // module.exports = router;
