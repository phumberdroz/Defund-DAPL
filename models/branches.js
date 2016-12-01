var mongoose = require("mongoose");

var BranchSchema = mongoose.Schema({
    name: String,
    lat: String,
    lng: String,
    address: String,
    openinghours: String,
    info: String,
    joins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Join'
    }]
});

module.exports = mongoose.model("Branch", BranchSchema);
