const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController");

router.get("/", (req, res) => {
  res.send("User routes are working!");
});

// Register a user
router.post("/register", registerUser);

// Login a user
router.post("/login", loginUser);

// Logout
router.post("/logout", logoutUser);

module.exports = router;
