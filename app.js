var app = require("express")();

app.set("view engine", "ejs");

app.get("/", function(req, res){
   res.render("landing");
});

app.get("/campgrounds", function(req, res){
   var campgrounds = [
       {name:"AAA", image: "https://www.google.com/imgres?imgurl=http%3A%2F%2Fwww.momsteam.com%2Ffiles%2Fimages%2FSummer_camp_tents.jpg&imgrefurl=http%3A%2F%2Fwww.momsteam.com%2Fhealth-safety%2Fpreventing-sexual-abuse-at-summer-camp-five-tips-for-parents&docid=aDcqvbDw_y4MVM&tbnid=w3Vbpzz982tWRM%3A&vet=10ahUKEwjjxLX8k7PZAhWLx4MKHUV8AswQMwj9ASgAMAA..i&w=453&h=265&bih=780&biw=1318&q=camp%20images&ved=0ahUKEwjjxLX8k7PZAhWLx4MKHUV8AswQMwj9ASgAMAA&iact=mrc&uact=8"},
       {name:"BBB", image: "https://www.google.com/imgres?imgurl=http%3A%2F%2Fwww.guntherpublications.com%2Fcore%2Fwp-content%2Fuploads%2F2018%2F01%2Fmanali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg&imgrefurl=http%3A%2F%2Fwww.guntherpublications.com%2Ftop-ten-things-never-knew-camp%2F&docid=3ews9SYc9QgjDM&tbnid=vg-uc64o5pJZxM%3A&vet=10ahUKEwjjxLX8k7PZAhWLx4MKHUV8AswQMwiBAigEMAQ..i&w=1440&h=810&bih=780&biw=1318&q=camp%20images&ved=0ahUKEwjjxLX8k7PZAhWLx4MKHUV8AswQMwiBAigEMAQ&iact=mrc&uact=8"},
       {name:"CCC", image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.asiliaafrica.com%2Fwp-content%2Fuploads%2F2016%2F08%2FNomadic-Camp-guest-tent-new.jpg&imgrefurl=https%3A%2F%2Fwww.asiliaafrica.com%2Feast-africa-safari%2Ftanzania%2Fruaha%2Fkwihala-camp%2F&docid=6ty9LqnQSLm3mM&tbnid=HrLdeisvn0p2rM%3A&vet=10ahUKEwjjxLX8k7PZAhWLx4MKHUV8AswQMwj-ASgBMAE..i&w=436&h=218&bih=780&biw=1318&q=camp%20images&ved=0ahUKEwjjxLX8k7PZAhWLx4MKHUV8AswQMwj-ASgBMAE&iact=mrc&uact=8"}
       ];
    
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER WORKS");
});