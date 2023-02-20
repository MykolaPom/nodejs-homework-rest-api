const { UserSchema } = require("../models/userModel");

const userSubscription = async (req, res) => {
  const { _id } = req.user;
  const { body } = req;
  const user = await UserSchema.findOneAndUpdate(_id, body, { //findByIdAndUpdate
    new: true,
    runValidators: true,
  }).select({ password: 0, token: 0, __v: 0 });
  res.status(200).json(user);
};

module.exports = { userSubscription };
