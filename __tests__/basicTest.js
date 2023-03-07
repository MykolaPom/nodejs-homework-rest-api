// const jwt = require("jsonwebtoken");
// const authenticate = require("../middlewares/authenticate");
// const User = require("../models/userModel");
// const { LoginAuthError } = require("../helpers/HttpError");

// describe("Auth middleware test", () => {
//   it("should call next() and add user properties to req object", async () => {
//     const user = new User({
//       name: "John Doe",
//       email: "johndoe@example.com",
//       password: "password123",
//     });

//     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);

//     const req = {
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     };

//     const res = {};
//     const next = jest.fn();

//     await authenticate(req, res, next);

//     expect(next).toHaveBeenCalled();
//     expect(req.user).toBeDefined();
//     expect(req.user._id).toEqual(user._id);
//   });

//   it("should throw a LoginAuthError if token is invalid", async () => {
//     const req = {
//       headers: {
//         authorization: "Bearer invalid-token",
//       },
//     };

//     const res = {};
//     const next = jest.fn();

//     await authenticate(req, res, next);

//     expect(next).toHaveBeenCalledWith(new LoginAuthError("Not authorized"));
//   });

//   it("should throw a LoginAuthError if user is not authenticated", async () => {
//     const user = new User({
//       name: "John Doe",
//       email: "johndoe@example.com",
//       password: "password123",
//     });

//     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);

//     // remove token from user to simulate unauthorized user
//     user.token = null;
//     await user.save();

//     const req = {
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     };

//     const res = {};
//     const next = jest.fn();

//     await authenticate(req, res, next);

//     expect(next).toHaveBeenCalledWith(new LoginAuthError("Not authorized"));
//   });
// });
