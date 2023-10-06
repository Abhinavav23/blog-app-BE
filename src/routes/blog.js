const express = require("express");
const router = express.Router();
const { createBlog, readBlog, editBlog, deleteBlog } = require("../controllers/blog");
const { isLoggedInUser } = require("../middlewares/authMiddleware");

router.post("/new", isLoggedInUser, createBlog);
router.get('/read/:blogId', readBlog);
router.patch('/edit/:blogId', isLoggedInUser, editBlog)
router.delete('/remove/:blogId', isLoggedInUser, deleteBlog);
module.exports = router;
