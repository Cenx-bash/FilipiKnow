// Authentication System for FilipiKnow Premium
class AuthSystem {
    constructor() {
        this.authModals = {
            login: document.getElementById('loginModal'),
            signup: document.getElementById('signupModal')
        };
        this.currentUser = db.getCurrentUser();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateUI();
    }

    setupEventListeners() {
        // Auth buttons
        document.getElementById('loginBtn')?.addEventListener('click', () => this.showAuthModal('login'));
        document.getElementById('signupBtn')?.addEventListener('click', () => this.showAuthModal('signup'));
        document.getElementById('logoutBtn')?.addEventListener('click', () => this.logout());

        // Close auth modals
        document.querySelectorAll('.close-auth').forEach(btn => {
            btn.addEventListener('click', () => this.hideAuthModals());
        });

        // Auth modal switches
        document.querySelectorAll('.auth-switch').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target.closest('.auth-switch').dataset.target;
                this.showAuthModal(target);
            });
        });

        // Form submissions
        document.getElementById('loginForm')?.addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('signupForm')?.addEventListener('submit', (e) => this.handleSignup(e));

        // Close modals on outside click
        Object.values(this.authModals).forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideAuthModals();
                }
            });
        });

        // Escape key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideAuthModals();
            }
        });
    }

    showAuthModal(type) {
        this.hideAuthModals();

        if (this.authModals[type]) {
            this.authModals[type].classList.add('active');
            document.body.style.overflow = 'hidden';

            // Focus first input
            const firstInput = this.authModals[type].querySelector('input');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        }
    }

    hideAuthModals() {
        Object.values(this.authModals).forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';

        // Reset forms
        this.resetForms();
    }

    resetForms() {
        document.querySelectorAll('.auth-form').forEach(form => {
            form.reset();
            form.querySelectorAll('.error-message').forEach(el => {
                el.textContent = '';
            });
            form.querySelectorAll('input').forEach(input => {
                input.classList.remove('error');
            });
            form.querySelectorAll('.btn').forEach(btn => {
                btn.classList.remove('loading');
            });
        });
    }

    async handleLogin(e) {
        e.preventDefault();

        const form = e.target;
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const btn = form.querySelector('button[type="submit"]');

        // Show loading state
        btn.classList.add('loading');

        // Simple validation
        let isValid = true;

        if (!this.validateEmail(email)) {
            this.showError('loginEmailError', 'Please enter a valid email address');
            document.getElementById('loginEmail').classList.add('error');
            isValid = false;
        }

        if (password.length < 6) {
            this.showError('loginPasswordError', 'Password must be at least 6 characters');
            document.getElementById('loginPassword').classList.add('error');
            isValid = false;
        }

        if (!isValid) {
            btn.classList.remove('loading');
            return;
        }

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Attempt login
        const result = db.login(email, password);

        if (result.success) {
            this.currentUser = result.user;
            this.updateUI();
            this.hideAuthModals();
            this.showNotification('Successfully logged in!', 'success');

            // Update cart and wishlist counts
            if (typeof cart !== 'undefined') {
                cart.updateCartCount();
            }
            this.updateWishlistCount();
        } else {
            this.showError('loginPasswordError', result.message);
            document.getElementById('loginPassword').classList.add('error');
        }

        btn.classList.remove('loading');
    }

    async handleSignup(e) {
        e.preventDefault();

        const form = e.target;
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirm = document.getElementById('signupConfirm').value;
        const terms = document.getElementById('termsAgreement').checked;
        const btn = form.querySelector('button[type="submit"]');

        // Show loading state
        btn.classList.add('loading');

        // Validation
        let isValid = true;

        if (name.trim().length < 2) {
            this.showError('signupNameError', 'Name must be at least 2 characters');
            document.getElementById('signupName').classList.add('error');
            isValid = false;
        }

        if (!this.validateEmail(email)) {
            this.showError('signupEmailError', 'Please enter a valid email address');
            document.getElementById('signupEmail').classList.add('error');
            isValid = false;
        }

        if (password.length < 6) {
            this.showError('signupPasswordError', 'Password must be at least 6 characters');
            document.getElementById('signupPassword').classList.add('error');
            isValid = false;
        }

        if (password !== confirm) {
            this.showError('signupConfirmError', 'Passwords do not match');
            document.getElementById('signupConfirm').classList.add('error');
            isValid = false;
        }

        if (!terms) {
            this.showError('signupConfirmError', 'Please agree to the terms and conditions');
            isValid = false;
        }

        if (!isValid) {
            btn.classList.remove('loading');
            return;
        }

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Attempt registration
        const result = db.register(name, email, password);

        if (result.success) {
            this.currentUser = result.user;
            this.updateUI();
            this.hideAuthModals();
            this.showNotification('Account created successfully!', 'success');

            // Update cart and wishlist counts
            if (typeof cart !== 'undefined') {
                cart.updateCartCount();
            }
            this.updateWishlistCount();
        } else {
            this.showError('signupEmailError', result.message);
            document.getElementById('signupEmail').classList.add('error');
        }

        btn.classList.remove('loading');
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showError(elementId, message) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
        }
    }

    clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
        document.querySelectorAll('input.error').forEach(input => {
            input.classList.remove('error');
        });
    }

    logout() {
        db.logout();
        this.currentUser = null;
        this.updateUI();
        this.showNotification('Logged out successfully', 'info');

        // Update cart and wishlist counts
        if (typeof cart !== 'undefined') {
            cart.updateCartCount();
        }
        this.updateWishlistCount();
    }

    updateUI() {
        const authButtons = document.getElementById('authButtons');
        const userDropdown = document.getElementById('userDropdown');
        const wishlistToggle = document.getElementById('wishlistToggle');

        if (this.isAuthenticated()) {
            // Show user dropdown, hide auth buttons
            if (authButtons) authButtons.classList.add('active');
            if (userDropdown) userDropdown.classList.add('active');
            if (wishlistToggle) wishlistToggle.style.display = 'flex';

            // Update user avatar if exists
            const avatarImg = document.querySelector('.user-avatar img');
            if (avatarImg && this.currentUser.avatar) {
                avatarImg.src = this.currentUser.avatar;
            }

            // Update user name in dropdown if exists
            const userName = document.querySelector('.user-menu-item:first-child span');
            if (userName) {
                userName.textContent = this.currentUser.name;
            }
        } else {
            // Show auth buttons, hide user dropdown
            if (authButtons) authButtons.classList.remove('active');
            if (userDropdown) userDropdown.classList.remove('active');
            if (wishlistToggle) wishlistToggle.style.display = 'none';
        }
    }

    updateWishlistCount() {
        const wishlistCount = document.getElementById('wishlistCount');
        if (wishlistCount) {
            const count = db.wishlist.length;
            wishlistCount.textContent = count;
            wishlistCount.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    showNotification(message, type = 'info') {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        // Icons for different types
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        toast.innerHTML = `
            <div class="toast-icon">
                <i class="${icons[type] || icons.info}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-title">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="close-toast">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add to container
        const container = document.getElementById('toastContainer');
        if (container) {
            container.appendChild(toast);

            // Add close event
            const closeBtn = toast.querySelector('.close-toast');
            closeBtn.addEventListener('click', () => {
                toast.remove();
            });

            // Auto remove after 5 seconds
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 5000);
        }
    }
}

// Initialize auth system
const auth = new AuthSystem();
window.auth = auth;