/*var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.write('<html><head></head><body><form name="loginform" onSubmit="return validateForm();" action="authenticate.js" method="post"><label>User name</label><input type="text" name="usr" placeholder="username"> <label>Password</label><input type="password" name="pword" placeholder="password"><input type="submit" value="Log in"/></form><script>function validateForm() {var un = document.loginform.usr.value;var pw = document.loginform.pword.value;var username = "username"; var password = "password";if ((un == username) && (pw == password)) {return true;}else {alert ("Login failed, please check your username and password");return false;}}</script></body></html>');
});

module.exports = router;
*/