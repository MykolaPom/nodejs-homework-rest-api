const signupUser = require("./signupUser");
const loginUser = require("./loginUser");
const logoutUser = require("./logoutUser");
const getCurrentUser = require("./getCurrentUser");
const userSubscription = require("./userSubscription");
const updateAvatar = require('./updateAvatar');

// const updateAvatar = require('../files/uploadFiles')

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  userSubscription,
  updateAvatar,
};
