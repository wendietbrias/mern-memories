const postsModel = require("../db/schema/Posts");

const LikeHandler = async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;

  const findPost = await postsModel.findById(id);

  if (!findPost) {
    return res.status(405).json({ msg: "Not found the post" });
  }

  if (findPost.likes.find((userIds) => userIds === userId)) {
    const filtered = findPost.likes.filter((userId) =>
      userId !== userId ? userId : ""
    );
    findPost.likes = filtered;
  } else {
    findPost.likes.push(userId);
  }

  const saved = await findPost.save();
  return res.status(200).json(saved);
};

module.exports = LikeHandler;
