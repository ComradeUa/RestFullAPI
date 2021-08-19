const db = require("../utils/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
class User {
  constructor(_id, _name, _password, _email, _phone) {
    this.id = _id;
    this.name = _name;
    this.password = _password;
    this.email = _email;
    this.phone = _phone;
  }
  static getUserByLogin(login) {
    return new Promise((res, rej) => {
      db.query(
        "SELECT email, password FROM users",
        [login],
        (error, result) => {
          if (error) return rej(error);
          return res(result);
        }
      );
    });
  }
}
module.exports = User;
