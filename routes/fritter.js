var express = require('express');
var router = express.Router();

/*
Takes in a list of tweets, and removes those that
are not by a user that we follow
*/
function filterFollowing(tweets, following) {
	var ret = []; //the filtered list to return
	console.log("filtering");
	for(var i = 0; i < tweets.length; i++) {
		tweet = tweets[i];
		console.log(tweet.username);
		var otherUser = tweet.username;
		//if (following.indexOf(otherUser) != -1) {
		for(var j = 0; j < following.length; j++) {
			currentUser = following[j];
			if(currentUser == otherUser) {
				ret.push(tweet);
			}
		}
	}
	return ret;
}

router.get('/', function(req, res) {
	if (req.session.user) {
		var username = req.session.user;
		var Tweet = req.tweetDB;
		var UserAccount = req.userDB;

		UserAccount.findOne({ username: username }, function (err, user) {
			if (err) return console.error(err);

			Tweet.find(function (err, tweets) {
				if (err) return console.error(err);
				var following = user.following;
				tweets = filterFollowing(tweets,following);
				console.log("tweets:");
				console.log(tweets);
				res.render('fritter/fritter.ejs', { tweets: tweets, editing: false });
			});
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
	if (req.session != undefined && req.session != null) { //only show feed if there is a user logged in
		var Tweet = req.tweetDB;
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
				if (message.match(/Retweeted from /)) { //already been retweeted - only display most recent retweet
					//therefore remove "Retweeted from ______"
					message.replace(/Retweeted From /,'');
					var loc = message.match(/.* /);
					message = message.substring(loc,message.length);
				}
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


router.post('/follow', function(req,res) {
	if (req.session != undefined && req.session != null) { //only show feed if there is a user logged in
		var Tweet = req.tweetDB;
		var username = req.session.user;
		var toFollow = req.body.toFollowInput;
		var UserAccount = req.userDB;

		UserAccount.findOne({ username: username }, function (err, user) {
			if (err) return console.error(err);
			if (user != undefined) {
				//need to delete then re-add record
				var password = user.password;
				var following = user.following;
				if(following.indexOf(toFollow) != -1) { //not already following
					following.push(toFollow);
					user.remove(function() {
						var newUser = new UserAccount({ username: username, password: password, following: following});
						newUser.save(function(err,tweets) {
							if(err) return console.error(err);
							Tweet.find(function (err, tweets) {
								if (err) return console.error(err);
								//do nothing and return to feed
								res.render('fritter/fritter', { tweets: tweets, editing: false });
							});
						});
					});
				}
				else { //already following user
					Tweet.find(function (err, tweets) {
						if (err) return console.error(err);
						//do nothing and return to feed
						res.render('fritter/fritter', { tweets: tweets, editing: false });
					});
				}
			}
			else { //user doesn't exist
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
