const User = require("../../models/userModel");

const {
  RegistrationConflictError,
} = require("../../helpers/HttpError");

const signupUser = async (req, res) => {

  const { email, password } = req.body;

    if (await User.findOne({ email })) {
      throw new RegistrationConflictError("Email is use");
    }

  const user = new User({
    email,
    password,
  });

  await user.save();

    res.status(201).json({
      status: "success",
      id: user._id,
      email: user.email,
      subscription: user.subscription,
    });
};

module.exports = signupUser;
