const User = require('../../models/userModel')

const userSubscription = async (req, res) => {
  const { _id: owner } = req.user;
  const { body } = req;
  const user = await User.findByIdAndUpdate(owner, body, {
    new: true,
    runValidators: true,
  }).select({ password: 0, token: 0, __v: 0 });
  res.status(200).json(user);
};

module.exports = userSubscription;
