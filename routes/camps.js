var express = require("express");
var router  = express.Router();
var Camp    = require("../models/camp");
var middlewareObj = require("../middleware");

//index
router.get("/", function(req, res){
    Camp.find({},function(err, allCamps){
       if (err) {
           console.log(err);
       } else {
           res.render("camps/index", {camps:allCamps, page:'camps'});
       }
    });
});

//Camp create
router.post("/", middlewareObj.isLoggedIn, function(req, res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCamp = {name:name, price:price, image:image, description: description, author:author};
    Camp.create(newCamp, function(err, newCreated){
       if(err){
           console.log(err);
       } else {
           res.redirect("/camps");
       }
    });
});

//Camp new
router.get("/new", middlewareObj.isLoggedIn, function(req, res) {
    res.render("camps/new");
});

//Camps show
router.get("/:id", function(req, res) {
    Camp.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
       if (err) {
           console.log(err);
       } else {
           res.render("camps/show", {camp: foundCamp});
       }
    });
});

//EDIT
router.get("/:id/edit", middlewareObj.checkUserOwnsCamp, function(req, res) {
    Camp.findById(req.params.id, function(err, foundCamp){
        if (err) {
            res.redirect("/camps");
        } else {
            res.render("camps/edit", {camp: foundCamp});
        }
    });
});

//UPDATE
router.put("/:id", middlewareObj.checkUserOwnsCamp, function(req, res){
    Camp.findByIdAndUpdate(req.params.id, req.body.camp, function(err, updatedCamp){
       if (err) {
           res.redirect("/camps");
       } else {
           res.redirect("/camps/" + req.params.id);
       }
    }); 
});

//DELETE
router.delete("/:id", middlewareObj.checkUserOwnsCamp, function(req, res){
   Camp.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            res.redirect("/camps");
        } else {
            res.redirect("/camps");
        }
   });
});

module.exports = router;