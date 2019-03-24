//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
// const encrypt = require("mongoose-encryption");
// const md5 = require("md5");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;

const app = express()

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

// Initialise passport and session
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true
});

mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

userSchema.plugin(passportLocalMongoose);

// Gotta add plugin to schema b4 you make the mongoose model
// Note that you don't have to do anything else because mongoose encrypt encrypts automatically when you save and decrypts automatically when you find.
// userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ['password']});

const User = mongoose.model("User", userSchema);

// Create strategy
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res) {
  res.render("home");
})

app.get("/login", function(req, res) {
  res.render("login");
})

app.get("/register", function(req, res) {
  res.render("register");
})

app.get("/secrets", function(req, res){
  // Check if user is already logged in, render secrets
  if(req.isAuthenticated()){
    res.render("secrets");
  } else {
    res.redirect("login");
  }
})

// app.post("/register", function(req, res) {
//
//   bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
//     if (err) {
//       console.log(err);
//     } else {
//       const newUser = new User({
//         email: req.body.username,
//         password: hash
//       })
//
//       newUser.save(function(err) {
//         if (err) {
//           console.log(err);
//         } else {
//           res.render("secrets");
//         }
//       })
//     }
//   })
// })

// app.post("/login", function(req, res) {
//   const username = req.body.username;
//   const password = req.body.password;
//
//   User.findOne({
//     email: username
//   }, function(err, user) {
//     if (err) {
//       console.log(err);
//     } else {
//       if (user) {
//         bcrypt.compare(password, user.password, function(error, result){
//           if(result === true){
//             res.render("secrets");
//           } else {
//             console.log("wrong password");
//           }
//         })
//
//       }
//     }
//   })
//
// })

app.post("/register", function(req, res){
  User.register({username: req.body.username}, req.body.password, function(err, user){
    if(err){
      console.log(err);
      res.redirect("/register")
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/secrets");
      })
    }
  })

})

app.post("/login", function(req, res){
  const user = new User({
    username: req.body.username,
    password: req.body.password
  })

  req.login(user, function(err){
    if(err){
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/secrets");
      })
    }
  })
})

app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
})

app.listen(3000, function() {
  console.log("Listening on port 3000");
})
