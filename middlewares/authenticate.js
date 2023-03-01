const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const { LoginAuthError } = require("../helpers/HttpError");

const authenticate = async (req, res, next) => {
  try {
    const [tokenType, token] = req.headers["authorization"].split(" ");

    if (!token) {
      next(new LoginAuthError("Not authorized"));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const authenticatedUser = await User.findById(decodedToken._id);

    if (!authenticatedUser || token !== authenticatedUser.token) {
      throw new LoginAuthError("Not authorized");
    }

    req.user = authenticatedUser;

    next();
  } catch (error) {
    next(new LoginAuthError("Not authorized"));
  }
};

module.exports = authenticate;
