const router = require("express").Router();
const Authmiddleware = require("../middleware/Auth");

const LikeHandler = require("../controller/Like");
const {
  GetAllPosts,
  CreatePost,
  DeletePost,
  UpdatePost,
} = require("../controller/Posts");

router.get("/all", GetAllPosts);
router.post("/create", Authmiddleware, CreatePost);
router.delete("/delete/:id", Authmiddleware, DeletePost);
router.put("/update/:id", Authmiddleware, UpdatePost);
router.patch("/like/:id", Authmiddleware, LikeHandler);

module.exports = router;
