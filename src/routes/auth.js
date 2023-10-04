const express = require("express");
const { createUser, loginUser } = require("../controllers/auth");
const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);

module.exports = router;
