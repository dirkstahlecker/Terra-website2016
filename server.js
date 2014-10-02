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
mongoose.connect('mongodb://localhost/test');

var tweetSchema = mongoose.Schema({
	message: String
});
var userAccountSchema = mongoose.Schema({
	username: String,
	password: String
});

var Tweet = mongoose.model('Tweet',tweetSchema);
var UserAccount = mongoose.model('UserAccount',userAccountSchema);

//var mongoStore = require('connect-mongo')(express);

var app = express();
app.use(session({secret: 'typed on a leopard'}));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*
app.use(function(req,res,next){
    req.db = db;
    next();
});
*/



//var routes = require('./routes/index');
//var users = require('./routes/users');
//var twitterfeed = require('./routes/twitterfeed');

//app.use('/users', users);
app.use('/', express.static(__dirname)); //initialize to index.html
//app.use('/twitterfeed', express.static(__dirname + '/twitterfeed.html'));
//app.use('/twitterfeed', twitterfeed);


app.post('/twitterfeed', function(req,res) {

	var username = req.body.user_box;
	var password = req.body.password_box;

	req.session.name = username;

	//see if user credentials exist in the database
	UserAccount.findOne({'username': username, 'password': password}, {}, function (err, users) {
		if (err) return console.error(err);
		console.log("Users: ");
		console.log(users);

		//if they do, allow them to access the twitterfeed page
		if (users) {
			//res.sendFile(__dirname + '/twitterfeed.html'); //opens the feed page if credentials are valid
			res.render('twitterfeed/twitterfeed.ejs', { tweets: tweets });
		}
		else {
			res.redirect('/');
		}
	});

/*
	var currentSession = new Session({ user: username });
	myTweet.save(function (err, tweet) {
		if (err) return console.error(err);
		console.log("Successfully saved!");

	});
*/
	
});

app.post('/twitterfeed/newtweet', function(req,res) {
	/*
	if (!req.session) {
		//TODO: do something
	}
	else {
		var username = req.session;
		var tweet = req.body.newTweetInput;
		console.log(tweet);

		res.sendFile(__dirname + '/twitterfeed.html'); //refresh page
	}
	*/
	var tweetMessage = req.body.newTweetInput;
	var newTweet = new Tweet({'message': tweetMessage});
	newTweet.save(function(err,tweets) {
		if (err) return console.error(err);
		console.log("Tweet stored to database");

		Tweet.find(function (err, tweets) {
			if (err) return console.error(err);
			console.log("Tweets: ");
			console.log(tweets);

			res.render('twitterfeed/twitterfeed.ejs', { tweets: tweets });

		});
	});

	//res.sendFile(__dirname + '/twitterfeed.html'); //refresh page
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
        /*
        UserAccount.find(function (err, users) {
			if (err) return console.error(err);
			console.log("Users: ");
			console.log(users);
		}); */
    });

	res.redirect('/');
});



app.listen(8080);
console.log("Listening on port :8080");
