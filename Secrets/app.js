//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption");
const md5 = require("md5");

const app = express()

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

// Gotta add plugin to schema b4 you make the mongoose model
// Note that you don't have to do anything else because mongoose encrypt encrypts automatically when you save and decrypts automatically when you find.
// userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ['password']});

const User = mongoose.model("User", userSchema);

app.get("/", function(req, res){
  res.render("home");
})

app.get("/login", function(req, res){
  res.render("login");
})

app.get("/register", function(req, res){
  res.render("register");
})

app.post("/register", function(req, res){
  const newUser = new User({
    email: req.body.username,
    password: md5(req.body.password)
  })

  newUser.save(function(err){
    if(err) {
      console.log(err);
    } else {
      res.render("secrets");
    }
  })
})

app.post("/login", function(req, res){
  const username = req.body.username;
  const password = md5(req.body.password);
  User.findOne({email: username}, function(err, user){
    if(err){
      console.log(err);
    } else {
      if(user){
        if(user.password === password){
          res.render("secrets");
        }
      }
    }
  });
});


app.listen(3000, function(){
  console.log("Listening on port 3000");
})
