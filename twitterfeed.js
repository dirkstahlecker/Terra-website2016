var tweets_list = ["78&&&testing"]; //"1&&&Tweet1","2&&&Tweet2"


function addSingleTweet(tweet) {
	var num = Math.random();//TODO: make this something
	tweets_list.push(String(num) + '&&&' + tweet);
}

function addTweet() {
	var tweet = document.newTweetForm.newTweet.value;
	
	addSingleTweet(tweet);
	console.log(tweets_list);
	showTweets();
	alert("adding tweet");
}

function extractMessage(tweet) {
	var i = tweet.search("&&&");
	return [tweet.slice(i+3,tweet.length),tweet.slice(0,i+3)];
}


function showTweets() {
	var div = document.getElementById("twitterfeed");
	div.innerHTML = "<br />";

	for (var i = 0; i < tweets_list.length; i++) {
		var x = extractMessage(tweets_list[i]);
		var tweet = x[0];
		var num = x[1];
		div.innerHTML += '<div id="tweet_'+num+'>' + tweet + '</div>';
	}
}
