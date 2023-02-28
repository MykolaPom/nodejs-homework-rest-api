const jwt = require("jsonwebtoken");

const { HttpError } = require("../helpers");
const User = require("../models/userModel");

const logoutMiddleware = async (req, res, next) => {
  const [tokenType, token] = req.headers["authorization"].split(" ");

  if (!token) {
    next(new HttpError("Not authorized"));
  }
  try {
    const user = jwt.decode(token, process.env.JWT_SECRET_KEY);
    const auditUser = await User.findById(user._id);

    if (!auditUser || token !== auditUser.token) {
      throw new HttpError("Not authorized");
    }

    await User.findByIdAndUpdate(
      user._id,
      { token: null },
      { runValidators: true }
    );

    res.status(200).json({ message: "Success logout" });
  } catch (err) {
    throw new HttpError("Not authorized");
  }
};

module.exports = logoutMiddleware;
