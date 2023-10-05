const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getUserDetails,
} = require("../controllers/auth");
const { isLoggedInUser } = require("../middlewares/authMiddleware");

router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/profile", isLoggedInUser, getUserDetails);

module.exports = router;
