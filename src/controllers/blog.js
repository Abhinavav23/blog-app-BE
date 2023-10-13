const Blog = require("../models/Blog");
const User = require("../models/User");
const Comment = require("../models/Comment");

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
    const blog = await Blog.findById(blogId)
      // .populate({path: "user", model: "users", populate: {path: "blog", model: "blog"}})
      .populate({ path: "comments", model: "comments" });
    // .populate({path: "votedBy", model: "users"})
    res.status(200).json({ status: "success", data: blog });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

const readAllBlogs = async (req, res) => {
  try {
    const blogList = await Blog.find().select({
      title: 1,
      username: 1,
      imageUrl: 1,
    });
    res.status(200).json({ status: "success", data: blogList });
  } catch (err) {
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

const deleteBlog = async (req, res) => {
  //userId --> req
  const { userId } = req;
  // blogId ---> req.params
  const { blogId } = req.params;

  try {
    // check if the user is the owner of the blog
    const blog = await Blog.findById(blogId);
    const isOwner = blog.user.equals(userId);
    if (isOwner) {
      // delete the blog
      await Blog.findByIdAndDelete(blogId);
      // remove the blog from user blog List
      await User.findByIdAndUpdate(userId, { $pull: { blog: blogId } });
      res
        .status(200)
        .json({ status: "successful", message: "blog deleted successfully" });
    } else {
      res.status(401).json({
        status: "failed",
        message: "you are not authorised to delete this blog",
      });
    }
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
  // if yes --> delete the blog and remove the blog id from user blog array
  // findByIdAndDelete
  // findByIdAndUpdate --> pull
  // if noo --> send error response
};

const voteForBlog = async (req, res) => {
  const { blogId } = req.params;
  const { voteType } = req.query;
  const { userId } = req;
  try {
    // if(voteType === 'upVote'){
    //   await Blog.findByIdAndUpdate(blogId, {$inc : {upVote: 1}, $push: {votedBy: userId}})
    // }
    // if(voteType === 'downVote'){
    //   await Blog.findByIdAndUpdate(blogId, {$inc : {downVote: 1}, $push: {votedBy: userId}})
    // }

    // perform the check if user is already voted
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
      $inc: { [voteType]: 1 },
      $push: { votedBy: userId },
    });
    res
      .status(200)
      .json({ status: "successful", message: `${voteType} successful` });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

const addCommentToBlog = async (req, res) => {
  const { userId } = req;
  const { message } = req.body;
  const { blogId } = req.params;
  try {
    // create a comment
    const comment = await Comment.create({
      message,
      like: 0,
      user: userId,
      blog: blogId,
    });
    // add comment to blogs array
    await Blog.findByIdAndUpdate(blogId, { $push: { comments: comment._id } });
    res
      .status(201)
      .json({ status: "success", message: "comment added successfully" });
  } catch (err) {
    res.status(500).json({ status: "filed", message: err.message });
  }
};

module.exports = {
  createBlog,
  readBlog,
  editBlog,
  deleteBlog,
  readAllBlogs,
  voteForBlog,
  addCommentToBlog,
};

// const isOwner = (blogId, userId) => {
//     return true
// }
