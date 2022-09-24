const emptyCart = document.querySelector(".emptyCart");
// handleUpdateCart();

//remove setup
const removeBtns = document.querySelectorAll(".removeBtn");
removeBtns.forEach((removeBtn) =>
  removeBtn.addEventListener("click", handleRemoveCart)
);

const inputNumbers = document.querySelectorAll(".inputNumber");
inputNumbers.forEach((inputNumber) =>
  inputNumber.addEventListener("change", updateQuantity)
);

const addCartButtons = document.querySelectorAll(".buyBtn");
addCartButtons.forEach((addCartButton) =>
  addCartButton.addEventListener("click", addToCart)
);

function addToCart(e) {
  const activeBtn = e.target;
  const parentElement = activeBtn.parentElement;
  const cartName = parentElement.querySelector("h4").innerHTML;
  const cartPrice = parentElement.querySelector("#price").innerHTML;

  addItem(cartName, cartPrice);
  handleUpdateCart();
}

function addItem(cartName, cartPrice) {
  emptyCart.classList.add("displayNone");
  const createNewParentDiv = document.createElement("div");
  createNewParentDiv.className = "lineOne";
  createNewParentDiv.id = "cartValue";
  const cartContainer = document.querySelector(".cartValueContainer");

  const checkClickedNames = document.querySelectorAll("#itemDiv");
  let a = false;
  let checker = [...checkClickedNames].find((cn) => cn.innerHTML == cartName);
  if (checker !== undefined) {
    alert("Already selected, increase item on Cart");

    // let qNumber = Number(checker.parentElement.children[1].value);
    // checker.parentElement.children[1].value = qNumber++ || 2;
    // checker.parentElement.children[3].innerHTML = qNumber;
    return;
  }

  if (checker == undefined) {
    const cartContent = `
      <div class="" id="itemDiv">${cartName}</div>
      <input type="number" id="inp" min="1" class="inputNumber" /> *
      <div id="priceDiv" class="priceDiv">$${cartPrice}</div>
      <span class="qty">1</span>
      <button class="removeBtn">Remove</button>
  `;
    createNewParentDiv.innerHTML = cartContent;
    cartContainer.append(createNewParentDiv);

    const removeBtn = createNewParentDiv.querySelector(".removeBtn");
    removeBtn.addEventListener("click", handleRemoveCart);

    const inputNumber = createNewParentDiv.querySelector(".inputNumber");
    inputNumber.addEventListener("change", handleUpdateCart);
  }
}

//remove function
function handleRemoveCart(e) {
  const clickedBtn = e.target;
  clickedBtn.parentNode.remove();
  handleUpdateCart();
}

function updateQuantity(e) {
  const inputNumber = e.target;
  inputNumber.value = isNaN(inputNumber.value) ? 1 : inputNumber.value;
  handleUpdateCart();
}

//update function
function handleUpdateCart() {
  let Total = 0;
  const cartRows = document.querySelectorAll(".lineOne");
  const cartTotal = document.querySelector("#totalPrice");
  cartRows.forEach((cartRow) => {
    const priceDiv = cartRow.querySelector("#priceDiv");
    const quantityDiv = cartRow.querySelector(".inputNumber");
    const qty = cartRow.querySelector(".qty");

    const price = Number(priceDiv.textContent.replace("$", ""));
    const quantity = quantityDiv.value || 1;

    Total = Total + quantity * price;
    qty.innerHTML = quantity;
    cartTotal.innerHTML = `$ ${Total.toFixed(2)}`;
  });
}

const checkout = document.querySelector("#checkoutBtn");
checkout.addEventListener("click", () => {
  alert("Thank you for your order");
  emptyCart.classList.remove("displayNone");
  const cartContainer = document.querySelector(".cartValueContainer");
  const child = cartContainer.querySelectorAll(".lineOne");
  child.forEach((c) => c.remove());
});
