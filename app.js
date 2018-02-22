var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Camp = require("./models/camp"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seed");
    
mongoose.connect("mongodb://localhost/yelpcamp"); 
app.set("view engine", "ejs");
seedDB();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(require("express-session")({
   secret: "secret",
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

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
    var newCamp = {name:name, image:image, description: description};
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
app.get("/camps/:id/comments/new", isLoggedIn, function(req, res) {
   Camp.findById(req.params.id, function(err, camp){
      if (err) {
          console.log(err);
      } else {
          res.render("comments/new", {camp: camp});
      }
   }); 
});

app.post("/camps/:id/comments", isLoggedIn, function(req, res){
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

app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/camps");
        });
    });
});

app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/camps",
        failureRedirect: "/login"
    }), function(req, res) {
});

app.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/camps");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER WORKS");
});