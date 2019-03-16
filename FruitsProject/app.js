//jshint esversion:6
const mongoose = require("mongoose");

// Make connection to a db called users, if it doesn't exist, make one.
mongoose.connect("mongodb://localhost:27017/humans", { useNewUrlParser: true });

// Creating schema for humans
const humanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Why no name?!"]
  },
  age: {
    type: Number,
    min: 1,
    max: 100
  }
});

// 2 params, name of collection then schema
// Collection should be in singular form
const Human = mongoose.model("Human", humanSchema)

// Creating new human
const human = new Human({
  name: "LY",
  age: 3
})

// Insert human
human.save(function(err) {
  if(err){
    console.log(err);
  } else {
    console.log("entry added successfully");
    mongoose.connection.close()
  }
});



// Human.updateOne({_id : "5c8aff104da4ca636cdbf760"}, {name: "new name"}, function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("Successfully updated document.")
//   }
// })


// Human.deleteOne({_id : "5c8aff104da4ca636cdbf760"}, function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("Entry successfully deleted.")
//   }
// })
