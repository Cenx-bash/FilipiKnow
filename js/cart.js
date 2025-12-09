// Shopping Cart System for FilipiKnow Premium
class ShoppingCart {
    constructor() {
        this.cart = db.cart;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateCartCount();
        this.renderCartPreview();
    }

    setupEventListeners() {
        // Cart toggle
        const cartToggle = document.getElementById('cartToggle');
        const cartPreview = document.querySelector('.cart-preview');

        if (cartToggle && cartPreview) {
            cartToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                cartPreview.classList.toggle('active');
            });

            // Close cart when clicking outside
            document.addEventListener('click', (e) => {
                if (!cartToggle.contains(e.target) && !cartPreview.contains(e.target)) {
                    cartPreview.classList.remove('active');
                }
            });
        }

        // View cart button
        document.getElementById('viewCartBtn')?.addEventListener('click', () => {
            this.showCartModal();
        });

        // Add to cart events (delegated)
        document.addEventListener('click', (e) => {
            const addToCartBtn = e.target.closest('.add-to-cart-btn');
            if (addToCartBtn) {
                e.preventDefault();
                const productId = parseInt(addToCartBtn.dataset.id);
                this.addToCart(productId);
            }
        });

        // Remove from cart events (delegated)
        document.addEventListener('click', (e) => {
            const removeBtn = e.target.closest('.remove-from-cart');
            if (removeBtn) {
                e.preventDefault();
                const productId = parseInt(removeBtn.dataset.id);
                this.removeFromCart(productId);
            }
        });

        // Quantity change events (delegated)
        document.addEventListener('change', (e) => {
            const quantityInput = e.target.closest('.cart-quantity');
            if (quantityInput) {
                const productId = parseInt(quantityInput.dataset.id);
                const quantity = parseInt(quantityInput.value);
                this.updateQuantity(productId, quantity);
            }
        });
    }

    addToCart(productId, quantity = 1) {
        const product = db.products.find(p => p.id === productId);
        if (!product) return;

        if (auth.isAuthenticated()) {
            db.addToCart(product, quantity);
            this.cart = db.cart;
            this.updateCartCount();
            this.renderCartPreview();
            auth.showNotification(`Added ${product.title} to cart`, 'success');
        } else {
            auth.showNotification('Please sign in to add items to cart', 'error');
            auth.showAuthModal('login');
        }
    }

    removeFromCart(productId) {
        db.removeFromCart(productId);
        this.cart = db.cart;
        this.updateCartCount();
        this.renderCartPreview();
        this.renderCartModal();
        auth.showNotification('Item removed from cart', 'info');
    }

    updateQuantity(productId, quantity) {
        if (quantity < 1) {
            this.removeFromCart(productId);
            return;
        }

        db.updateQuantity(productId, quantity);
        this.cart = db.cart;
        this.updateCartCount();
        this.renderCartPreview();
        this.renderCartModal();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const count = this.cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = count;
            cartCount.style.display = count > 0 ? 'flex' : 'none';
        }

        // Update cart total
        const cartTotal = document.getElementById('cartTotal');
        if (cartTotal) {
            cartTotal.textContent = `₱${this.getCartTotal().toLocaleString()}`;
        }
    }

    getCartTotal() {
        return db.getCartTotal();
    }

    renderCartPreview() {
        const cartItems = document.getElementById('cartItems');
        if (!cartItems) return;

        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
            return;
        }

        cartItems.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-info">
                    <h4>${item.title}</h4>
                    <p>₱${item.price.toLocaleString()} × ${item.quantity}</p>
                    <p class="cart-item-subtotal">₱${(item.price * item.quantity).toLocaleString()}</p>
                </div>
                <button class="remove-from-cart" data-id="${item.id}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }

    showCartModal() {
        this.renderCartModal();
        const modal = document.getElementById('productModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    renderCartModal() {
        const modalBody = document.getElementById('modalBody');
        if (!modalBody) return;

        if (this.cart.length === 0) {
            modalBody.innerHTML = `
                <div class="cart-modal">
                    <div class="empty-cart-modal">
                        <i class="fas fa-shopping-cart fa-3x"></i>
                        <h3>Your Cart is Empty</h3>
                        <p>Add some beautiful Filipino crafts to get started!</p>
                        <button class="btn btn-primary" onclick="app.closeModal('productModal')">
                            Continue Shopping
                        </button>
                    </div>
                </div>
            `;
            return;
        }

        modalBody.innerHTML = `
            <div class="cart-modal">
                <div class="cart-modal-header">
                    <h2>Shopping Cart (${this.cart.reduce((total, item) => total + item.quantity, 0)} items)</h2>
                </div>
                
                <div class="cart-modal-items">
                    ${this.cart.map(item => `
                        <div class="cart-modal-item">
                            <img src="${item.image}" alt="${item.title}">
                            <div class="cart-modal-item-info">
                                <h3>${item.title}</h3>
                                <p class="artisan">by ${item.artisan}</p>
                                <div class="price">₱${item.price.toLocaleString()}</div>
                                <div class="quantity-controls">
                                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                                    <input type="number" class="cart-quantity" data-id="${item.id}" 
                                           value="${item.quantity}" min="1" max="99">
                                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                                </div>
                            </div>
                            <div class="cart-modal-item-actions">
                                <div class="subtotal">₱${(item.price * item.quantity).toLocaleString()}</div>
                                <button class="remove-btn" data-id="${item.id}">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="cart-modal-summary">
                    <div class="summary-row">
                        <span>Subtotal</span>
                        <span>₱${this.getCartTotal().toLocaleString()}</span>
                    </div>
                    <div class="summary-row">
                        <span>Shipping</span>
                        <span>FREE</span>
                    </div>
                    <div class="summary-row total">
                        <span>Total</span>
                        <span>₱${this.getCartTotal().toLocaleString()}</span>
                    </div>
                    
                    <div class="cart-modal-actions">
                        <button class="btn btn-outline" onclick="app.closeModal('productModal')">
                            Continue Shopping
                        </button>
                        <button class="btn btn-primary" id="checkoutBtn">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners to modal controls
        this.setupCartModalListeners();
    }

    setupCartModalListeners() {
        // Quantity buttons
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                const input = document.querySelector(`.cart-quantity[data-id="${productId}"]`);
                let quantity = parseInt(input.value);

                if (e.target.classList.contains('minus')) {
                    quantity = Math.max(1, quantity - 1);
                } else if (e.target.classList.contains('plus')) {
                    quantity = Math.min(99, quantity + 1);
                }

                input.value = quantity;
                this.updateQuantity(productId, quantity);
            });
        });

        // Remove buttons
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.closest('.remove-btn').dataset.id);
                this.removeFromCart(productId);
            });
        });

        // Checkout button
        document.getElementById('checkoutBtn')?.addEventListener('click', () => {
            this.handleCheckout();
        });
    }

    handleCheckout() {
        if (!auth.isAuthenticated()) {
            auth.showNotification('Please sign in to checkout', 'error');
            auth.showAuthModal('login');
            return;
        }

        if (this.cart.length === 0) {
            auth.showNotification('Your cart is empty', 'error');
            return;
        }

        // Simulate checkout process
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('active');
        }

        setTimeout(() => {
            if (loadingOverlay) {
                loadingOverlay.classList.remove('active');
            }

            // Show success message
            auth.showNotification('Order placed successfully! Thank you for supporting Filipino artisans.', 'success');

            // Clear cart
            db.clearCart();
            this.cart = [];
            this.updateCartCount();
            this.renderCartPreview();

            // Close modal
            app.closeModal('productModal');
        }, 2000);
    }

    clearCart() {
        db.clearCart();
        this.cart = [];
        this.updateCartCount();
        this.renderCartPreview();
    }
}

// Initialize shopping cart
const cart = new ShoppingCart();
window.cart = cart;
window.cart = cart;