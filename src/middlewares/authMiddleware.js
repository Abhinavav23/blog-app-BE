const jwt = require('jsonwebtoken');

const isLoggedInUser = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(" ")[1];
    try {
      const userInfo = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = userInfo.id
      next();
    } catch (err) {
      res.status(400).json({ status: "failed", error: err.message });
    }
  } else {
    res.status(400).json({ status: "failed", message: "please login first" });
  }
};

module.exports = { isLoggedInUser };
