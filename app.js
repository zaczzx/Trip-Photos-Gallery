var app = require("express")();
var bodyParser = require("body-parser");
var campgrounds = [
       {name:"AAA", image: "https://lh3.googleusercontent.com/6yuWTbqdM-8--QBZ2PSr3zzCYunnvSjATp2URCFJNxKtGRpBiOI01CiKXTzOIqHOKsqgne8pQdumcSjYvrdV_eMif19LDulQYig7WkMH4ewYTc_9HXSpl_5V9OMJlMIe6C5FnekMiX-YjsFKbitQiQgG-zH-KvhsBJxl1PYNX7rVTkGZpEbS0hxf3X01AuaTNiyGfxRxqwsYOPtmRuVwz2R_lJq9Jg1KxexB45gMkAOPhKS7XyhhRGiCdPIPbULzzQo9iZRlDcLWAsFiKyd0FH-0yF1sETraVIIYD0k5ReN7yI7RCCN8lijjab-e9ua6-7TYhi3HXvRX6ReEux02fSKJQ8NkrSWwsFvghxb82SiE4zanR9JYs-QR78Z4HanWRIA0gEWZAtiDU9Nb_yVcSzYawhGDN2GLU6UfFkX1XAV8LWruBcnB8pVZcBU2RBvja9krCN1jD4MmzqSCeA4qkuDb-RbA7bn9JVXBUr_0z2wgJSfSTN5xju-AIQxJrfZyuW7Jgrk5pp_xRpo8AO6RGRWkT5NSWdtEBQweHxPdHAjfiptFabjevNkJBKa1Q00fAuk-Ph4XMPLioCQrMPdHTUgEdbRmAcAWGOLdG9Y=w938-h704-no"},
       ];
       
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
   res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampGround = {name:name, image:image}
    campgrounds.push(newCampGround);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER WORKS");
});