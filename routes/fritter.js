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

module.exports = router;
