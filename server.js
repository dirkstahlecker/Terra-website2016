var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/tweetsdb');

//var redisStore = require('connect-redis')(express);

var app = express();

app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req,res,next){
    req.db = db;
    next();
});


//var routes = require('./routes/index');
//var users = require('./routes/users');
//var twitterfeed = require('./routes/twitterfeed');

//app.use('/users', users);
app.use('/', express.static(__dirname)); //initialize to index.html
app.use('/twitterfeed', express.static(__dirname + '/twitterfeed.html'));
//app.use('/twitterfeed', twitterfeed);


app.post('/twitterfeed', function(req,res) {

	var username = req.body.user_box;
	var password = req.body.password_box;

	//TODO: do something here

	res.sendFile(__dirname + '/twitterfeed.html'); //opens the page
});

app.post('/twitterfeed/newtweet', function(req,res) {
	var tweet = req.body.newTweetInput;
	console.log(tweet);

	var db = req.db;
  	var tweets_list = db.get('tweets_list');

	tweets_list.insert({'body': tweet}, function(err, docs) { 
		console.log(tweets_list);

		if(err) {
			res.send("There was a problem");
		}
		else {
			//res.redirect("/users");
		}
	});
  	
	res.sendFile(__dirname + '/twitterfeed.html'); //refresh page
});



app.listen(8080);
console.log("Listening on port :8080");
