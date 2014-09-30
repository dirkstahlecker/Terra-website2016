var express = require('express');
var router = express.Router();

/*
router.get('/', function(req, res) {
  var db = req.db;
  var students = db.get('people');
  students.find({}, function(e, docs){
  	res.render('users/index', { title: 'Users', 'individuals': docs });
  });
});
*/


router.post('/create', function(req, res, next) {

	console.log("req:");
	console.log(req);
	
	var username = req.user_box.value;
	var password = req.password_box.value;

	console.log(username);
	console.log(password);
});

module.exports = router;
