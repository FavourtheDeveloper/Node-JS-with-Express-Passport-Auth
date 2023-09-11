const express = require("express");

const passport = require("passport");
const bcrypt = require("bcrypt");

const routee = express.Router();



routee.get("/", (req, res) => {
  res.render("login");
});

routee.post("/", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true
  })(req, res, next);
});

module.exports = routee;
