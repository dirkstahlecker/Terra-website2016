function validateLogin() {
    var un = document.loginForm.user_box.value;
    var pw = document.loginForm.password_box.value;
    var credentials = [{un: "username", pw: "password"}, {un: "dirk", pw: "stahlecker"}];

    for (var i = 0; i < credentials.length; i++) {
        var c = credentials[i];
        if ((un == c.un) && (pw == c.pw)) {
            return true;
        }
    }
    alert ("Login failed - please check your username and password");
    return false;
}

function validateCreateUser() {
    var un = document.createUserForm.user_box.value;
    var pw1 = document.createUserForm.password1.value;
    var pw2 = document.createUserForm.password2.value;

    if (pw1 == pw2 && pw1 != '') {
        return true;
    }
    alert("Account creation failed - passwords don't match");
    return false;
}
