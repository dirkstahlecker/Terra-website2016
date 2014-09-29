var express = require('express');
var app = express();

var routes = require('./routes/index');
var users = require('./routes/users');
var twitterfeed = require('./routes/twitterfeed');

app.use('/users', users);
app.use('/', express.static(__dirname)); //initialize to index.html
//app.use('/twitterfeed', express.static(__dirname + '/twitterfeed.html'));
app.use('/twitterfeed', twitterfeed);

app.post('/twitterfeed', function(req,res) {
	console.log("req:");
	console.log(req);

	var username = req.body.user_box.value;
	var password = req.body.password_box.value;

	console.log(username);
	console.log(password);
});

/*
app.get('/', function(req, res) {
	res.writeHead(200, {"Content-Type": "text/html"});
	//res.write('<html><body>Hello World</body></html>');

	res.end();
}); 
*/

app.listen(8080);
console.log("Listening on port :8080");