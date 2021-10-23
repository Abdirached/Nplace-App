const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
// signup routes
router.post("/", (req, res) => {
  const { firstName, lastName, email, phoneNumber, password, avatar, role } =
    req.body;
  User.findOne({ where: { email: email } })
    .then((savedUser) => {
      if (savedUser) {
        return res.json({ error: "Account already exists" });
      }
      bcrypt.hash(password, 10).then((hashedPassword) => {
        const user = User.create({
          firstName,
          lastName,
          email,
          phoneNumber,
          password: hashedPassword,
          avatar,
          role,
        })
          .then((data) => {
            res.json(data);
          })
          .catch((err) => {
            res.json({ message: err });
          });
      });
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

module.exports = router;
