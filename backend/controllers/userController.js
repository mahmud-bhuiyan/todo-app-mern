const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncWrapper = require("../middlewares/asyncWrapper");
const { createCustomError } = require("../errors/customError");

// custom user details
const customUserDetails = (user) => {
  const { _id, name, email } = user;
  return { _id, name, email };
};

//register
const registerUser = asyncWrapper(async (req, res) => {
  const { name, email, password } = req.body;

  // Duplicate user handling
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createCustomError("Email is already in use", 400);
  }

  // New user
  const user = new User({ name, email, password });
  await user.save();

  // user details
  const userDetails = customUserDetails(user);

  res
    .status(201)
    .send({ user: userDetails, message: "User created successfully" });
});

//login
const loginUser = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw createCustomError("User not found!", 404);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw createCustomError("Invalid credentials", 401);
  }

  // user details
  const userDetails = customUserDetails(user);

  const token = jwt.sign(
    {
      _id: user._id.toString(),
    },
    process.env.JWT_SECRET_KEY
  );
  res.send({ user: userDetails, token, message: "Logged in successfully" });
});

module.exports = { registerUser, loginUser };
