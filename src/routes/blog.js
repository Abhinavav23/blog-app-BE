const express = require("express");
const router = express.Router();
const {
  createBlog,
  readBlog,
  editBlog,
  deleteBlog,
  readAllBlogs,
  voteForBlog,
  addCommentToBlog
} = require("../controllers/blog");
const { isLoggedInUser } = require("../middlewares/authMiddleware");

// creating a new blog
router.post("/new", isLoggedInUser, createBlog);
// read all blogs
router.get("/all", readAllBlogs);
// reading a single blog
router.get("/read/:blogId", readBlog);
// updating a blog
router.patch("/edit/:blogId", isLoggedInUser, editBlog);
// deleting a blog
router.delete("/remove/:blogId", isLoggedInUser, deleteBlog);
// upvote and downvote
router.patch("/vote/:blogId/", isLoggedInUser, voteForBlog);
// addComment
router.post("/addComment/:blogId", isLoggedInUser, addCommentToBlog );

module.exports = router;
