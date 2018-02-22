var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Camp            = require("./models/camp"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seed");

var commentRoutes   = require("./routes/comments"),
    campRoutes      = require("./routes/camps"),
    indexRoutes     = require("./routes/index");

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

app.use("/",indexRoutes);
app.use("/camps", campRoutes);
app.use("/camps/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER WORKS");
});