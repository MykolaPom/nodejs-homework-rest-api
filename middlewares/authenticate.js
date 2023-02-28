const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const { LoginAuthError } = require("../helpers/HttpError");

const authenticate = async (req, res, next) => {
  try {
    const [tokenType, token] = req.headers["authorization"].split(" ");

    console.log(tokenType, token);

    if (!token) {
      next(new LoginAuthError("Not authorized"));
    }

    const user = jwt.decode(token, process.env.JWT_SECRET_KEY);
    const auditUser = await User.findById(user._id);

    if (!auditUser || token !== auditUser.token) {
      throw new LoginAuthError("Not authorized");
    }

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    next(new LoginAuthError("Not authorized"));
  }
};

module.exports = authenticate;
