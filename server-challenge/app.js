//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/WikiDB", {
  useNewUrlParser: true
});

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

// Creating the posts collection
const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
  .get(function(req, res) {
    Article.find({}, function(err, articles) {
      if (!err) {
        res.send(articles);
      } else {
        res.send(err);
      }
    })
  })
  .post(function(req, res) {
    const article = new Article({
      title: req.body.title,
      content: req.body.content
    });

    article.save(function(err) {
      if (!err) {
        res.send("Successfully added new article.");
      } else {
        res.send(res);
      }
    });
  })
  .delete(function(req, res) {
    Article.deleteMany({}, function(err) {
      if (!err) {
        res.send("Deleted all articles.");
      } else {
        res.send(res);
      }
    });
  });

app.route("/articles/:title")
  .get(function(req, res) {
    Article.findOne({
        title: req.params.title
      },
      function(err, article) {
        if (!err) {
          if (article) {
            res.send(article);
          } else {
            res.send("No articles matching that title was found");
          }
        } else {
          res.send(err);
        }
      }
    )
  })

  .put(function(req, res) {
    Article.update({
        title: req.params.title
      }, {
        title: req.body.title,
        content: req.body.content
      }, {
        overwrite: true
      },
      function(err) {
        if (!err) {
          res.send("Successfully replace article with PUT");
        }
      }
    )
  })

  .patch(function(req, res){
    Article.update({
      title: req.params.title
    }, {
      $set: req.body
    }, function(err) {
      if(!err) {
        res.send("Successfully modified article with PATCH");
      }
    })
  })

  .delete(function(req, res){
    Article.deleteOne({
      title: req.params.title
    }, function(err){
      if(!err) {
        res.send("Corresponding article successfully deleted.")
      } else {
        res.send(res);
      }
    })
  });


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
