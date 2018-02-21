var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Camp = require("./models/camp"),
    seedDB = require("./seed"),
    Comment = require("./models/comment")
    
seedDB();
mongoose.connect("mongodb://localhost/yelpcamp"); 

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
   res.render("landing");
});

app.get("/camps", function(req, res){
    Camp.find({},function(err, allCamps){
       if (err) {
           console.log(err);
       } else {
           res.render("camps/index", {camps:allCamps});
       }
    });
});

app.post("/camps", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCamp = {name:name, image:image, description: description}
    Camp.create(newCamp, function(err, newCreated){
       if(err){
           console.log(err);
       } else {
           console.log(newCreated);
           res.redirect("/camps");
       }
    });
});

app.get("/camps/new", function(req, res) {
    res.render("camps/new");
});

app.get("/camps/:id", function(req, res) {
    Camp.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
       if (err) {
           console.log(err);
       } else {
           console.log(foundCamp);
           res.render("camps/show", {camp: foundCamp});
       }
    });
});

// ==============
app.get("/camps/:id/comments/new", function(req, res) {
   Camp.findById(req.params.id, function(err, camp){
      if (err) {
          console.log(err);
      } else {
          res.render("comments/new", {camp: camp});
      }
   }); 
});

app.post("/camps/:id/comments", function(req, res){
   Camp.findById(req.params.id, function(err, camp) {
        if (err) {
            console.log(err);
            res.redirect("/camps");
        } else {
            Comment.create(req.body.comment, function(err, comment){
               if (err) {
                   console.log(err);
               } else {
                   camp.comments.push(comment);
                   camp.save();
                   res.redirect("/camps/" + camp._id);
               }
            });
        }
   });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER WORKS");
});