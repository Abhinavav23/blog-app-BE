const jwt = require("jsonwebtoken");

const generateToken = (data, expireTimeInMin = 60) => {
  const token = jwt.sign(data, process.env.SECRET_KEY, {
    expiresIn: expireTimeInMin * 60, // '3h'
  });
  return token;
};

module.exports = { generateToken };
