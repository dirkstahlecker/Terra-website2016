var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index/index', { status: 'not created' });
});

router.post('/', function(req, res) {
	res.render('index/index', { status: 'not created' });
});

module.exports = router;
