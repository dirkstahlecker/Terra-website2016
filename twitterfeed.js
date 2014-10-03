//deletes a tweet from the database
function deleteTweet(_id) {
	console.log("_id: ");
	console.log(_id);
	Tweet.find({ '_id': _id }).remove(function (err, result) {
		console.log("removing");
	});
}