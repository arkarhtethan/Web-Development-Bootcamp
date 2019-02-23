// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function(){
  console.log("Server is running on port 3000!");
});

// On load to the rool directory, send this html file that is located at this location.
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  let crypto = req.body.crypto;
  let fiat = req.body.fiat;
  let amount = req.body.amount;
  let baseUrl = "https://apiv2.bitcoinaverage.com/convert/global";


  let options = {
    url: baseUrl,
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  };

  request(options, function(error, result, body){
    let data = JSON.parse(body);
    var price = data.price;

    res.write(`<h1>The price of ${amount} ${crypto} is ${price} ${fiat}.</h1>`);
    res.send(); // This is like pressing the send button.
  });
});
