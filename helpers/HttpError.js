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

class VerificationError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

module.exports = {
  RegistrationConflictError,
  LoginAuthError,
  VerificationError,
};
