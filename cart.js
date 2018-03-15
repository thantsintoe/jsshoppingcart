const shoppingCart = (function() {
  let shoppingCart = {};
  let self = shoppingCart;

  let cart = [];

  let Item = function(name,price,count) {
    this.name = name;
    this.price = price;
    this.count = count;
  };

  // Check whether item is already existed in the cart
  shoppingCart.ItemExistInCart = (name) => {
    let itemExist = false;

    cart.forEach((item) => {
      if(item.name === name) {
        itemExist = true;
      }
    });
    return itemExist;
  }

  // Add New Item or increase count of item in the cart
  shoppingCart.addItemToCart = (name,price,count) => {

    if(self.ItemExistInCart(name)) {
      cart.forEach((item) => {
        if(item.name === name) {
          item.count += count;
        }
      });
    } else {
      let newItem = new Item(name,price,count);
      cart.push(newItem);
    }
    self.saveCart();

  }

  // Remove Item from Cart or reduce the count of item in cart
  shoppingCart.removeItemFromCart = (name) => {
    cart.forEach((item) => {
      if(item.name === name) {
        item.count--;
        if(item.count === 0) {
          cart.splice(cart.indexOf(item),1);
        }
      }
    });
    self.saveCart();
  }

  // Clear All Item from Cart
  shoppingCart.clearCart = () => {
    let numOfItemInCart = cart.length;

    for(let i=0;i<numOfItemInCart;i++) {
      cart.pop();
    }
    self.saveCart();
  }
  // Count total number of item in cart...
  shoppingCart.countCart = () => {
    let count = 0;
    cart.forEach(item => count+= item.count);
    return count;
  }

  // Calculate the Total Cost of Item
  shoppingCart.totalCost = () => {
    let cost = 0;
    if(cart.length > 0) {
      cart.forEach(item => cost+= item.price * item.count);
    }
    return cost.toFixed(2);
  }

  // List all item in the shopping Cart
  shoppingCart.listCart = () => {
    // return cart.map(item => item);
    let cartCopy = [];

    for(let i in cart) {
      let item = cart[i]; // now item is the original object
      let itemCopy = {}; // itemCopy is initialised as empty object
      for(let p in item) {
        itemCopy[p] = item[p];
      }
      itemCopy.total = (itemCopy.price * itemCopy.count).toFixed(2);
      cartCopy.push(itemCopy);
    }
    return cartCopy;
  }

  // Save the Cart
  shoppingCart.saveCart = () => {
    localStorage.setItem("shoppingCart",JSON.stringify(cart));
  }

  // Load the Cart
  shoppingCart.loadCart = () => {
    cart = JSON.parse(localStorage.getItem("shoppingCart"));
  }

  return shoppingCart;

})();

shoppingCart.loadCart();
