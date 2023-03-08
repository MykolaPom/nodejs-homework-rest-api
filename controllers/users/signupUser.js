const User = require("../../models/userModel");
const gravatar = require("gravatar");

const {
  RegistrationConflictError,
} = require("../../helpers/HttpError");

const signupUser = async (req, res) => {

  const { email, password } = req.body;

  if (await User.findOne({ email })) {
    throw new RegistrationConflictError("Email is use");
  }

  const avatarURL = gravatar.url(email);

  const user = new User({
    email,
    password,
    avatarURL,
  });

  await user.save();

    res.status(201).json({
      status: "success",
      id: user._id,
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    });
};

module.exports = signupUser;
