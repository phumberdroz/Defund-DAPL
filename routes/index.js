var express = require('express');
var router = express.Router({
    mergeParams: true
});
var Branch = require("../models/branches");

/* GET home page. */
router.get("/", function(req, res) {
    Branch.find({}).exec(function(err, allBranches) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {
                branches: allBranches
            });
        }
    });
});

router.get("/newBranch", function(req, res) {
    res.render("newBranch");
});
router.post("/newBranch", function(req, res) {
    var newBranch = req.body.branch;
    console.log(newBranch)
    Branch.create(newBranch, function(err) {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/newBranch")
        }
    })
});


module.exports = router;
