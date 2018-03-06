var express = require("express"),
    router = express.Router();

var User = require("../models/user"),
    Camp = require("../models/camp"),
    Comment = require("../models/comment");

var middleware = require("../middleware");

var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({storage: storage, fileFilter: imageFilter});

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

router.get("/:id", function (req, res) {
    User.findById(req.params.id, function (err, foundUser) {
        if (err) {
            req.flash("error", "Something went wrong.");
            return res.redirect("/");
        }
        Camp.find().where('author.id').equals(foundUser._id).exec(function (err, camps) {
            if (err) {
                req.flash("error", "Something went wrong.");
                return res.redirect("/");
            }
            res.render("users/show", { user: foundUser, camps: camps, page: 'profile' });
        });
    });
});

router.put("/:id", middleware.isLoggedIn, middleware.checkUserOwnsUser, upload.single("avatar"), function(req, res){
   if (req.file) {
        User.findById(req.params.id, function(err, foundUser) {
            if (err) {
                req.flash("error", "Something went wrong.");
                return res.redirect("back");
            }
            eval(require('locus'));
            if (! foundUser.avatar_id === "0") {
                cloudinary.v2.uploader.destroy(foundUser.avatar_id, function(err, result){
                    if(err) {
                      req.flash('error', err.message);
                      return res.redirect('back');
                    }
                });    
            }
            cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
                if(err) {
                    req.flash('error', err.message);
                    return res.redirect('back');
                }
                req.body.user.avatar = result.secure_url;
                req.body.user.avatar_id = result.public_id;
                User.findByIdAndUpdate(req.params.id, req.body.user, function(err) {
                    req.flash('success','Successfully Updated!');
                    res.redirect('/users/' + foundUser._id);
                });
            });
        });
    } else {
        User.findByIdAndUpdate(req.params.id, req.body.user, function(err) {
          req.flash('success','Successfully Updated!');
          res.redirect('/users/' + req.params.id);
        });
    }
});

router.delete("/:id", middleware.isLoggedIn, middleware.checkUserOwnsUser, function (req, res) {
    User.findById(req.params.id, function (err, foundUser) {
        if (err) {
            req.flash("error", "Something Has Gone Wrong");
            res.render('back');
        } else {
            Camp.find().where('author.id').equals(foundUser._id).remove().exec(function (err) {
                if (err) {
                    console.log("camps removed");
                    req.flash("error", "Something went wrong.");
                    return res.redirect("/camps");
                }
            });
            Comment.find().where('author.id').equals(foundUser._id).remove().exec(function (err) {
                if (err) {
                    console.log("comments removed");
                    req.flash("error", "Something went wrong.");
                    return res.redirect("/camps");
                }
            });
            foundUser.remove(function(err){
                if(err){
                    req.flash("error", "Something went wrong! " + err);
                    return res.redirect("/camps");
                }
                req.flash("success", "Your Account Has Been Successfully Deleted");
                res.redirect("/camps");
            });
        }
    });
});

module.exports = router;


