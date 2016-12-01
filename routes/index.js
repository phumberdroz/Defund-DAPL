var express = require('express');
var router = express.Router({
    mergeParams: true
});
var Branch = require("../models/branches");
var Join = require("../models/joins");

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


router.post("/join/:id", function(req, res) {
    Branch.findById(req.params.id, function(err, branch) {
        if (err) {
            console.log(err);
            res.redirect("/customers");
        } else {
            var newJoin = req.body.join;

            Join.create(newJoin, function(err, join) {
                if (err) {
                    console.log(err);
                } else {
                    branch.joins.push(join._id);
                    branch.save();
                    res.redirect('/');
                }
            });

        }
    });

});

module.exports = router;
