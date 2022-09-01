const userModel = require("../db/schema/Auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const SignInHandler = async (req, res) => {
  if (!validateEmail(req.body.email)) {
    return res.status(400).json({ msg: "email is not valid" });
  }

  const checkAccount = await userModel.findOne({
    email: { $eq: req.body.email },
  });

  if (!checkAccount) {
    return res.status(401).json({ msg: "account is not  exists" });
  }

  bcrypt.compare(req.body.password, checkAccount.password, (err, compare) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (!compare) {
      return res.status(401).json({ msg: "password is wrong" });
    }

    const token = jwt.sign(
      {
        email: checkAccount.email,
        name: checkAccount.name,
        _id: checkAccount._id,
      },
      `${process.env.SECRET}`,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json(token);
  });
};

const SignUpHandler = async (req, res) => {
  if (typeof req.body === null || typeof req.body === "undefined") {
    return res.status(500).json({ msg: "internal server error" });
  }

  if (!validateEmail(req.body.email)) {
    return res.status(400).json({ msg: "email is not valid" });
  }

  const findDup = await userModel.findOne({ email: req.body.email });

  if (findDup) {
    return res.status(500).json({ msg: "account is exists" });
  }

  const init = new userModel({
    name: req.body.name,
    email: req.body.email,
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return res.status(500).json({ msg: err });
    }

    bcrypt.hash(req.body.password, salt, async (err, hash) => {
      init.password = hash;
      try {
        const saved = await init.save();
        const token = jwt.sign(
          {
            email: init.email,
            name: init.name,
            _id: init?._id,
          },
          `${process.env.SECRET}`,
          {
            expiresIn: "1d",
          }
        );

        return res.status(200).json(token);
      } catch (err) {
        console.log(err);
      }
    });
  });
};

module.exports = { SignInHandler, SignUpHandler };
