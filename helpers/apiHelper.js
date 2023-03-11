const {
  RegistrationConflictError,
  LoginAuthError,
  VerificationError,
} = require("./HttpError");

const errorHandler = (err, req, res, next) => {
  if (
    err instanceof RegistrationConflictError ||
    err instanceof LoginAuthError ||
    err instanceof VerificationError
  ) {
    return res.status(err.status).json({ message: err.message });
  }
  res.status(500).json({ message: err.message });
};

const registrationConflictError = (err, req, res, next) => {
  res.status(409).json({ message: err.message });
};

module.exports = {
  errorHandler,
  registrationConflictError,
};
