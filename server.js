var express = require('express'),
    stats   = require('./stats'),
    pages   = require('./pages'),
    config  = require('./config');


var data = {pages: pages, date: new Date()};

// Define app and middleware
var app = express()
    .use(express.logger('dev'))
    .use(express.favicon())
    .use(express.static(__dirname + '/' + config.root))
    .set('views', config.views.dir)
    .set('view engine', config.views.engine);

app.locals(config.options);

// Define routes
app.get('/',            function(req, res) { res.render('index', data) });
app.get('/stats',       function(req, res) { res.render('stats', data) });
app.get('/screens',     function(req, res) { res.render('screens', data) });
app.get('/hosted',      function(req, res) { res.render('hosted', data) });
app.get('/hardware',    function(req, res) { res.render('hardware', data) });
app.get('/propaganda',  function(req, res) { res.render('propaganda', data) });

app.get('/json/server', function(req, res, next) {
    stats( function (err, stats) {
        if (err) return next(err);
        res.send(stats);
    });
});

// Start
app.listen(3000);