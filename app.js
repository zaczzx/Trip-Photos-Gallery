var app = require("express")();
var bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelpcamp"); 

var campSchema = new mongoose.Schema({
   name: String,
   image: String
});

var Camp = mongoose.model("Camp",campSchema);

Camp.remove({name:"POKEMON"}, function(err){
    if (err) console.log(err);
    else console.log("REMOVED")
});

// var camps = [
//       {name:"POKEMON", image: "https://lh3.googleusercontent.com/_-qtYi-iHic3pLjel-gbdVI1-i-Zyd6-pBOLYTu5tO5rKcxCQnQ540hK81GE1Iy17eFUG5aILtqgSB8lD5IG7CmSQsy_WbjkmjVOJZY64Jb1rQB2wKWCnCB0jteZaRRuFpGxXdJfB5UOR_UbIxegcDLpPYRqRsQo3CwMp5llFqci9LzkYuFLYYviB5JKma2EmPpuhbDElKApw-eMYJGU-VZ03s-TyaeJRRZOuVYsxBigxBOdsy80JeWCQjtoDfUht3fQDrrsKDVtnSPP38seeSfMCHIUhbDQbqIK2PMP8Bsqm3m_CzchDqsOLe8YPUFJ92rvO9J9z0c_12SyuXXxEsF2D8Li3FGBPOwTsMAHCuCbd95Ye6ISeQaR_P4pfRMRT0-p2xTKmeX1tTw-JXqJjMJ5M3VfpZfQbWVQV-IW0glck7hr6s8fwG5rhYFzDIqjcb1jy_ir-v_fSXncIU_iZG4PcDJvsMeVenL1UxjP0pOi5E3prOdoVi2P89o4CGD5MrPCdh5FGUfoJz8fVui80-h48cMIGHVPk3ujKuI0wLcSN-lwRtdsZUcWZmR73UlzDqHDZTQcxcVBtR-SXhM0nStZIvFqW-TO-5pXX6A=w2080-h1560-no"},
//       {name:"POKEMON", image: "https://lh3.googleusercontent.com/4yjivhvHqLEGOQLS57yOXROuOjEVmzrCtsWZdeaXKPK3Gj6Dk7ww-qkTQ456kOQyTvRFNdFNARVRZvaeNFxY_8TfBKgXUFsyxp7ewUlShYXXyT2fgFDWlFhr6ZrLgwGIJ9Itoi06kNsFTCOkd3jDISj_HcW9ZZ9dGsrGdi5u8lQXxJGhu0HHDh5wjGjoNIViIeI4rxME7jiA83jfykFykG13jECYBZvvqP_zbf1minq9qcGttCoo8L-29kLXwRWqsPDvNqrod-zMJrbT6eriIYUAQ629h9ZG-GzTqo4n78Ekqfk4iTAWusg1Pbg4Ribz2UIXeie4UuLuydcEbqJPs6Fd_QFpmw3zjC674GWbQGPSUwIkm4PKqt5TMbrscildMJhzO6GApHoEaYt3yGkST2Raadt76-kzWbD46CpawTjPpl2u25FAjhjYxRWNpZWYOftwUx9-Hjwi4psOg4uxx6YO-2aqiXTK_oaBKl2wNTp4d3xbgkVLoXk7KGiHOZ9bSMkppzQ1nzgCAZK_-lmedNWz4Ck3hWL609WDO2wH7M3KiDy80sAx38N5pCz_t-omNv4y_1revpQxRY5IG-dd73BSSOFvls0IDj4CCs8=w2080-h1560-no"},
//       {name:"POKEMON", image: "https://lh3.googleusercontent.com/MigxHeWtr8i2rbB_58B2sEf2OcEzNuxlrRkLKvodwrVAunSdjCGR4lA-aIM37Y8rYuzOK_PjgydHg1f7_Y9GjFodjtPIZET7WPx4y0Jht12ob4-igF0caKg-nIs9XOd59bE4f1RAGuYrIKRnz-5mOjhaZ5huySS9UMgsSCRPxia6tlLOqRl2TRNVEpzD-UqA83FM7nAiKPGkPVTCCRXAPw65CvvL6fkCVgBRY0mY6Vzq-iidH8_Om8flleqzpd8IcJNRchNBA-ajyu3MsqKw6rh5oOhSu9lh6asVhHEnI8WWT1aCILvVP6eLD91vL188zTA4z-jksJxBq1lLGESttlUEjl0d8ucxUNbj2N6tyF4d1nnKNwtWek-6UYiwKhvofiKIMSD1xdcYC1x6WsxNydIWpuz0Lm6lBViQF6SSAAvQtPs5SglQ2ZQL6i2uzdp43MoZL0OfKusKKSrLGz9fpEVbpeXq1zhid5lkgMn4IBx4J1S_LXXH-Jxqn062bN3mH4bGWpg3fD0UpTZOSAY4mGrvqzc1Cpmmx24hj7S89s1Tnj6PQo9HfkMQ4yyoR7miImcChhXYxDVcL7fAuUtSr_fC6f0XDeCxWbxBo60=w2080-h1560-no"},
//       {name:"POKEMON", image: "https://lh3.googleusercontent.com/_-qtYi-iHic3pLjel-gbdVI1-i-Zyd6-pBOLYTu5tO5rKcxCQnQ540hK81GE1Iy17eFUG5aILtqgSB8lD5IG7CmSQsy_WbjkmjVOJZY64Jb1rQB2wKWCnCB0jteZaRRuFpGxXdJfB5UOR_UbIxegcDLpPYRqRsQo3CwMp5llFqci9LzkYuFLYYviB5JKma2EmPpuhbDElKApw-eMYJGU-VZ03s-TyaeJRRZOuVYsxBigxBOdsy80JeWCQjtoDfUht3fQDrrsKDVtnSPP38seeSfMCHIUhbDQbqIK2PMP8Bsqm3m_CzchDqsOLe8YPUFJ92rvO9J9z0c_12SyuXXxEsF2D8Li3FGBPOwTsMAHCuCbd95Ye6ISeQaR_P4pfRMRT0-p2xTKmeX1tTw-JXqJjMJ5M3VfpZfQbWVQV-IW0glck7hr6s8fwG5rhYFzDIqjcb1jy_ir-v_fSXncIU_iZG4PcDJvsMeVenL1UxjP0pOi5E3prOdoVi2P89o4CGD5MrPCdh5FGUfoJz8fVui80-h48cMIGHVPk3ujKuI0wLcSN-lwRtdsZUcWZmR73UlzDqHDZTQcxcVBtR-SXhM0nStZIvFqW-TO-5pXX6A=w2080-h1560-no"},
//       {name:"POKEMON", image: "https://lh3.googleusercontent.com/IIXaQnNT5xq0_nAyjaLtV3H9_VlMHo1eSTE-rqmr73NqEzgFBP1xiyCFg7J1onoUHqqs4ICYQh0EG3qALKMPQen0MktaVhrQggZlswC7dQLdXqXVE-gOz-LDCLZbRG7MvXutxX4EHCe525lxDbGRsaR2X_vsekDYRr0wlVypnAl9vu0Sm55EO3bKq_iQsC2wz6diESqC7eGdebMUZso3WO1HEQZAxE6jhA3mz74sSo1DbokROkvszLzQTgWyav9EuQmYO7dg9VjiRiIuVtr6NL1W8s7G3frNVa4LaQPnB4iJHOthOR0m4aHN3OF5H2ofGCZI4w5Y0UeeEMB9C0alO6TX2FSq058urgG9OZGWRthR05dbPHlxHZ7lBEitMMfkICTNNI9WcE7rFR89-3zgx2VuCGs47uQF2zB5F5EcqClOSrG3TMZnd8vqQH6Jl8QM_JvIcl1V_j9EDnia8ZHMKr7la6wBACZfo2gjuNWX7Uct27AKz8jaELOVB7W70TkauAt0zDyqMVbJDBdzUMhAZMHDwBDtlHIN91iHbanj1YAB6uBDIZsZ-O74AemB0iH594As5BflbhRntse6xBJyuIAlnFyJUW9QXsOrM4s=w800-h600-no"},
//       {name:"POKEMON", image: "https://lh3.googleusercontent.com/EczBR6jSi6gwmRhfjzOHK4iqRXJr9u0aAjoIbF0tQNCMqOyk2JNDx4n_AZTjzaWqqjXP1Wj3hfqN4YxCvT4HsJxuMeHYWHhpE3J_xNcqKVQT51u26cHCWutxCrYKeUCldhxkimkl77BUuPxDSqZbvsDPBgNtJLvw_MdHdwCaiy6w76MoLeoPbRH1_kwpwoDPv9aZK5j4Hj7TPBa9_AIuPIEizy-da_9rUfgf8aow7T_Iz_U6H6huz64oiJQ3G6ONPdxCFMC_qMjMIE_QTC9cDvC5p-ZdcOY6mMoMO5efQjlBI87ZzyjlVfTw5ugsVH_dRnBG1SKMJxMaK2EdnoUxlUM1tIijCkWgO96nhnlVmBIg8OqjCYT_WL2hM8CWOBdNz5gB0grgaeulGb6xzsFKc6UGPQIs4ub-wn6veTGkzEVD_IjnPmDfLh6zVLaZqC8OixYz0qjINu-T6lsRnJyswT2U5OEmru4pN1d1HBe6VrIzHmrhAQVJKvHd-mPfb-L2F9wiEM_kWqdCjmVxu1K2dGCiLIJJC0J19vDH0hJi71EgR1VBqePMfDu28znvf4rptMtgtMDc-0PLnHYmjPX03n0e5U27AFYJ007kHxs=w1280-h960-no"},
//       {name:"POKEMON", image: "https://lh3.googleusercontent.com/4yjivhvHqLEGOQLS57yOXROuOjEVmzrCtsWZdeaXKPK3Gj6Dk7ww-qkTQ456kOQyTvRFNdFNARVRZvaeNFxY_8TfBKgXUFsyxp7ewUlShYXXyT2fgFDWlFhr6ZrLgwGIJ9Itoi06kNsFTCOkd3jDISj_HcW9ZZ9dGsrGdi5u8lQXxJGhu0HHDh5wjGjoNIViIeI4rxME7jiA83jfykFykG13jECYBZvvqP_zbf1minq9qcGttCoo8L-29kLXwRWqsPDvNqrod-zMJrbT6eriIYUAQ629h9ZG-GzTqo4n78Ekqfk4iTAWusg1Pbg4Ribz2UIXeie4UuLuydcEbqJPs6Fd_QFpmw3zjC674GWbQGPSUwIkm4PKqt5TMbrscildMJhzO6GApHoEaYt3yGkST2Raadt76-kzWbD46CpawTjPpl2u25FAjhjYxRWNpZWYOftwUx9-Hjwi4psOg4uxx6YO-2aqiXTK_oaBKl2wNTp4d3xbgkVLoXk7KGiHOZ9bSMkppzQ1nzgCAZK_-lmedNWz4Ck3hWL609WDO2wH7M3KiDy80sAx38N5pCz_t-omNv4y_1revpQxRY5IG-dd73BSSOFvls0IDj4CCs8=w2080-h1560-no"},
//       ];
       
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
   res.render("landing");
});

app.get("/camps", function(req, res){
    Camp.find({},function(err, allCamps){
       if (err) {
           console.log(err);
       } else {
           res.render("camps", {camps:allCamps});
       }
    });
});

app.post("/camps", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCamp = {name:name, image:image}
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
    res.render("new");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER WORKS");
});