var middlewareObj = {};
var Camp = require("../models/camp");
var Comment = require("../models/comment");

middlewareObj.checkUserOwnsCamp = function (req, res, next) {
    if (req.isAuthenticated()){
        Camp.findById(req.params.id, function(err, foundCamp) {
            if (err) {
                res.redirect("back");
            } else {
                if (foundCamp.author.id.equals(req.user.id)) {
                    return next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
};

middlewareObj.checkUserOwnsComment = function (req, res, next) {
    if (req.isAuthenticated()){
        Comment.findById(req.params.commentId, function(err, foundComment) {
            if (err) {
                res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user.id)) {
                    return next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = middlewareObj;