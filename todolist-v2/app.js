//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-simon:Test123@cluster0-mkoix.mongodb.net/todolistDB", {
  useNewUrlParser: true
});

const itemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Your items needs a name..."]
  }
});

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Your list title needs a name..."]
  },
  items: [itemsSchema]
})

const List = mongoose.model("List", listSchema);
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your todolist!"
});

const item2 = new Item({
  name: "Hit the + button to add a new item"
});

const item3 = new Item({
  name: "<-- hit this to delete an item"
});

const defaultItems = [item1, item2, item3];

app.get("/", function(req, res) {
  Item.find({}, function(err, items) {
    if (items.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Default items inserted successfully.");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", {
        listTitle: "Today",
        newListItems: items
      });
    }
  })
});

app.get("/:listName", function(req, res) {
  const listName = _.capitalize(req.params.listName);

  List.findOne({name: listName}, function(err, list){
    if(!err) {
      if(!list) {
        console.log("List doesn't exist, creating new default list.");
        // Create new list
        const newList = new List({
          name: listName,
          items: defaultItems
        });
        newList.save();
        res.redirect("/"+listName);
      } else {
        // show existing list
        res.render("list", {
          listTitle: list.name,
          newListItems: list.items
        });
      }
    } else {
      console.log(err);
    }
  })



})

app.post("/", function(req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if(listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}, function(err, list){
      list.items.push(item);
      list.save()
      res.redirect("/" + listName);
    })
  }



  // if (req.body.list === "Work") {
  //   workItems.push(item);
  //   res.redirect("/work");
  // } else {
  //   items.push(item);
  //   res.redirect("/");
  // }
});

app.post("/delete", function(req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if(listName === "Today"){
    Item.findByIdAndRemove(checkedItemId, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Item successfully deleted.");
      }
    })
    res.redirect("/");
  } else {
    // Pull (remove) from items array an item with id
    List.findOneAndUpdate(
      {name: listName},
      {$pull: {items: {_id: checkedItemId}}},
      function(err, list){
        if(!err){
          res.redirect("/" + listName);
        }
    })
  }


})



// app.get("/work", function(req, res) {
//   res.render("list", {
//     listTitle: "Work List",
//     newListItems: workItems
//   });
// });

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
