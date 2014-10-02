function addSingleTweet(tweet) {
	var myTweet = new Tweet({ message: tweet });
	myTweet.save(function (err, tweet) {
		if (err) return console.error(err);
		console.log("Successfully saved!");

	});
}

function addTweet() {
	var tweet = document.newTweetForm.newTweet.value;
	addSingleTweet(tweet);
	showTweets();
}

function showTweets() {
	var div = document.getElementById("twitterfeed");
	div.innerHTML = "<br />";

	Tweet.find(function (err, tweets) {
		if (err) return console.error(err);

		console.log(tweets.message);
	});
/*
	for (var i = 0; i < tweets_list.length; i++) {
		var x = extractMessage(tweets_list[i]);
		var tweet = x[0];
		var num = x[1];
		div.innerHTML += '<div id="tweet_'+num+'>' + tweet + '</div>';
	}
*/
}


/*
		Tweet.find(function (err, tweets) {
			if (err) return console.error(err);
			console.log(tweets);
		});
*/