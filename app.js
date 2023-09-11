const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require('method-override');
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "SECRETKEY",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(methodOverride('_method'));
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);

require("./controllers/loginController")(passport);

const route = require("./routes/registration");
const routee = require("./routes/login");

app.listen(5000);

app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.URI)
  .then((result) => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");

app.use("/", route);
app.use("/login", checkNotAuthenticated, routee);

app.get('/dashboard', checkAuthenticated, (req, res) => {
    res.render('dashboard', {name: req.user.name})
})

app.delete('/logout', (req, res) => {
    req.logOut(err => {
    })
    res.redirect('/login')
})

function checkAuthenticated (req, res, next) {
    if(req.isAuthenticated()){
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated (req, res, next) {
    if(req.isAuthenticated()){
       return res.redirect('/dashboard')
    }
    next()
    
}
