const User = require("../../models/userModel");
const { VerificationError } = require("../../helpers/HttpError");

const verificationUser = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new VerificationError("User not found");
  }

  // user.verificationToken = null;
  // user.verify = true;

  await User.findOneAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200).json({ status: "Verification successful" });
};

module.exports = verificationUser;
