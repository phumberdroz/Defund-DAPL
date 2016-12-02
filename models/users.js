var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    group: { type: String, default: "user" },
    password: String
});


UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
