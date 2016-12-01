var mongoose = require("mongoose");

var JoinSchema = mongoose.Schema({
    name: String,
    time: Date,
    info: String,
});

module.exports = mongoose.model("Join", JoinSchema);