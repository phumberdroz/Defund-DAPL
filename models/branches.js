var mongoose = require("mongoose");

var BranchSchema = mongoose.Schema({
    name: String,
    lat: {
        type: String,
        unique: true,
        dropDups: true
    },
    lng: {
        type: String,
        unique: true,
        dropDups: true
    },
    address: String,
    openinghours: String,
    info: String,
    joins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Join'
    }]
});

module.exports = mongoose.model("Branch", BranchSchema);
