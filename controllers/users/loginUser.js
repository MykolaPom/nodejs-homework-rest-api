const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../models/userModel");

const { LoginAuthError } = require("../../helpers/HttpError");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, verify: true });

  if (!user) {
    throw new LoginAuthError("Email is wrong or verification failed");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new LoginAuthError("Password is wrong");
  }

  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "2h" }
  );

  await User.findByIdAndUpdate(user._id, { token }, { runValidators: true });

  res.status(200).json({ status: "success", token });
};

module.exports = loginUser;
