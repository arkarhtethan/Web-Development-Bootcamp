// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
// Have to also send the other files that were used locally. Put them in the folder called public.
app.use(express.static("public"));

// Listen to the port defined on heroku or on port 3000.
app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000!");
});


app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});


app.post("/result", function(req, res) {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/3e139f767f",
    method: "POST",
    // This is how you do basic http authorisation via requests
    headers: {
      authorization: "Simon 9bd9e92962bb315012b12ad66ea1184d"
    },
    body: jsonData
  };

  request(options, function(error, response, body){
    if(error) {
      res.write("You failed. There was an error signing up.");
    } else {
      // Usehttps://httpstatuses.com/ to check what kind of response you're getting.
      if(response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

// API Key, last 4 letters = server. Look up mailchimp server status.
// 9bd9e92962bb315012b12ad66ea1184d-us20

// List ID
// 3e139f767f
