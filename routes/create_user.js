var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res) {
	var un = req.body.user_create;
	var pw1 = req.body.password_create;
	var pw2 = req.body.password_create_confirm;

	if (pw1 == pw2 && pw1 != '' && pw1 != undefined && pw2 != undefined) { //TODO: don't match any combination of spaces
		if (un == undefined) {
			console.log("ERROR: username undefined");
			return false;
		}
		var UserAccount = req.userDB;
		var newUser = new UserAccount({ 'username': un, 'password': pw1 });
		console.log("username: ");
		console.log(un);
		console.log("password:");
		console.log(pw1);
		newUser.save(function (err, user) {
			if (err) {
				console.log("ERROR in saving info to database");
				res.render('index/index', { status: 'create unsuccessful' });
				return console.error(err);
			}
			
			UserAccount.find(function (err, users) {
				if (err) return console.error(err);
				console.log("Users in database:");
				console.log(users);
				res.render('index/index', { status: 'create successful' });
			});
		});
	}
	else {
		console.log("Passwords don't match");
		res.render('index/index', { status: 'create unsuccessful' });
	}
});

module.exports = router;
