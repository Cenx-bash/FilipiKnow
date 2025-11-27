// Cart Management System
class CartSystem {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("filipiknow_cart")) || [];
    this.init();
  }

  init() {
    this.updateCartBadge();
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Add to cart buttons would be handled here
    // This would be integrated with the main app
  }

  addToCart(product, quantity = 1) {
    const existingItem = this.cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({
        ...product,
        quantity: quantity,
        addedAt: new Date().toISOString(),
      });
    }

    this.saveCart();
    this.updateCartBadge();

    // Show notification
    if (typeof auth !== "undefined") {
      auth.showNotification("Added to cart", "success");
    }
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter((item) => item.id !== productId);
    this.saveCart();
    this.updateCartBadge();
  }

  updateQuantity(productId, quantity) {
    const item = this.cart.find((item) => item.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.saveCart();
        this.updateCartBadge();
      }
    }
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
    this.updateCartBadge();
  }

  getCartTotal() {
    return this.cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace("₱", "").replace(",", ""));
      return total + price * item.quantity;
    }, 0);
  }

  getCartCount() {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }

  saveCart() {
    localStorage.setItem("filipiknow_cart", JSON.stringify(this.cart));
  }

  updateCartBadge() {
    const badge = document.querySelector(".cart-btn .badge");
    if (badge) {
      badge.textContent = this.getCartCount();
    }
  }

  getCart() {
    return this.cart;
  }
}

// Initialize cart system
const cart = new CartSystem();
