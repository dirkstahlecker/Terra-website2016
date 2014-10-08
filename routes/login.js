var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
	var username = req.body.user_box;
	var password = req.body.password_box;

	console.log("in login route");

	var UserAccount = req.userDB;
	UserAccount.findOne({ username: username, password: password}, function (err, users) {
		if (err) return console.error(err);

		if (users) {
			req.session.user = username; //set initial session username
			res.render('login/login', { success: true, username: username });
		}
		else {
			res.render('index/index', { status: 'login unsuccessful'});
		}
	});
});

module.exports = router;
