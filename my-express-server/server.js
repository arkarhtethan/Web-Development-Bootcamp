// jshint esversion:6
const express = require('express');

// Developers that use express often use app to refer to express module
const app = express();

app.get("/", function(req, res) {
  // console.log(request);
  res.send("<h1>Hello world</h1>");

});

app.get("/contact", function(req, res) {
  res.send("Contact me at +12 34567890");
});

app.get("/about", function(req, res){
  res.send("A front end developer in training!");
});

app.get("/hobbies", function(req, res){
  res.send("<ul><li>Programming</li><li>Exercising</li><li>Gaming</li></ul>");
});

// Server is listening on port 3000.
app.listen(3000, function() {
  console.log("Server started on port 3000.");
});

// Access server by doing localhost:3000
