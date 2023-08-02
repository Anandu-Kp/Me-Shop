
if (localStorage.getItem("token") == undefined) window.location.href = "../index.html";

// for search
const search = document.getElementById("search");

// for adding elements to UI
const allResult = document.getElementById("all-result");
const mensResult = document.getElementById("men");
const womensResult = document.getElementById("women");
const jewellaryResult = document.getElementById("jewelery");
const electronicsResult = document.getElementById("electronics");
const container = document.getElementById("container");
let currentCategory = allResult;
let cartList;
if (localStorage.getItem("cartList") == undefined) localStorage.setItem("cartList", JSON.stringify(cartList));

let products;
async function getProducts() {
  let res = await fetch("https://fakestoreapi.com/products");
  products = await res.json();
  addAllProductsToUi();
  console.log(products);
}
getProducts();



// whenever we call click on all it should execute
function addAllProductsToUi(event) {
  currentCategory.style.color = "black";
  currentCategory.style.backgroundColor = "white";
  allResult.style.backgroundColor = "black";
  allResult.style.color = "white";
  currentCategory = allResult;
  container.innerHTML = ``;
  let section1 = addSection("men's clothing");
  container.appendChild(section1);
  let section2 = addSection("women's clothing");
  container.appendChild(section2);
  let section3 = addSection("jewelery");
  container.appendChild(section3);
  let section4 = addSection("electronics");
  container.appendChild(section4);
  console.log(section1);

}

// called from addAllProductsToUi , to add each sections

function addSection(x) {
  let section = document.createElement("section");
  let title = document.createElement("title");
  if (x == "men's clothing") title.innerText = "Men's Clothing";
  else if (x == "women's clothing") title.innerText = "Women's Clothing";
  else if (x == electronics) title.innerText = "Electronics";
  else title.innerText = "Jewelery";
  section.appendChild(title);
  let items = document.createElement("div");
  items.className = "items";
  for (product of products) {
    if (product.category === x) {
      let item = document.createElement("div");
      item.className = "item";
      item.id = product.id;
      item.innerHTML = `<div class="image">
                        <img src="${product.image}" alt="Item" />
                      </div>
                      <div class="info">
                        <div class="row">
                          <div class="price">${product.price}</div>
                          <div class="sized">S,M,L</div>
                        </div>
                        <div class="colors">
                          Colors:
                          <div class="row">
                            <div class="circle" style="background-color: #000"></div>
                            <div class="circle" style="background-color: #4938af"></div>
                            <div class="circle" style="background-color: #203d3e"></div>
                          </div>
                        </div>
                        <div class="row">Rating:${product.rating.rate}</div>
                      </div>`
      let addButton = document.createElement("button");
      addButton.id = "addBtn";
      addButton.innerText = "Add To cart";
      addButton.addEventListener("click", addToCart);
      item.appendChild(addButton);
      items.appendChild(item);
    }
  }
  section.appendChild(items);
  return section;
}

// adding products based on category to Ui
function addProductsToUi(productList, id) {
  currentCategory.style.color = "black";
  currentCategory.style.backgroundColor = "white";
  document.getElementById(id).style.backgroundColor = "black";
  document.getElementById(id).style.color = "white";
  currentCategory = document.getElementById(id);
  container.innerHTML = '';
  let title = document.createElement("title");
  if (id == "men") title.innerText = "Men's Clothing";
  else if (id == "women") title.innerText = "Women's Clothing";
  else if (id == electronics) title.innerText = "Electronics";
  else title.innerText = "Jewelery";
  container.appendChild(title);

  let items = document.createElement("div");
  items.className = "item-container";

  for (product of productList) {
    let item = document.createElement("div");
    item.className = "item";
    item.id = product.id;
    item.innerHTML = `<div class="image">
                        <img src="${product.image}" alt="Item" />
                      </div>
                    <div class="info">
                      <div class="row">
                        <div class="price">${product.price}</div>
                        <div class="sized">S,M,L</div>
                      </div>
                      <div class="colors">
                        Colors:
                        <div class="row">
                          <div class="circle" style="background-color: #000"></div>
                          <div class="circle" style="background-color: #4938af"></div>
                          <div class="circle" style="background-color: #203d3e"></div>
                        </div>
                      </div>
                      <div class="row">Rating:${product.rating.rate}</div>
                    </div>`
    let addButton = document.createElement("button");
    addButton.id = "addBtn";
    addButton.innerText = "Add To cart";
    addButton.addEventListener("click", addToCart);
    item.appendChild(addButton);
    items.appendChild(item);
  }
  container.appendChild(items);
}


async function clothingResultFn(event) {
  let categoryProducts = [];
  for (val of products) {
    if (val.category == event.target.id + "'s clothing") {
      categoryProducts.push(val);
    }
  }
  addProductsToUi(categoryProducts, event.target.id);
}

async function resultFn(event) {
  let categoryProducts = [];
  for (val of products) {
    if (val.category == event.target.id) {
      categoryProducts.push(val);
    }
  }
  addProductsToUi(categoryProducts, event.target.id);
}

function searchResultToUi(key) {

  container.innerHTML = '';
  let title = document.createElement("title");
  title.innerText = `Search Result For ${key}`;
  container.appendChild(title);

  let items = document.createElement("div");
  items.className = "item-container";
  for (product of products) {
    if (product.title.startsWith(key)) {

      let item = document.createElement("div");
      item.id = product.id;
      item.className = "item";
      item.innerHTML = `<div class="image">
                        <img src="${product.image}" alt="Item" />
                      </div>
                    <div class="info">
                      <div class="row">
                        <div class="price">${product.price}</div>
                        <div class="sized">S,M,L</div>
                      </div>
                      <div class="colors">
                        Colors:
                        <div class="row">
                          <div class="circle" style="background-color: #000"></div>
                          <div class="circle" style="background-color: #4938af"></div>
                          <div class="circle" style="background-color: #203d3e"></div>
                        </div>
                      </div>
                      <div class="row">Rating:${product.rating.rate}</div>
                    </div>`
      // <button id="addBtn">Add to Cart</button>`;
      let addButton = document.createElement("button");
      addButton.id = "addBtn";
      addButton.innerText = "Add To cart";
      addButton.addEventListener("click", addToCart);
      item.appendChild(addButton);
      console.log(item);
      items.appendChild(item);
    }
  }
  container.appendChild(items);

}

function searchFn(event) {
  if (event.key == "Enter") {
    let key = search.value;
    searchResultToUi(key);
  }

}


// add to cart

function addToCart(event) {
  let product = products[event.target.parentNode.id - 1];
  let cartListString = localStorage.getItem("cartList");
  cartList = JSON.parse(cartListString);
  cartList.push(product);
  // cartList.push(cartElement);
  localStorage.setItem("cartList", JSON.stringify(cartList));
  console.log(cartList);
}

// Event listeners

search.addEventListener("keyup", searchFn);


mensResult.addEventListener("click", clothingResultFn);
womensResult.addEventListener("click", clothingResultFn);
jewellaryResult.addEventListener("click", resultFn);
electronicsResult.addEventListener("click", resultFn);
allResult.addEventListener("click", addAllProductsToUi)