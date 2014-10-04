///////////////////// Overall requirements and connections
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongo = require('mongodb');
//var monk = require('monk');
//var db = monk('localhost:27017/fritterdb1');
var mongoose = require('mongoose');

var connection_string = 'localhost/mymongo';
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + '@' +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/mymongo';
}
mongoose.connect(connection_string);



///////////////////// Configure database
var tweetSchema = mongoose.Schema({
    message: String,
    username: String
});
var userAccountSchema = mongoose.Schema({
    username: String,
    password: String
});

var Tweet = mongoose.model('Tweet',tweetSchema);
var UserAccount = mongoose.model('UserAccount',userAccountSchema);



///////////////////// Routing
var index = require('./routes/index');
var fritter = require('./routes/fritter');
var login = require('./routes/login')
var create_user = require('./routes/create_user');

var app = express();

app.use(function(req,res, next){
    req.userDB = UserAccount;
    req.tweetDB = Tweet;
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/fritter', fritter);
app.use('/', index);
app.use('/login', login);
app.use ('/create_user', create_user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});




///////////////////// Error handling
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

app.listen(process.env.OPENSHIFT_NODEJS_PORT || 8080, process.env.OPENSHIFT_NODEJS_IP);
console.log("Listening on port 8080");
