const jwt = require("jsonwebtoken");

const generateToken = (data, expireTimeInMin = 30) => {
  const token = jwt.sign(data, process.env.SECRET_KEY, {
    expiresIn: expireTimeInMin * 60,
  });
  return token;
};

module.exports = { generateToken };
