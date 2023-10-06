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

    // create operation for blog
    const blog = await Blog.create(blogData);
    // add the created blog into the user blog array as well
    // update operation on user
    await User.findByIdAndUpdate(req.userId, { $push: { blog: blog._id } });
    res
      .status(201)
      .json({ status: "success", message: "blog created successfully" });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

const readBlog = async (req, res) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findById(blogId);
    res.status(200).json({ status: "success", data: blog });
  } catch {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

const editBlog = async (req, res) => {
  const { blogId } = req.params;
  const { userId } = req;
  try {
    const blog = await Blog.findById(blogId);
    // const isOwner= blog.user === userId --> wont work, both are in different formats
    const isOwner = blog.user.equals(userId);
    // check user ownership --> authorisation
    if (isOwner) {
      await Blog.findByIdAndUpdate(blogId, { $set: req.body });
      res
        .status(200)
        .json({ status: "success", message: "blog updated successfully" });
    } else {
      res.status(401).json({
        status: "failed",
        message: "you are not authorised to update this blog",
      });
    }
  } catch {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

const deleteBlog = (req, res) => {
  //userId --> req
  // blogId ---> req.params
  // check if the user is the owner of the blog
  // if yes --> delete the blog and remove the blog id from user blog array
  // findByIdAndDelete
  // findByIdAndUpdate --> pull
  // if noo --> send error response
};

module.exports = { createBlog, readBlog, editBlog, deleteBlog };


// const isOwner = (blogId, userId) => {
//     return true
// }