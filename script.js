// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))

const login = document.getElementById('login');
const signup = document.getElementById('signup');


function loginFn() {
    window.location.href = "./login"
}

function signupFn() {
    window.location.href = "./signup"
}


login.addEventListener("click", loginFn);
signup.addEventListener("click", signupFn);
