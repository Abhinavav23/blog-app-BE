const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 6,
  },
  description: {
    type: String,
    required: true,
    minLength: 15,
  },
  tag: {
    type: [String],
    required: true,
    default: ["General"],
  },
  imageUrl: {
    type: String,
    required: true,
    default: "",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  username: String,
  upVote: Number,
  downVote: Number,
  votedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      // unique: true
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
