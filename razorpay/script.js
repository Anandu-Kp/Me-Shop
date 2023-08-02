// Link for the documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration

// Add button code documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration#code-to-add-pay-button


document.getElementById("checkoutBtn").onclick = function (e) {
  if (JSON.parse(localStorage.getItem("cartList"))[0] === undefined) {
    alert("You have to add items before checking out");
    return;
  }
  const total = document.getElementById("total");
  const container = document.getElementById("items");
  const checkoutList = document.getElementById("checkout-list");
  var options = {
    key: "rzp_test_xV39ZNbgU1Du4V", // Enter the Key ID generated from the Dashboard
    amount: 300 * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "MyShop Checkout",
    description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    theme: {
      color: "#000",
    },
    image:
      "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
  };
  localStorage.setItem("cartList", JSON.stringify([]));
  total.innerHTML = `<span>Total</span>
                        <span>$0</span>`;
  container.innerHTML = ``;
  checkoutList.innerHTML = ``;

  var rzpy1 = new Razorpay(options);
  rzpy1.open();
  // clear mycart - localStorage
  e.preventDefault();
};
