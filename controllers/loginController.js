const LocalStrategy = require("passport-local");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const passport = require("passport");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(async function (username, password, done) {
      await User.findOne({ email: username })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "Incorrect username or password.",
            });
          }
          bcrypt.compare(password, user.password, function (err, result) {
            if (err) throw err;
            if (result) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password incorrect" });
            }
          });
        })

        .catch((err) => {
          return done(err);
        });
    })
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  });
  
};
