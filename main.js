const displayCart = () => {
  let cartArray = shoppingCart.listCart();

  document.querySelector(".cart > ul").innerHTML = "";

  cartArray.forEach((item) => {
    document.querySelector(".cart > ul").insertAdjacentHTML("beforeend",`<li>${item.name} ${item.count} x ${item.price} = ${item.total}
    <button class="delete-item" data-name=${item.name}>X</button>
    </li>`);
  });

  document.querySelector(".total-cost").innerHTML = "Total Price - " + shoppingCart.totalCost();
  listenDeleteEvent();
}


const listenAddEvent = () => {

  document.querySelectorAll(".add-to-cart").forEach((listItem) => {
    listItem.addEventListener("click",function(e) {
      e.preventDefault();

      const productName = this.getAttribute("data-name");
      const productPrice = this.getAttribute("data-price");
      shoppingCart.addItemToCart(productName,productPrice,1);
      displayCart();

    });
  });
}

const listenDeleteEvent = () => {
  document.querySelectorAll(".delete-item").forEach((item) => {
    let self = item;
    item.addEventListener("click",(e) => {
      e.preventDefault();
      let name = self.getAttribute("data-name");
      shoppingCart.removeItemFromCart(name);
      displayCart();
    });
  });
}

displayCart();
listenAddEvent();
listenDeleteEvent();

document.querySelector(".clear-cart").addEventListener("click",function(e) {
  e.preventDefault();
  shoppingCart.clearCart();
  displayCart();
});
