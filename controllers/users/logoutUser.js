const User = require("../../models/userModel");

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: null }, { runValidators: true });

  res.status(204).json({
    message: "Logout success",
  });
};

module.exports = logout;
