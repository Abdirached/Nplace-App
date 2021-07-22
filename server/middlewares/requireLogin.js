const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "you must be logged in first" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "you must be logged in" });
    }
    req.user = payload;
    next();
    console.log(req.user);
  });
};
