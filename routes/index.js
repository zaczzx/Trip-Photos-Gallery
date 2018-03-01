var express     = require("express");
var router      = express.Router();
var passport    = require("passport");
var User        = require("../models/user");

//root 
router.get("/", function(req, res){
   res.render("landing");
});

//sign up form
router.get("/register", function(req, res) {
    res.render("register", {page:'register'});
});

//sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Successfully Signed Up! Nice to meet you " + user.username);
            res.redirect("/camps");
        });
    });
});

//login form
router.get("/login", function(req, res) {
    res.render("login", {page: 'login'});
});

//login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/camps",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: 'Welcome to YelpCamp!'
    }), function(req, res) {
});

//logout
router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "See you later!");
   res.redirect("/camps");
});

module.exports = router;