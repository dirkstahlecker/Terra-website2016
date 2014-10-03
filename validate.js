function validateLogin() {
    var username = document.loginForm.user_box.value;
    var password = document.loginForm.password_box.value;
    /*
    UserAccount.findOne({'username': username, 'password': password}, {}, function(err,user) {
        if(err) return console.error(err);
        alert(user);
        if (user) {
            console.log("User validated");
            return true;
        }
        else {
            console.log("User not validated");
            alert ("Login failed - please check your username and password");
            return false;
        }
    });
    */
}

function validateCreateUser() {
    var un = document.createUserForm.user_box.value;
    var pw1 = document.createUserForm.password1.value;
    var pw2 = document.createUserForm.password2.value;

    if (pw1 == pw2 && pw1 != '') {
        return true;
    }
    else {    
        alert("Account creation failed - passwords don't match");
        return false;
    }
}



