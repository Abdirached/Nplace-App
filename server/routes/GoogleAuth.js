const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  cb(null, user);
});
passport.use(
  "seller-google-signup",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/seller/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      const user = await User.findOne({
        where: { email: profile.emails[0].value },
      });
      if (user) {
        return cb(null, user);
      }
      const NewUser = await User.create({
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        phonenumber: null,
        password: "123456",
        avatar: profile.photos[0].value,
        role: "seller",
      });
      console.log(NewUser);
      return cb(null, NewUser);
    }
  )
);
router.get(
  "/seller/google",
  passport.authenticate("seller-google-signup", { scope: ["profile", "email"] })
);

router.get(
  "/seller/google/callback",
  passport.authenticate("seller-google-signup", {
    failureRedirect: "http://localhost:3000/SignIn",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log("saxsax");
    console.log(req.user);
    const token = jwt.sign({ userId: req.user.userId }, process.env.JWT_SECRET);
    res.cookie("auth", token);
    res.cookie("user", req.user.userId);
    res.cookie("role", req.user.role);
    if (req.user.role === "buyer") {
      res.redirect("http://localhost:3000/Add");
    }
    res.redirect("http://localhost:3000");
  }
);
// buyer google signup
passport.use(
  "buyer-google-signup",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/buyer/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      const user = await User.findOne({
        where: { email: profile.emails[0].value },
      });
      if (user) {
        return cb(null, user);
      }
      const newUser = await User.create({
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        phonenumber: null,
        password: "123456",
        avatar: profile.photos[0].value,
        role: "buyer",
      });
      console.log(newUser);
      return cb(null, newUser);
    }
  )
);
router.get(
  "/buyer/google",
  passport.authenticate("buyer-google-signup", { scope: ["profile", "email"] })
);

router.get(
  "/buyer/google/callback",
  passport.authenticate("buyer-google-signup", {
    failureRedirect: "http://localhost:3000/SignIn",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log("okok");
    console.log(req.user);
    const token = jwt.sign({ userId: req.user.userId }, process.env.JWT_SECRET);
    res.cookie("auth", token);
    res.cookie("user", req.user.userId);
    res.cookie("role", req.user.role);
    if (req.user.role === "buyer") {
      res.redirect("http://localhost:3000/Add");
    }
    res.redirect("http://localhost:3000");
  }
);
// signin with google
passport.use(
  "google-signin",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/signin/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      const user = await User.findOne({
        where: { email: profile.emails[0].value },
      });
      if (user) {
        console.log(user);
        return cb(null, user);
      }
      return cb(null, { errorMessage: "Account not found !" });
    }
  )
);
router.get(
  "/signin/google",
  passport.authenticate("google-signin", { scope: ["profile", "email"] })
);

router.get(
  "/signin/google/callback",
  passport.authenticate("google-signin", {
    failureRedirect: "http://localhost:3000/SignIn",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log("signsignin");
    console.log(req.user);
    const { errorMessage } = req.user;
    if (errorMessage) {
      res.cookie("Error", errorMessage);
      res.redirect("http://localhost:3000/SignIn");
      return;
    }
    const token = jwt.sign({ userId: req.user.userId }, process.env.JWT_SECRET);
    res.cookie("auth", token);
    res.cookie("user", req.user.userId);
    res.cookie("role", req.user.role);
    if (req.user.role === "buyer") {
      res.redirect("http://localhost:3000/Add");
    }
    res.redirect("http://localhost:3000");
  }
);
module.exports = router;
