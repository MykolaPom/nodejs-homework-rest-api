const jwt = require("jsonwebtoken");
const { userSchema } = require("../models/userModel");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authValidation = async (req, res, next) => {
  const [tokenType, token] = req.headers['authorization'].split(" ");

  if (tokenType !== "Bearer") {
    const error = new Error("Unauthorized");
    error.status = 401;
    next(error);
  }
  if (!token) {
    const error = new Error(`Please provide the token`);
    error.status = 401;
    next(error);
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
    req.token = token;
    req.user = decodedToken;
    next();
  } catch (error) {
    next(new Error("Invalid token"));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET_KEY);
    const user = await userSchema.findOne({ _id: id });
    if (!user || !user.token || token !== user.token) {
      const error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "invalid signature") {
      error.status = 401;
    }
    next(error);
  }

  // try {
  //   const user = jwt.decode(token, process.env.JWT_SECRET_KEY);
  //   req.token = token;
  //   req.user = user;
  //   next()
  // } catch (error) {
  //   next(new Error('Invalid token'));
  // }

  // try {
  //   const { id } = jwt.verify(token, JWT_SECRET_KEY);
  //   const user = await userSchema.findOne({ _id: id });
  //   if (!user || !user.token || token !== user.token) {
  //     const error = new Error("Unauthorized");
  //     error.status = 401;
  //     throw error;
  //   }
  //   req.user = user;
  //   next();
  // } catch (error) {
  //   if (error.message === "invalid signature") {
  //     error.status = 401;
  //   }
  //   next(error);
  // }
};

module.exports = {
  authValidation
}
