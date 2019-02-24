// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");

// Since we're requiring a local module, we do it differently.
const date = require(__dirname + "/date");

var app = express();
var tasks = ["Buy Food", "Cook Food", "Eat Food"];
var workTasks = [];

app.use(bodyParser.urlencoded({
  extended: true
}));
// To tell express to serve up all the files inside the public folder
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.listen(3000, function(req, res) {
  console.log("Listening on port 3000.")
});

app.get("/", function(req, res) {

  let day = date.getDate();

  // Express is going to look inside the view folder for a file called list.
  // When you do render, it will look through all the <%= %> (in the file called list) and put values there.
  res.render('list', {
    listTitle: day,
    newTasks: tasks
  });
});

app.post("/", function(req, res) {
  let task = req.body.newTask;

  if(req.body.taskType === "Work List") {
    workTasks.push(task);
    res.redirect("/work");
  } else {
    tasks.push(task);
    res.redirect("/");
  }

})

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newTasks: workTasks});
});

app.post("/work", function(req, res){
  let task = req.body.newTask;
  workTasks.push(task);
  res.redirect("/work");
});
