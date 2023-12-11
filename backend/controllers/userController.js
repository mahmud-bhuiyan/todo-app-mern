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
  // Extracting data from request body
  const { name, email, password } = req.body;

  // Duplicate user handling
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createCustomError("Email is already in use", 400);
  }

  // Creating a new user
  const user = new User({ name, email, password });
  await user.save();

  // Creating JWT payload
  const payload = { user: user._id };

  // Generating JWT with expire time
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: 360000,
  });

  // Setting the token in a cookie with HttpOnly & expire time
  res.cookie("token", token, { httpOnly: true, expiresIn: 360000 });

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
