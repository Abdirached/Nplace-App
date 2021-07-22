const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
router.post("/", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" });
  }
  User.findOne({ where: { email: email } }).then((savedUser) => {
    if (!savedUser) {
      return res.json({ error: "invalid Email or password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          //res.json({message:"successfully signed"})
          const token = jwt.sign(
            { userId: savedUser.userId },
            process.env.JWT_SECRET
          );
          const { userId, firstName, lastName, email, avatar } = savedUser;
          res.json({
            token,
            user: { userId, firstName, lastName, email, avatar },
          });
        } else {
          return res.json({ error: "invalid email or password" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
module.exports = router;
