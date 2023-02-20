const express = require("express");
const { cntrlWrap } = require("../../middlewares/cntrlWrap");
const { validation } = require("../../middlewares/validation");

const {
  schemaUserRegistration,
  schemaUserLogin,
  schemaSubscription,
} = require("../../middlewares/userValidation");

const { authValidation } = require("../../middlewares/authValidation");

const { userSubscription } = require("../../controllers/userSubscription");

const {
  signupController,
  loginController,
  logoutController,
} = require("../../controllers/authController");

const { getCurrentUser } = require("../../controllers/getCurrentUser");

const router = express.Router();

router.post(
  "/signup",
  validation(schemaUserRegistration),
  cntrlWrap(signupController)
);

router.post("/login", validation(schemaUserLogin), cntrlWrap(loginController));
router.get("/logout", authValidation, cntrlWrap(logoutController));
router.get("/current", authValidation, cntrlWrap(getCurrentUser));
router.patch(
  "/",
  authValidation,
  validation(schemaSubscription),
  cntrlWrap(userSubscription)
);

module.exports = router;
