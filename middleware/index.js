var middleware = {};
var Camp    = require("../models/camp"),
    Comment = require("../models/comment"),
    User    = require("../models/user");

middleware.checkUserOwnsCamp = function (req, res, next) {
    if (req.isAuthenticated()){
        Camp.findById(req.params.id, function(err, foundCamp) {
            if (err) {
                req.flash("error", "Camp not found");
                res.redirect("back");
            } else {
                if (foundCamp.author.id.equals(req.user.id) || req.user.isAdmin) {
                    return next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middleware.checkUserOwnsComment = function (req, res, next) {
    if (req.isAuthenticated()){
        Comment.findById(req.params.commentId, function(err, foundComment) {
            if (err) {
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user.id) || req.user.isAdmin) {
                    return next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middleware.checkUserOwnsUser = function (req, res, next) {
    if (req.isAuthenticated()){
        console.log(req.params);
        User.findById(req.params.id, function(err, foundUser) {
            if (err || !foundUser) {
                req.flash("error", "User not found");
                res.redirect("back");
            } else {
                if (foundUser._id.equals(req.user.id) || req.user.isAdmin) {
                    return next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middleware.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need be logged in to do that");
    res.redirect("/login");
};

module.exports = middleware;