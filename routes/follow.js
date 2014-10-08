var express = require('express');
var router = express.Router();


router.get('/', function(req,res) {
	if (req.session != undefined && req.session != null) { //only show feed if there is a user logged in
		var UserAccount = req.userDB;
		var username = req.session.user;
		UserAccount.findOne({username: username}, function(err, user){
			res.render('follow/follow', {username: username, user: user});
		});
	}
	else {
		res.redirect('/', { state: 'undefined' }); //back to login screen
	}
});


module.exports = router;
