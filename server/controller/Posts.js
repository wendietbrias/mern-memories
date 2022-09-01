const postsModel = require("../db/schema/Posts");

const GetAllPosts = async (req, res) => {
  const allPosts = await postsModel.find();

  return res.status(200).json(allPosts);
};

const CreatePost = async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  const { title, tags, message, image, creator } = req.body;
  const initPosts = new postsModel({
    title,
    tags,
    image,
    message,
    userId: req.userId,
    creator,
  });

  try {
    const saved = await initPosts.save();
    return res.status(200).json(saved);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const UpdatePost = async (req, res) => {};

const DeletePost = async (req, res) => {
  const findPost = await postsModel.findById(req.params.id);

  if (!findPost) {
    return res
      .status(406)
      .json({ msg: `not found post with id : ${req.params.id}` });
  }

  const deleted = await postsModel.findByIdAndDelete(req.params.id);

  if (deleted) {
    return res.status(200).json(deleted);
  }
};

module.exports = { GetAllPosts, CreatePost, UpdatePost, DeletePost };
