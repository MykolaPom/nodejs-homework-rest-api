const User = require("../../models/userModel");

const getCurrentUser = async (req, res) => {
  console.log(req.user);

  const { _id } = req.user;

  const user = await User.findById({ _id }).select({
    email: 1,
    subscription: 1,
    _id: 0,
  });

  res.status(200).json({ status: "success", user });
};

module.exports = getCurrentUser;
