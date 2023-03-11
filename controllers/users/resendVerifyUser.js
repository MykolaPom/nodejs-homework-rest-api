const User = require("../../models/userModel");
const { VerificationError } = require("../../helpers/HttpError");
const sendEmail = require("../../helpers/sendEmail");

const { EMAIL_USER } = process.env;

const resendVerifyUser = async (req, res) => {
  const { email } = req.body;
  const { verificationToken } = req.params;

  const user = await User.findOne({ email });

  if (!user) {
    throw new VerificationError("Verification failed");
  }

  const emailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: "Email address verification",
    html: `Please, click on the <a href='http://localhost:3000/api/users/verify/${verificationToken}'> link </a> to verify your email`,
  };

  await sendEmail(emailOptions);

  res.json({
    message: "Verify email resend",
  });
};

module.exports = resendVerifyUser;
