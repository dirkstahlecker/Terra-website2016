var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var path = require('path');
/*
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/tweetsdb');

var MongoClient = require('mongodb').MongoClient;
*/
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/new_schema_hopefully_work'); //TODO: name this correctly

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

//var mongoStore = require('connect-mongo')(express);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'mntyuioplnbdw34567890okjuy6543ewsxcfgyu89okj'}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//var routes = require('./routes/index');
//var users = require('./routes/users');
//var twitterfeed = require('./routes/twitterfeed');

//app.use('/users', users);
app.use('/', express.static(__dirname)); //initialize to index.html
//app.use('/twitterfeed', express.static(__dirname + '/twitterfeed.html'));
//app.use('/twitterfeed', twitterfeed);

/* var currentSession = new Session({ user: username });
	myTweet.save(function (err, tweet) {
		if (err) return console.error(err);
		console.log("Successfully saved!");
); */

app.post('/twitterfeed', function(req,res) {
	var username = req.body.user_box;
	var password = req.body.password_box;

	//see if user credentials exist in the database
	UserAccount.findOne({'username': username, 'password': password}, {}, function (err, users) {
		if (err) return console.error(err);
		
		//if they do, allow them to access the twitterfeed page
		if (users) {
			req.session.name = username;
			Tweet.find(function (err, tweets) {
				if (err) return console.error(err);
				res.render('twitterfeed/twitterfeed.ejs', { 'tweets': tweets });
			});
		}
		else {
			res.redirect('/');
		}
	});
});

app.get('/twitterfeed/delete', function(req,res) {
	console.log("Deleting");

	//copied directly from twitterfeed new tweet post
	var username = undefined;
	if (req.session != undefined && req.session != null) { //only show feed if there is a user logged in
		username = req.session.name;
		
		Tweet.find({ '_id': _id }).remove(function (err, result) {
			console.log("removing");
		});
	}
	else {
		res.redirect('/'); //back to login screen
	}
});

app.post('/twitterfeed/newtweet', function(req,res) {
	var username = undefined;
	if (req.session != undefined && req.session != null) { //only show feed if there is a user logged in
		username = req.session.name;
		console.log("username: ");
		console.log(username);

		var tweetMessage = req.body.newTweetInput;

		var newTweet = new Tweet({ 'message': tweetMessage, 'username': username });
		newTweet.save(function(err,tweets) {
			if (err) return console.error(err);
			console.log("newTweet.user: ");
			console.log(newTweet.username);

			Tweet.find(function (err, tweets) {
				if (err) return console.error(err);
				console.log("Tweets:");
				console.log(tweets);
				res.render('twitterfeed/twitterfeed.ejs', { 'tweets': tweets });
			});
		});
	}
	else {
		res.redirect('/'); //back to login screen
	}
});

app.post('/', function(req,res) {
	var username = req.body.createUserBox;
	var password = req.body.password1;

    var newUser = new UserAccount({ 'username': username, 'password': password });
    console.log(newUser);
    newUser.save(function (err, user) {
        if (err) {
            console.log("ERROR in saving info to database");
            return console.error(err);
        }
        res.redirect('/');
    });

});



app.listen(8080);
console.log("Listening on port :8080");
