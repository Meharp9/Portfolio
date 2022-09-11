const sql = require("./db.js");

const userData = function(data) {
    this.id = data.id;
    this.name = data.name;
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.dob = data.dob;
    this.gender = data.gender;
    this.status = data.status;
};

userData.create = (newUser, result) => {
    sql.query("INSERT INTO user_data SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created User: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

userData.update = (id, user_data, result) => {
    sql.query(
      "UPDATE user_data SET name = ?, email = ?, password = ?, status = ? WHERE id = ?",
      [user_data.name, user_data.email, user_data.password, user_data.status, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("updated USer Entry: ", { id: id, ...user_data });
        result(null, { id: id, ...user_data });
      }
    );
  };

userData.getAll = (result) => {
    let query = "SELECT * FROM user_data";
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("User: ", res);
      result(null, res);
    });
};

userData.remove = (id, result) => {
    sql.query("DELETE FROM user_data WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted User with id: ", id);
        result(null, res);
    });
};

module.exports = userData;