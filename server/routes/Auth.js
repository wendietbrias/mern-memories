const router = require("express").Router();
const { SignInHandler, SignUpHandler } = require("../controller/Auth");

router.post("/signin", SignInHandler);
router.post("/signup", SignUpHandler);

module.exports = router;
