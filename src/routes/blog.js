const express = require("express");
const router = express.Router();
const { createBlog } = require("../controllers/blog");
const { isLoggedInUser } = require("../middlewares/authMiddleware");

router.post("/new", isLoggedInUser, createBlog);

module.exports = router;
