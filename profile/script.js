// Write your script here
if (localStorage.getItem("token") == undefined) window.location.href = "../index.html";

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const saveInfoBtn = document.getElementById("saveInfo");
const oldPassword = document.getElementById("oldPassword");
const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");
const updatePasswordBtn = document.getElementById("updatePassword");

const logout = document.getElementById("logout");

let users = JSON.parse(localStorage.getItem("users"));
let currentuser = JSON.parse(localStorage.getItem("currentUser"));



firstName.value = currentuser.firstName;
lastName.value = currentuser.lastName;

function findUser() {
    let obj = users.find(userObj => {
        return currentuser.email === userObj.email;
    })
    return obj;
}


function saveInfoFn(event) {
    event.preventDefault();
    if (firstName.value.trim() == "" || lastName.value.trim() == "") {
        alert("you should fill all the fields");
    }
    else {
        let user = findUser();
        user.firstName = firstName.value;
        user.lastName = lastName.value;
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(user));
        console.log(firstName.value, lastName.value, user);
    }
}

function updatePasswordFn(event) {
    event.preventDefault();
    if (oldPassword.value.trim() == "" || newPassword.value.trim() == "" || confirmPassword.value.trim() == "") {
        alert("you should fill all the fields");
    }
    else {

        if (newPassword.value !== confirmPassword.value) {
            alert("passwords are not matching");
            newPassword.value = "";
            confirmPassword.value = "";
        }
        else {
            if (currentuser.password !== oldPassword.value) {
                alert("password is incorrect");
                oldPassword.value = "";
            }
            else {
                let user = findUser();
                user.password = newPassword.value;
                localStorage.setItem("users", JSON.stringify(users));
                localStorage.setItem("currentUser", JSON.stringify(user));
                newPassword.value = "";
                oldPassword.value = "";
                confirmPassword.value = "";
            }
        }
    }
}

function logoutFn(event) {
    event.preventDefault();
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    window.location.href = "../index.html"
}



saveInfoBtn.addEventListener("click", saveInfoFn);
updatePasswordBtn.addEventListener("click", updatePasswordFn);
logout.addEventListener("click", logoutFn)