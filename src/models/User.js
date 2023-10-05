const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 6,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  blog: [
    {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

const User = mongoose.model("users", userSchema);

module.exports = User;
