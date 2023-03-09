const express = require("express");
const ctrl = require("../../controllers/users");
const { ctrlWrapper } = require("../../helpers");

const { authenticate } = require("../../middlewares");
const {upload} = require('../../middlewares/upload')

const {
  signupValidation,
  loginValidation,
} = require("../../middlewares/validationMiddleware");

const router = new express.Router();

router.post("/register", signupValidation, ctrlWrapper(ctrl.signupUser));
router.post("/login", loginValidation, ctrlWrapper(ctrl.loginUser));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrentUser));
router.post("/logout", authenticate, ctrlWrapper(ctrl.logoutUser));

router.patch("/", authenticate, ctrlWrapper(ctrl.userSubscription));
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
