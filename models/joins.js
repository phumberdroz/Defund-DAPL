var mongoose = require("mongoose");

var JoinSchema = mongoose.Schema({
    name: String,
    mail: String,
    note: String,
    phone: String,
});

module.exports = mongoose.model("Join", JoinSchema);
