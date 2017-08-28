var express = require('express');
var router = express.Router({
    mergeParams: true
});
var Branch = require("../models/branches");
var Join = require("../models/joins");
var Middleware = require("../middleware/index");

/* GET home page. */
router.get("/", function(req, res) {
    Branch.find({ "hidden": false }).exec(function(err, allBranches) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {
                branches: allBranches
            });
        }
    });
});

router.get("/list", function(req, res) {
    if (req.user && req.user.group === "admin") {
        Branch.find({}).populate("joins").exec(function(err, allBranches) {
            if (err) {
                console.log(err);
            } else {
                res.render("ListOverview", {
                    branches: allBranches
                });
            }
        });
    } else {
        Branch.find({ "hidden": false }).populate("joins", "name note").exec(function(err, allBranches) {
            if (err) {
                console.log(err);
            } else {
                res.render("ListOverview", {
                    branches: allBranches
                });
            }
        });
    }
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

router.get("/newBranch", Middleware.isLoggedIn, function(req, res) {
    res.render("newBranch");
});

router.post("/newBranch", Middleware.isLoggedIn, function(req, res) {
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

router.get("/newBranch", Middleware.isLoggedIn, function(req, res) {
    res.render("newBranch");
});

// router.post("/updateBranch", Middleware.isLoggedIn, function(req, res) {
//     var newBranch = req.body.branch;
//     console.log(newBranch)
//     Branch.create(newBranch, function(err) {
//         if (err) {
//             console.log(err)
//         } else {
//             res.redirect("/newBranch")
//         }
//     })
// });

module.exports = router;
