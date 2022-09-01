const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    userId: String,

    creator: {
      type: String,
      required: true,
    },
    title: {
      required: true,
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    likes: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("post", postSchema);
