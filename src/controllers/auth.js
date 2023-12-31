const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { password } = req.body;
  if (password) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = req.body;
    user.password = hashedPassword;
    try {
      const userData = await User.create(user);
      res
        .status(201)
        .json({ status: "success", message: "user created successfully" });
    } catch (err) {
      res.status(400).json({ status: "fail", error: err.message });
    }
  } else {
    res.status(400).json({ status: "fail", error: "data not available" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const isPasswordMatched = bcrypt.compareSync(password, user.password);
      if (isPasswordMatched) {
        const token = generateToken({ id: user._id }, 300);
        res
          .status(200)
          .json({ status: "success", message: "login successful", token });
      } else {
        res.status(400).json({ status: "fail", message: "wrong password" });
      }
    } else {
      res.status(400).json({ status: "failed", message: "user not found" });
    }
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

const getUserDetails = async (req, res) => {
  const { userId } = req;
  try {
    // const user = await User.findOne({ email }).select({ password: 0 });
    const user = await User.findById(userId).select({ password: 0 });
    res.status(200).json({ status: "success", data: user });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

const getMyBlogs = async (req, res) => {
  const { userId } = req;
  try {
    const { blog } = await User.findById(userId)
      .select({ blog: 1 })
      .populate({ path: "blog", model: "blog" });
    res.status(200).json({ status: "success", blogList: blog });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

module.exports = { createUser, loginUser, getUserDetails, getMyBlogs };

// 100 --> informational
// 200 --> success
// 300 --> redirection
// 400 --> client errors
// 500 --> server errors
