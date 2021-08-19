const { getUserByLogin } = require("../models/User");
const db = require("../utils/db");
const bcrypt = require("bcrypt");
const json = require("../responses/json");
const unprocessable = require("../responses/unprocessable");
const { jwtSecret } = require("../utils/config");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  const { phone,name, email, password } = req.body;
  const errors = [];
  if (!password) {
    errors.push({
      field: "password",
      message: "Wrong password",
    });
  }
  if (!name) {
    errors.push({
      field: "name",
      message: "Wrong name",
    });
  }
  if (!email) {
    errors.push({
      field: "email",
      message: "Wrong email",
    });
  }
  if (errors.length) {
    return unprocessable(errors, res);
  }

  db.query(
    "INSERT INTO users (name, email, password, phone) VALUES (?,?,?,?)",
    [name, email, password, phone],
    (error, result) => {
      if (error) {
        return json({ message: "Error registation" }, 400, res);
      }
      return json({ token: jwt.sign({email,password}, jwtSecret) }, 200, res);
    }
  );
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const result = await getUserByLogin(email);

  db.query(
    `SELECT email FROM users WHERE email = '${email}' AND password = '${password}'`,
    (error, result) => {
      if (error) {
        console.log(error);
        return json({ message: "Error" }, 400, res);
      }
      return json({ token: jwt.sign({email, password}, jwtSecret) }, 200, res);
    }
  );
};
