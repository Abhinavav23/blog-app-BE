const Blog = require("../models/Blog");
const User = require("../models/User");

const createBlog = async (req, res) => {
  const { title, description, tag, imageUrl } = req.body;

  try {
    const user = await User.findById(req.userId);
    const blogData = {
      title,
      description,
      tag,
      imageUrl,
      user: req.userId,
      username: user.username,
      upVote: 0,
      downVote: 0,
    };

    const blog = await Blog.create(blogData);
    res.status(200).json({ status: "success", data: blog });
    // add the created blog into the user blog array as well
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

module.exports = { createBlog };
