const router = require("express").Router();
const Authmiddleware = require("../middleware/Auth");

const { GetAllPosts, CreatePost, DeletePost } = require("../controller/Posts");

router.get("/all", GetAllPosts);
router.post("/create", Authmiddleware, CreatePost);
router.delete("/delete/:id", Authmiddleware, DeletePost);

module.exports = router;
