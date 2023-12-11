const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

const { registerUser, loginUser } = require("../controllers/userController");

router.get("/", (req, res) => {
  res.send("User routes are working!");
});

// Register a user
router.post("/register", registerUser);

// Login a user
router.post("/login", loginUser);

module.exports = router;
