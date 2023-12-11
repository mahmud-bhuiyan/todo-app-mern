const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncWrapper = require("../middlewares/asyncWrapper");
const { createCustomError } = require("../errors/customError");

const generateAndSetToken = (res, user) => {
  // Creating JWT payload
  const payload = { user: user._id };

  // Generating JWT with expire time
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: 360000,
  });

  // Setting the token in a cookie with HttpOnly & expire time
  res.cookie("token", token, { httpOnly: true, expiresIn: 360000 });
};

//register
const registerUser = asyncWrapper(async (req, res) => {
  const { name, email, password } = req.body;

  // Duplicate user handling
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createCustomError("Email is already in use", 400);
  }

  // Creating a new user
  const user = new User({ name, email, password });
  await user.save();

  // Generate and set token
  generateAndSetToken(res, user);

  // displaying user details without password
  const { password: pass, ...rest } = user._doc;

  // Sending the response with user details
  res.status(201).json({ msg: "User created successfully", user: rest });
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
    throw createCustomError("Invalid credentials", 400);
  }

  // Generate and set token
  generateAndSetToken(res, user);

  // displaying user details without password
  const { password: pass, ...rest } = user._doc;

  // Sending the response with user details
  res.status(200).json({ msg: "Logged in successfully", user: rest });
});

//logout
const logoutUser = asyncWrapper(async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ msg: "Logged Out successfully" });
});

module.exports = { registerUser, loginUser, logoutUser };
