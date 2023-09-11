const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const route = express.Router();

const regControl = require('../controllers/registrationController')

route.get("/", (req, res) => {
  res.render("register", { errorArray });
});



let errorArray = [];

route.post("/", regControl)
module.exports = route;
