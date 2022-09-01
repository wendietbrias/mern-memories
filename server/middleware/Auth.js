const jwt = require("jsonwebtoken");

const Authmiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ msg: "No token accept" });
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  jwt.verify(token, `${process.env.SECRET}`, (err, decoded) => {
    if (err) {
      return res.status(500).json(err);
    }

    console.log(decoded?._id);

    req.userId = decoded?._id;
    return next();
  });
};

module.exports = Authmiddleware;
