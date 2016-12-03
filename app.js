var pmx = require('pmx').init({
    http: true, // HTTP routes logging (default: false)
    http_latency: 200, // Limit of acceptable latency
    http_code: 500, // Error code to track'
    alert_enabled: true, // Enable alerts (If you add alert subfield in custom it's going to be enabled)
    ignore_routes: [/socket\.io/, /notFound/], // Ignore http routes with this pattern (default: [])
    errors: true, // Exceptions loggin (default: true)
    custom_probes: true, // Auto expose JS Loop Latency and HTTP req/s as custom metrics (default: true)
    network: true, // Network monitoring at the application level (default: false)
    ports: true // Shows which ports your app is listening on (default: false)
});
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var User = require("./models/users");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var cookieParser = require('cookie-parser');

// Init
var app = express();
mongoose.connect("mongodb://localhost/defund_dapl");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(require("express-session")({
    secret: "fgdgnlgdfljdfjldgldld",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

// Routes
var index = require('./routes/index');
var auth = require('./routes/auth');

// Routing
app.use('/', index);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
