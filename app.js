var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    flash           = require("connect-flash-plus"),
    User            = require("./models/user");
    
    require('dotenv').config();

var commentRoutes   = require("./routes/comments"),
    campRoutes      = require("./routes/camps"),
    indexRoutes     = require("./routes/index"),
    contactRoutes = require("./routes/contact"),
    userRoutes      = require("./routes/users");
    
var url = process.env.DATABASEURL || "mongodb://localhost/yelpcamp";
mongoose.connect(url); 

app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(require("express-session")({
   secret: "secret",
   resave: false,
   saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.locals.moment = require("moment");
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

if(typeof window != 'undefined'){
  module.exports = require('brace');
  require('brace/mode/javascript');
  require('brace/theme/monokai');
}
// console.log(window);

app.use("/",indexRoutes);
app.use("/camps", campRoutes);
app.use("/camps/:id/comments", commentRoutes);
app.use("/users", userRoutes);
app.use("/contact", contactRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER WORKS");
});