var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res) {
	var un = req.body.user_create;
	var pw1 = req.body.password_create;
	var pw2 = req.body.password_create_confirm;

	if (pw1 == pw2 && pw1 != undefined && pw2 != undefined && pw1.match(/\s+/) == null && pw2.match(/\s+/) == null) {
		if (un == undefined) {
			console.error("ERROR: username undefined");
			return false;
		}
		var UserAccount = req.userDB;
		var newUser = new UserAccount({ 'username': un, 'password': pw1 });

		UserAccount.find({username: un}, function(err, users) {
			//prevent duplicate users
			if (users.length >= 1) {
				res.render('index/index', { status: 'duplicate user' });
			}
			else {
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
		});
	}
	else {
		console.log("Passwords don't match");
		res.render('index/index', { status: 'create unsuccessful' });
	}
});

router.get('/', function(req,res){
	res.render('create_user/create_user', {});
});

module.exports = router;
