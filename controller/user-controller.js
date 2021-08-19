const db = require("../utils/db");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const unprocessable = require("../responses/unprocessable");
const json = require("../responses/json");
const User = require('../models/User')
exports.me = async (req, res) => {
    json(req.user, 200, res)
};
