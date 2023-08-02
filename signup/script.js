// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))

// if (localStorage.getItem("token")) window.location.href = "../shop"

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const signupBtn = document.getElementById("signup");

if (localStorage.getItem("users") == undefined) localStorage.setItem("users", JSON.stringify([]));
let users = JSON.parse(localStorage.getItem("users"));

// for "already user ?login"
// const login=document.getElementById("login");

function userExist(emailValue) {
    let obj = users.find(userObj => {
        return userObj.email === emailValue;
    });
    if (obj) return true;
    else return false;
}
function generateToken() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < 16; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
}

function signupFn(event) {
    event.preventDefault();
    if (firstName.value.trim() == ''
        || lastName.value.trim() == ''
        || email.value.trim() == ''
        || password.value.trim() == ''
        || confirmPassword.value.trim() == '') {
        alert("You should fill all the fields")
    }
    else {
        if (password.value !== confirmPassword.value) {
            alert("passwords are not matching");
            password.value = "";
            confirmPassword.value = "";
        }
        else {
            if (userExist(email.value)) {
                alert("User already exist");
                window.location.href = "../login";
            }
            else {

                const user = {
                    "firstName": firstName.value,
                    "lastName": lastName.value,
                    "email": email.value,
                    "password": password.value,
                }
                users.push(user);
                localStorage.setItem("users", JSON.stringify(users));
                localStorage.setItem("currentUser", JSON.stringify(user));
                const token = generateToken();
                localStorage.setItem("token", token);
                window.location.href = "../profile"
            }
        }
    }

}




signupBtn.addEventListener("click", signupFn);