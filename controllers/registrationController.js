const bcrypt = require("bcrypt");
const User = require("../models/userModel");

let errorArray = [];

const regControl = async (req, res) => {
    if (req.body) {
      try {
        const { name, email, password1, password2 } = req.body;
        if (name == "") {
          errorArray.push("Pls fill in your name");
        }
  
        if (email == "") {
          errorArray.push("Pls fill in your email");
        }
  
        if (password1 == "") {
          errorArray.push("Pls fill in your password");
        }
  
        if (password1 && password1.length < 5) {
          errorArray.push("Password must be at least 5 characters");
        }
  
        if (password1 !== password2) {
          errorArray.push("Passwords must match");
        }
  
        async function checkUserExistence(email) {
          const avail = await User.findOne({ email: email }).exec();
          if (avail) {
            errorArray.push("Email already exists");
          }
        }
  
        const userExists = await checkUserExistence(email);
        if (userExists) {
          errorArray.push("Email already exists");
        }
  
        if (errorArray.length > 0) {
          res.render("register", { errorArray });
          errorArray = [];
        } else {
          const saltRounds = 10;
          bcrypt.hash(password1, saltRounds, async function (err, hash) {
            let password = hash;
            const user = new User({ name, email, password });
            user
              .save()
              .then((result) => {
                res.redirect('/login');
              })
              .catch((err) => {
                console.log(err);
              });
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  
  async function checkUserExistence(email) {
    const avail = await User.findOne({ email: email }).exec();
    return avail !== null;
  }
  

  module.exports = regControl;