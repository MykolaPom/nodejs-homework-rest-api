const User = require("../../models/userModel");
const gravatar = require("gravatar");

const { v4 } = require("uuid");
const sendEmail = require("../../helpers/sendEmail");
const { EMAIL_USER } = process.env;

const { RegistrationConflictError } = require("../../helpers/HttpError");

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  if (await User.findOne({ email })) {
    throw new RegistrationConflictError("Email is use");
  }

  const avatarURL = gravatar.url(email);
  const verificationToken = v4();

  const user = new User({
    email,
    password,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    from: EMAIL_USER,
    to: email,
    subject: "Email confirmation",
    html: `Please, click on the <a href='http://localhost:3000/api/users/verify/${verificationToken}'> link </a> to confirm your email`,
  };

  await sendEmail(verifyEmail);

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
