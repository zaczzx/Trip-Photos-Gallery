var express = require("express");
var router  = express.Router();
var Camp    = require("../models/camp");
var Comment    = require("../models/comment");
var middlewareObj = require("../middleware");
var geocoder = require("geocoder");

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
var upload = multer({storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'dxjct4uc3', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

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
router.post("/", middlewareObj.isLoggedIn, upload.single('image'), function(req, res){
    geocoder.geocode(req.body.location, function (err, data) {
        if (err || data.status === 'ZERO_RESULTS') {
            req.flash('error', 'Invalid address, try typing a new address');
            return res.redirect('back');
        }
        cloudinary.uploader.upload(req.file.path, function(result){
            req.body.camp.image = result.secure_url;
            req.body.camp.author = {
                id: req.user._id,
                username: req.user.username
            };
            req.body.camp.lat = data.results[0].geometry.location.lat;
            req.body.camp.lng = data.results[0].geometry.location.lng;
            req.body.camp.location = data.results[0].formatted_address;
            Camp.create(req.body.camp, function(err, newCreated){
               if(err){
                   req.flash('error', err.message);
                   return res.redirect('back');
               } else {
                   res.redirect("/camps/" + newCreated.id);
               }
            });
        });
    });
});

//Camp new
router.get("/new", middlewareObj.isLoggedIn, function(req, res) {
    res.render("camps/new");
});

//Camps show
router.get("/:id", function(req, res) {
    Camp.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
       if (err || !foundCamp) {
           req.flash('error', 'Sorry, that camp does not exist!');
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
router.put("/:id", function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newData = {name: req.body.name, image: req.body.image, description: req.body.description, cost: req.body.cost, location: location, lat: lat, lng: lng};
    Camp.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, camp){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/camps/" + camp._id);
        }
    });
  });
});

//DELETE
router.delete("/:id", middlewareObj.isLoggedIn, middlewareObj.checkUserOwnsCamp, function(req, res){
    Camp.findByIdAndRemove(req.params.id, function(err, foundCamp){
        if(err){
            req.flash("error", "Something went wrong! " + err);
            res.redirect("/camps");
        } else {
            //delete related comments
            Comment.remove({_id: {$in: foundCamp.comments}}, function(err, result){
                if(err){
                    req.flash("error", "Something went wrong! " + err);
                    res.redirect("/camps");
                }
            });
            //delete camp
            foundCamp.remove(function(err, deletedCamp){
                if(err){
                    req.flash("error", "Something went wrong! " + err);
                    res.redirect("/camps");
                } else {
                    req.flash("error", "Camp Successfully Deleted!");
                    res.redirect("/camps");
                }
            });
        }
    });
});

module.exports = router;