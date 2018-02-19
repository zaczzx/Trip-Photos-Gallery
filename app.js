var app = require("express")();

app.set("view engine", "ejs");

app.get("/", function(req, res){
   res.render("landing");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER WORKS");
});