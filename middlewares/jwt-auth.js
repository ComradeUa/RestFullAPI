const passport = require("passport");
const json = require("../responses/json");
const jwt = require('jsonwebtoken');
const config = require("../utils/config");
module.exports = passport.authenticate("jwt", {
  session: false,
})