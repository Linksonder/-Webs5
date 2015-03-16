var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var exphbs  = require('express3-handlebars');

var configDB = require('./config/database');

//Connect to the databbase
mongoose.connect(configDB.url);


//Require all the models
//------------------------MODELS----------------------
require('./models/User');
require('./models/Room');

//Require all the routes
//------------------------ROUTES----------------------
var routes = require('./routes/index');
var users = require('./routes/users');
var rooms = require('./routes/rooms');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev')); //logt alle gegevens over inkomende requests
app.use(bodyParser.json()); //zorgt ervoor dat alle post values beschikbaar zijn via de req.body in json format
app.use(bodyParser.urlencoded({ extended: false })); //???? url met %20 worden spaties ??????
app.use(cookieParser()); //Maakt cookies beschikbaar vanuit node ??? request.cookies ????
app.use(express.static(path.join(__dirname, 'public'))); //serveert eventuele static folders ipv node.



console.log(path.join(__dirname, 'public'));

app.use('/', routes);
app.use('/users', users);
app.use('/rooms', rooms);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log(__dirname);
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
