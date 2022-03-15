const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { createJWT } = require("../utils/auth");

exports.signup = (req, res) => {
  var { name, email, password, confirm_password } = req.body;

  var errors = [];
  if (!name) {
    errors.push({ name: "required" });
  }

  if (!email) {
    errors.push({ email: "required" });
  }

  if (!password) {
    errors.push({ password: "required" });
  }

  if (!confirm_password) {
    errors.push({ confirm_password: "required" });
  }

  if (password != confirm_password) {
    errors.push({ password: "mismatch" });
  }

  if (errors.length > 0) {
    return res.status(422).json({ errors: error });
  }

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res
          .status(422)
          .json({ errors: [{ user: "email already exists" }] });
      } else {
        const user = new User({
          name: name,
          email: email,
          password: password,
        });
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            if (err) throw err;
            user.password = hash;
            user
              .save()
              .then((response) => {
                res.status(200).json({
                  success: true,
                  result: response,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  errors: [{ error: err }],
                });
              });
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: "Something went wrong" }],
      });
    });
};

exports.signin = (req, res) => {
  var { email, password } = req.body;

  var errors = [];
  if (!email) {
    errors.push({ email: "required" });
  }

  if (!password) {
    errors.push({ password: "required" });
  }

  if (errors.length > 0) {
    return res.status(422).json({ errors: error });
  }

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          errors: [{ user: "not found" }],
        });
      } else {
        bcrypt
          .compare(password, user.password)
          .then((isMatch) => {
            if (!isMatch) {
              return res.status(400).json({
                errors: [{ password: "incorrect" }],
              });
            }
            var access_token = createJWT(user.email, user._id, 3600);
            jwt.verify(
              access_token,
              process.env.TOKEN_SECRET,
              (err, decoded) => {
                if (err) {
                  res.status(500).json({ erros: err });
                }
                if (decoded) {
                  return res.status(200).json({
                    success: true,
                    token: access_token,
                    message: user,
                  });
                }
              }
            );
          })
          .catch((err) => {
            res.status(400).json({ erros: err });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
