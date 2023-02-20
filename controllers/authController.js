const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { UserSchema } = require("../models/userModel");
const {
  RegistrationConflictError
} = require("../helpers/errors");
require("dotenv").config();

const signupController = async (req, res) => {
  const { email, password } = req.body;
  if (await UserSchema.findOne({ email })) {
    throw new RegistrationConflictError("Such email already exists");
  }
  const user = new UserSchema({ email, password });

  await user.save();
  return res.status(201).json("User has been authorized successfullty"); //`successful authorization for token: ${token}, email: ${user.email}, subscription: ${user.subscription}`
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserSchema.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json('Wrong credentials');
  }

  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );

  await UserSchema.findOneAndUpdate(user._id, { token });
  return res
    .status(200)
    .json(
      `Login success for token: ${token}, email: ${user.email}, subscription: ${user.subscription}`
    );
};

const logoutController = async (req, res) => {
  const { _id } = req.user;
  await UserSchema.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

module.exports = {
  signupController,
  loginController,
  logoutController,
};
