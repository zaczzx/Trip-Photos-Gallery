var express     = require("express");
var router      = express.Router({mergeParams: true});
var Camp        = require("../models/camp");
var Comment     = require("../models/comment");

//Comment new
router.get("/new", isLoggedIn, function(req, res) {
   Camp.findById(req.params.id, function(err, camp){
      if (err) {
          console.log(err);
      } else {
          res.render("comments/new", {camp: camp});
      }
   }); 
});

//Comment create
router.post("/", isLoggedIn, function(req, res){
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

//middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;