var mongoose              = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: String,
    email:{type: String, unique: true, required: true},
    avatar: {type:String, require:true},
    avatar_id: {type:String, default:"0"},
    displayName: {type: String, require: true},
    bio: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    createdAt: {type: Date, default: Date.now},
    isAdmin: {type:Boolean, default:false}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);