var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	if (req.session.user) {
		var username = req.session.user;

		var Tweet = req.tweetDB;

		Tweet.find(function (err, tweets) {
			if (err) return console.error(err);
			res.render('fritter/fritter.ejs', { tweets: tweets });
		});

	}
	else {
		res.render('/', { state: 'undefined'});
	}
});

router.post('/new', function(req,res) {
	var username = undefined;
	if (req.session != undefined && req.session != null) { //only show feed if there is a user logged in
		username = req.session.user;
		console.log("username: ");
		console.log(username);

		var tweetMessage = req.body.newTweetInput;
		var Tweet = req.tweetDB;

		var newTweet = new Tweet({ 'message': tweetMessage, 'username': username });
		newTweet.save(function(err,tweets) {
			if (err) return console.error(err);

			Tweet.find(function (err, tweets) {
				if (err) return console.error(err);
				console.log("Tweets:");
				console.log(tweets);
				res.render('fritter/fritter', { 'tweets': tweets });
			});
		});
	}
	else {
		res.redirect('/', { state: 'undefined' }); //back to login screen
	}
});

router.post('/delete', function(req,res) {
	if (req.session != undefined && req.session != null) { //only show feed if there is a user logged in
		var id = req.body.dataHolder;

		var Tweet = req.tweetDB;
		username = req.session.user;

		//locate the specific tweet to remove, and delete it from mongo
		Tweet.findOne({ '_id': id }).remove(function() {
			console.log("removed tweet");
			Tweet.find(function (err, tweets) {
				if (err) return console.error(err);
				console.log("Tweets:");
				console.log(tweets);
				//return to the updated fritterfeed
				res.render('fritter/fritter', { 'tweets': tweets });
			});
		});
	}
	else {
		res.redirect('/', { state: 'undefined' }); //back to login screen
	}
});

module.exports = router;
