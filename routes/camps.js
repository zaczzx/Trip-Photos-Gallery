var express = require("express");
var router  = express.Router();
var Camp    = require("../models/camp");

//index
router.get("/", function(req, res){
    Camp.find({},function(err, allCamps){
       if (err) {
           console.log(err);
       } else {
           res.render("camps/index", {camps:allCamps});
       }
    });
});

//Camp create
router.post("/", isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCamp = {name:name, image:image, description: description, author:author};
    Camp.create(newCamp, function(err, newCreated){
       if(err){
           console.log(err);
       } else {
           console.log(newCreated);
           res.redirect("/camps");
       }
    });
});

//Camp new
router.get("/new", isLoggedIn, function(req, res) {
    res.render("camps/new");
});

//Camps show
router.get("/:id", function(req, res) {
    Camp.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
       if (err) {
           console.log(err);
       } else {
           console.log(foundCamp);
           res.render("camps/show", {camp: foundCamp});
       }
    });
});

//middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;