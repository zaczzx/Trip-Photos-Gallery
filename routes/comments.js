var express     = require("express");
var router      = express.Router({mergeParams: true});
var Camp        = require("../models/camp");
var Comment     = require("../models/comment");
var middleware = require("../middleware");

//Comment new
router.get("/new", middleware.isLoggedIn, function(req, res) {
   Camp.findById(req.params.id, function(err, camp){
      if (err) {
          console.log(err);
      } else {
          res.render("comments/new", {camp: camp});
      }
   }); 
});

//Comment create
router.post("/", middleware.isLoggedIn, function(req, res){
   Camp.findById(req.params.id, function(err, camp) {
        if (err) {
            console.log(err);
            res.redirect("/camps");
        } else {
            Comment.create(req.body.comment, function(err, comment){
               if (err) {
                   console.log(err);
               } else {
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   comment.save();
                   camp.comments.push(comment);
                   camp.save();
                   console.log(comment);
                   res.redirect("/camps/" + camp._id);
               }
            });
        }
   });
});

//COMMENT Edit
router.get("/:commentId/edit", middleware.checkUserOwnsComment, function(req, res){
    Comment.findById(req.params.commentId, function(err, foundComment) {
       if (err) {
           res.redirect("back");
       } else {
           res.render("comments/edit", {camp_id: req.params.id, comment: foundComment});
       }
    });
});

//COMMENT Update
router.put("/:commentId", middleware.checkUserOwnsComment, function(req, res){
    Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function(err, updatedComment){
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/camps/" + req.params.id);
        }
    });
});

//COMMENT Delete
router.delete("/:commentId", middleware.checkUserOwnsComment, function(req, res){
    Comment.findByIdAndRemove(req.params.commentId, function(err){
        if (err) {
            res.redirect("back");
        } else {
            Camp.findByIdAndUpdate(req.params.id, {
                $pull: {comments: req.params.commentId}
            }, function(err, data){
                if(err){
                    req.flash("error", "Could not DELETE comment!");
                    console.log(err);
                } else {
                    req.flash("success", "COMMENT SUCCESSFULLY DELETED!");
                    res.redirect("/camps/" + req.params.id);
                }
            });
        }
    });
});

module.exports = router;