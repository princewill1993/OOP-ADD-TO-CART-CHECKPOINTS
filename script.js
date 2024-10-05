// Product Class
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

// ShoppingCartItem Class
class ShoppingCartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  // Calculate total price for this item
  totalPrice() {
    return this.product.price * this.quantity;
  }
}

// ShoppingCart Class
class ShoppingCart {
  constructor() {
    this.items = []; // Array to hold ShoppingCartItem instances
  }

  // Add item to the cart
  addItem(product, quantity) {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push(new ShoppingCartItem(product, quantity));
    }
    this.displayCart();
  }

  // Remove item from the cart
  removeItem(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.displayCart();
  }

  // Get total of items in the cart
  getTotal() {
    return this.items.reduce((total, item) => total + item.totalPrice(), 0);
  }

  // Display cart items in the DOM
  displayCart() {
    const totalAmount = document.getElementById("total-amt");
    let total = this.getTotal();
    totalAmount.textContent = `Total amount of items: #${total.toLocaleString()}`;

    this.items.forEach((item) => {
      const quantityElement = document.getElementById(
        `cart-quantity-${item.product.id}`
      );
      const priceElement = document.getElementById(
        `price-card-${item.product.id}`
      );

      // Update quantity and price in the DOM
      if (quantityElement) quantityElement.textContent = item.quantity;
      if (priceElement)
        priceElement.textContent = `#${item.totalPrice().toLocaleString()}`;
    });
  }
}

// Initialize the shopping cart
const cart = new ShoppingCart();

// Products
const products = [
  new Product(1, "Samsung Phone", 40000),
  new Product(2, "Samsung Phone", 30000),
  new Product(3, "Samsung Phone", 60000),
  new Product(4, "Samsung Phone", 10000),
];

// Event listeners to manage add and remove buttons

products.forEach((product) => {
  // Add event listener for "+" button
  document
    .getElementById(`plus-btn${product.id}`)
    .addEventListener("click", () => {
      cart.addItem(product, 1);
    });

  // Add event listener for "-" button
  document
    .getElementById(`sub-btn${product.id}`)
    .addEventListener("click", () => {
      cart.addItem(product, -1);
      const cartItem = cart.items.find(
        (item) => item.product.id === product.id
      );
      if (cartItem && cartItem.quantity <= 0) {
        cart.removeItem(product.id);
      }
    });

  // Add event listener for "Delete" button
  document
    .getElementById(`del-btn${product.id}`)
    .addEventListener("click", () => {
      cart.removeItem(product.id);
    });
});

// Initialize cart by displaying the default state
cart.displayCart();

// Function to toggle the heart image

// ID FOR THE LOVE EMOJI

let loveEmoji = document.querySelectorAll(".love-emoji");
console.log(loveEmoji);

function toggleLoveEmoji(element) {
  // Check the current source of the image
  if (element.src.includes("love-blank.jpeg")) {
    // Change to checked heart

    element.src = "IMG/love-checked.jpg";
  } else {
    // Change back to blank heart
    element.src = "IMG/love-blank.jpeg";
  }
}

loveEmoji.forEach((item) => {
  item.addEventListener("click", function () {
    toggleLoveEmoji(item);
  });
});
