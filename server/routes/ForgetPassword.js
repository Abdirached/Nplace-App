const express = require("express");
const AWS = require("aws-sdk");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
// forgot password routes
AWS.config.update({ region: process.env.S3_REGION });
const ses = new AWS.SES({ apiVersion: "2010-12-01" });
router.post("/reset-link", (req, res) => {
  const { email } = req.body;
  User.findOne({ where: { email: email } })
    .then((savedUser) => {
      if (savedUser) {
        const token = jwt.sign(
          { userId: savedUser.userId },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        const link = `http://localhost:3000/forgot-password/reset-password/${token}`;
        const sendEmail = ses
          .sendEmail({
            Destination: {
              ToAddresses: [savedUser.email],
            },
            Message: {
              Body: {
                Text: {
                  Charset: "UTF-8",
                  Data: `Hello click on on the link ${link} to reset your password`,
                },
              },
              Subject: {
                Charset: "UTF-8",
                Data: "reset email",
              },
            },
            Source: "abdirashidhersi5@gmail.com",
          })
          .promise();

        sendEmail
          .then((data) => {
            console.log("email submitted to SES", data);
            res.json(data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        res.json({ message: "no user with that email found" });
      }
    })
    .catch((err) => {
      res.json({ message: err });
    });
});
// update userpassword
router.put("/reset-password/:token", (req, res) => {
  const { password } = req.body;
  const token = req.params.token;
  console.log(token);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  bcrypt.hash(password, 10).then((hashedPassword) => {
    const user = User.update(
      {
        password: hashedPassword,
      },
      { where: { userId: decoded.userId }, returning: true }
    )
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({ message: err });
      });
  });
});
module.exports = router;
