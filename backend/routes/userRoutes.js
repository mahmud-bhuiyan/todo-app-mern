const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", (req, res) => {
  res.send("User routes are working!");
});

// Register a user
router.post("/register", userController.registerUser);

// Login a user
router.post("/login", userController.loginUser);

module.exports = router;
