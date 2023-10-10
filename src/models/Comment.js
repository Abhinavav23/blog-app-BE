const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  message: {
    type: String,
    required: true,
    minLength: 3,
  },
  like: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  blog: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
  },
}, {versionKey: false});

const Comment = mongoose.model("comments", commentSchema);

module.exports = Comment;
