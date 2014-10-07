var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	if (req.session.user) {
		var username = req.session.user;

		var Tweet = req.tweetDB;

		Tweet.find(function (err, tweets) {
			if (err) return console.error(err);
			res.render('fritter/fritter.ejs', { tweets: tweets, editing: false });
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
				res.render('fritter/fritter', { tweets: tweets, editing: false });
			});
		});
	}
	else {
		res.redirect('/', { state: 'undefined' }); //back to login screen
	}
});

router.post('/delete', function(req,res) {
	if (req.session != undefined && req.session != null) { //only show feed if there is a user logged in
		var id = req.body.delDataHolder;

		var Tweet = req.tweetDB;
		username = req.session.user;

		//locate the specific tweet to remove, and delete it from mongo
		Tweet.findOne({ '_id': id }, function(err,tweet) {
			if (username == tweet.username) {
				tweet.remove(function() {
					console.log("removed tweet");
					Tweet.find(function (err, tweets) {
						if (err) return console.error(err);
						//return to the updated fritterfeed
						res.render('fritter/fritter', { tweets: tweets, editing: false });
					});
				});
			}
			else { //can't delete tweets from another user
				Tweet.find(function (err, tweets) {
					if (err) return console.error(err);
					//do nothing and return to feed
					res.render('fritter/fritter', { tweets: tweets, editing: false });
				});
			}
		});
	}
	else {
		res.redirect('/', { state: 'undefined' }); //back to login screen
	}
});

router.post('/edit', function(req,res) {
	var Tweet = req.tweetDB;
	if (req.session != undefined && req.session != null) { //only show feed if there is a user logged in
		var id = req.body.editDataHolder;
		var username = req.session.user;
		Tweet.findOne({ '_id': id }, function(err,tweet) {
			if (username == tweet.username) {		
				Tweet.find(function (err, tweets) {
					if (err) return console.error(err);
					//return to the updated fritterfeed
					res.render('fritter/fritter', { tweets: tweets, editing: id });
				});
			}
			else { //can't delete tweets from another user
				Tweet.find(function (err, tweets) {
					if (err) return console.error(err);
					//do nothing and return to feed
					res.render('fritter/fritter', { tweets: tweets, editing: false });
				});
			}
		});
	}
	else {
		res.redirect('/', { state: 'undefined' }); //back to login screen
	}
});

router.post('/edit/update', function(req,res) {
	if (req.session != undefined && req.session != null) { //only show feed if there is a user logged in
		var Tweet = req.tweetDB;
		var newMessage = req.body.editingBox;
		var username = req.session.user;

		var newTweet = new Tweet({ 'message': newMessage, 'username': username });
		newTweet.save(function(err,tweets) {
			if (err) return console.error(err);

			Tweet.find(function (err, tweets) {
				if (err) return console.error(err);
				res.render('fritter/fritter', { tweets: tweets, editing: false });
			});
		});
	}
	else {
		res.redirect('/', { state: 'undefined' }); //back to login screen
	}
});

router.post('/retweet', function(req,res) {
	if (req.session != undefined && req.session != null) { //only show feed if there is a user logged in
		var Tweet = req.tweetDB;
		var id = req.body.retweetDataHolder;
		var username = req.session.user;

		Tweet.findOne({ '_id': id }, function(err,tweet) {
			if (username != tweet.username) { //can't retweet your own tweet
				var message = tweet.message;
				message = 'Retweeted from ' + tweet.username + ': ' + message; //TODO: if already been retweeted, handle
				var reTweet = new Tweet({ 'message': message, 'username': username });

				reTweet.save(function(err,tweets) {
					Tweet.find(function (err, tweets) {
						if (err) return console.error(err);
						//return to the updated fritterfeed
						res.render('fritter/fritter', { tweets: tweets, editing: false });
					});
				});
			}
			else { //can't delete tweets from another user
				Tweet.find(function (err, tweets) {
					if (err) return console.error(err);
					//do nothing and return to feed
					res.render('fritter/fritter', { tweets: tweets, editing: false });
				});
			}
		});
	}
	else {
		res.redirect('/', { state: 'undefined' }); //back to login screen
	}
});

module.exports = router;
