const User = require("../models/user.model.js");

exports.create = (req, res) => {
    const user = new User({
        id: req.body.id,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        dob: req.body.dob,
        gender: req.body.gender,
        status: req.body.status || "active",
    });

    User.create(user, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating User Entry."
          });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving User Data."
          });
        else res.send(data);
    });
};

exports.update = (req, res) => {
    console.log(req.body);
    User.update(
        req.params.id,
        new User(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                  res.status(404).send({
                    message: `Not found User with id ${req.params.id}.`
                    });
                } else {
                  res.status(500).send({
                    message: "Error updating User with id " + req.params.id
                  });
                }
            } else res.send(data);
        }
    )
  
};
exports.delete = (req, res) => {
    User.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete User with id " + req.params.id
            });
          }
        } else res.send({ message: `User was deleted successfully!` });
    });
};