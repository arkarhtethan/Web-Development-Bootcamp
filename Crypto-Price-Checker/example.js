// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

// Have to also send the other files that were used locally. Put them in the folder called public.
app.use(express.static("public"));

app.listen(3000, function(){
  console.log("Server is running on port 3000!");
});
