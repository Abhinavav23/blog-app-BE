const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token');

const createUser = async (req, res) => {
  const { password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = req.body;
  user.password = hashedPassword;
  console.log('user', user);
  
  try {
    const userData = await User.create(user);
    res.status(201).json({ status: "success", data: userData });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        const isPasswordMatched = bcrypt.compareSync(password, user.password);
        if (isPasswordMatched) {
          const token = generateToken({ email: user.email, team: user.team });
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
      res.status(404).json({ status: "failed", message: err.message });
    }
  };

module.exports = { createUser, loginUser };
