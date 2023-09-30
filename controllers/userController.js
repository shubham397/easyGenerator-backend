let User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

/*
    Add User to mongoDB
*/
exports.addPostUser = (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  bcrypt
    .hash(password, saltRounds)
    .then((hashPassowrd) => {
      User.create({
        name: name,
        email: email,
        password: hashPassowrd,
      })
        .then((user) => {
          res.send({
            success: true,
            message: "User created successfully",
          });
        })
        .catch((err) => {
          console.log(err);
          res.send({
            success: false,
            message: err,
          });
        });
    })
    .catch((err) => console.error(err.message));
};

/*
get data from DB
*/
exports.getUser = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({ email: email })
    .then((result) => {
      bcrypt.compare(password, result.password, function (err, re) {
        if (re) {
          // Send JWT
          res.send({
            status: "true",
            message: re,
          });
        } else {
          // response is OutgoingMessage object that server response http request
          res.send({
            status: "false",
            message: "Password does not match",
          });
        }
      });
    })
    .catch((err) => {
      res.send({
        status: "false",
        message: err,
      });
    });
};
