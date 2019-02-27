// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

// Have to also send the other files that were used locally. Put them in the folder called public.
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


















app.listen(3000, function() {
  console.log("Server started on port 3000");
});
