// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  // Use __dirname to get current file path.
  res.sendFile(__dirname +  "/index.html");
});

app.post("/", function(req, res) {
  let num1 = Number(req.body.num1);
  let num2 = Number(req.body.num2);
  let result = num1 + num2;

  res.send(`The sum of the 2 numbers are ${result}.`);
});


app.get("/bmiCalculator", function(req, res){
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/result", function(req, res){
  let height = Number(req.body.height);
  let weight = Number(req.body.weight);
  let result = weight / Math.pow(height, 2);
  res.send(`Your BMI is ${result}.`);
});

app.listen(3000, function(){
  console.log("Listening on port 3000!");
});
