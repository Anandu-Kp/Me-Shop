if (localStorage.getItem("token") == undefined) window.location.href = "../index.html"

let cartList = JSON.parse(localStorage.getItem("cartList"));
const container = document.getElementById("items");
const checkoutList = document.getElementById("checkout-list");
let total = document.getElementById("total");
const checkoutBtn = document.getElementById("checkoutBtn");
console.log(cartList);

function displayCart() {
    for (product of cartList) {
        let item = document.createElement("div");
        item.className = "item";
        item.id = product.id;
        item.innerHTML = `<div class="image">
                            <img src="${product.image}" alt="Item" />
                        </div>
                        <div class="info">
                        <span>Title : ${product.title}</span>
                        <span>Price : ${product.price}</span>
                        </div>`
        let removeButton = document.createElement("button");
        removeButton.id = "removeBtn";
        removeButton.innerText = "Remove From Cart";
        removeButton.addEventListener("click", removeFromCart);
        item.appendChild(removeButton);
        container.appendChild(item);
    }
    addCheckoutList();
};

// adding checkout list to ui

function addCheckoutList() {
    checkoutList.innerHTML = ``;
    let totalAmount = 0;
    for (product of cartList) {
        let checkoutProduct = document.createElement("div");
        checkoutProduct.className = "checkoutProduct";
        checkoutProduct.innerHTML = ` <span>${product.title}</span>
                                    <span>$${product.price}</span>`;
        checkoutList.appendChild(checkoutProduct);
        totalAmount += product.price;
    }
    total.innerHTML = ` <span>Total</span>
                      <span>$${totalAmount}</span>`
}


function removeFromCart(event) {
    console.log(event.target.parentNode.id);
    let itemId = event.target.parentNode.id;
    for (let i = 0; i < cartList.length; i++) {
        if (cartList[i].id == itemId) {
            console.log(cartList[i]);
            cartList.splice(i, 1);
            break;
        }
    }
    localStorage.setItem("cartList", JSON.stringify(cartList));
    container.removeChild(event.target.parentNode);
    addCheckoutList();
}


// function checkout(event) {
//     // document.getElementById("cart-items").removeChild(event.target);
//     container.innerHTML = ``;
//     checkoutList.innerHTML = ``;
//     alert("Items Purchased Succesfully");
//     total.innerHTML = `<span>Total</span>
//                      <span>$0</span>`;
//     console.log(event.target);
// }


displayCart();