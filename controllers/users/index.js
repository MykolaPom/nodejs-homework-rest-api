const signupUser = require("./signupUser");
const loginUser = require("./loginUser");
const logoutUser = require("./logoutUser");
const getCurrentUser = require("./getCurrentUser");
const userSubscription = require("./userSubscription");
const updateAvatar = require('./updateAvatar');
const verificationUser = require('./verificationUser')
const resendVerifyUser = require('./resendVerifyUser')

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  userSubscription,
  updateAvatar,
  verificationUser,
  resendVerifyUser,
};
