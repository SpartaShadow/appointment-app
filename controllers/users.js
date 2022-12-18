const Users = require("../models/users");

exports.postAddUser = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;

  Users.create({
    name: name,
    email: email,
    phoneNumber: phoneNumber,
  })
    .then((result) => {
      res.json(result.dataValues);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAllUsers = (req, res, next) => {
  Users.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUser = (req, res, next) => {
  const id = req.params.id;

  Users.findByPk(id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteUser = (req, res, next) => {
  const id = req.params.id;

  Users.findByPk(id)
    .then((result) => {
      return result.destroy();
    })
    .then((response) => {
      res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
