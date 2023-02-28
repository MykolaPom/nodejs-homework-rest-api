class RegistrationConflictError extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

class LoginAuthError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = {
  RegistrationConflictError,
  LoginAuthError,
};
//---------------------------------------------------------//
// const ValidationError = require("../helpers/apiHelper")

// const messages = {
//   400: "Bad Request",
//   401: "Unauthorized",
//   403: "Forbidden",
//   404: "Not found",
//   409: "Conflict",
// };

// const HttpError = (status, message = messages[status]) => {
//   const error = new Error(message);
//   error.status = status;
//   return error;
// };

// const errorHandler = (error, req, res, next) => {
//   if (error instanceof ValidationError) {
//     return res.status(error.status).json({ message: error.message });
//   }
//   res.status(500).json({ message: error.message });
// };

// module.exports = HttpError, errorHandler;
