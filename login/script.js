// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))


const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("login");
if (localStorage.getItem("users") == undefined) window.location.href = "../signup";
let users = JSON.parse(localStorage.getItem("users"));

function userExist(emailValue) {
    let obj = users.find(userObj => {
        return userObj.email === emailValue;
    });
    return obj;
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


function loginFn(event) {
    event.preventDefault();
    if (email.value.trim() == "" || password.value.trim() == "") {
        alert("You shold fill all the fields");
    }
    else {
        const user = userExist(email.value);
        if (!user) {
            alert("users doesn't exist , You have to signup");
            window.location.href = "../signup";
        }
        else {
            if (user.password !== password.value) {
                alert("wrong password");
                password.value = "";
            }
            else {
                localStorage.setItem("currentUser", JSON.stringify(user));
                const token = generateToken();
                localStorage.setItem("token", token);
                window.location.href = "../shop"
            }
        }
    }

}



loginBtn.addEventListener("click", loginFn);