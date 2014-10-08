function validateLogin() {
    var username = document.loginForm.user_box.value;
    var password = document.loginForm.password_box.value;
}
/*
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
*/

function validateCreateUser() { 
    var un = $("#user_create").value;
    var pw1 = $("#password_create").value;
    var pw2 = $("#password_create_confirm").value;
    console.log("validating create user");
    alert(pw1);
    alert(pw2);
    if (pw1 == pw2 && pw1 != '' && pw1 != undefined) {
        console.log('returning true');
        return true;
    }
    else {    
        alert("Account creation failed - passwords don't match"); //TODO: replace this alert
        return false;
    }
}