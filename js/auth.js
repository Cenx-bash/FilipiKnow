// Authentication System
class AuthSystem {
  constructor() {
    this.currentUser =
      JSON.parse(localStorage.getItem("filipiknow_user")) || null;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateUI();
  }

  setupEventListeners() {
    // Auth buttons
    document
      .getElementById("loginBtn")
      .addEventListener("click", () => this.showAuthModal("login"));
    document
      .getElementById("signupBtn")
      .addEventListener("click", () => this.showAuthModal("signup"));
    document.getElementById("logoutBtn").addEventListener("click", (e) => {
      e.preventDefault();
      this.logout();
    });

    // Close modals
    document.querySelectorAll(".close-auth").forEach((btn) => {
      btn.addEventListener("click", () => this.closeAuthModals());
    });

    // Auth switches
    document.querySelectorAll(".auth-switch").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = e.target.closest(".auth-switch").dataset.target;
        this.showAuthModal(target);
      });
    });

    // Form submissions
    document
      .getElementById("loginForm")
      .addEventListener("submit", (e) => this.handleLogin(e));
    document
      .getElementById("signupForm")
      .addEventListener("submit", (e) => this.handleSignup(e));

    // Close modals on backdrop click
    document.querySelectorAll(".auth-modal").forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          this.closeAuthModals();
        }
      });
    });

    // Escape key to close modals
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeAuthModals();
      }
    });
  }

  showAuthModal(type) {
    this.closeAuthModals();

    if (type === "login") {
      document.getElementById("loginModal").classList.add("active");
    } else if (type === "signup") {
      document.getElementById("signupModal").classList.add("active");
    }

    document.body.style.overflow = "hidden";
  }

  closeAuthModals() {
    document.querySelectorAll(".auth-modal").forEach((modal) => {
      modal.classList.remove("active");
    });
    document.body.style.overflow = "auto";
  }

  handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Simple validation
    if (!email || !password) {
      this.showNotification("Please fill in all fields", "error");
      return;
    }

    // Simulate API call
    this.showNotification("Signing in...", "info");

    setTimeout(() => {
      // For demo purposes, accept any credentials
      const user = {
        id: 1,
        name: "Demo User",
        email: email,
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
      };

      this.login(user);
      this.showNotification("Welcome back!", "success");
    }, 1000);
  }

  handleSignup(e) {
    e.preventDefault();

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("signupConfirm").value;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      this.showNotification("Please fill in all fields", "error");
      return;
    }

    if (password !== confirmPassword) {
      this.showNotification("Passwords do not match", "error");
      return;
    }

    if (password.length < 6) {
      this.showNotification("Password must be at least 6 characters", "error");
      return;
    }

    // Simulate API call
    this.showNotification("Creating your account...", "info");

    setTimeout(() => {
      const user = {
        id: Date.now(),
        name: name,
        email: email,
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
      };

      this.login(user);
      this.showNotification("Account created successfully!", "success");
    }, 1500);
  }

  login(user) {
    this.currentUser = user;
    localStorage.setItem("filipiknow_user", JSON.stringify(user));
    this.updateUI();
    this.closeAuthModals();

    // Clear forms
    document.getElementById("loginForm").reset();
    document.getElementById("signupForm").reset();
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem("filipiknow_user");
    this.updateUI();
    this.showNotification("Signed out successfully", "info");
  }

  updateUI() {
    const authButtons = document.querySelector(".auth-buttons");
    const userDropdown = document.getElementById("userDropdown");
    const body = document.body;

    if (this.currentUser) {
      // User is logged in
      authButtons.style.display = "none";
      userDropdown.style.display = "block";
      body.classList.add("user-logged-in");

      // Update user avatar and name if needed
      const avatar = userDropdown.querySelector(".user-avatar img");
      if (avatar && this.currentUser.avatar) {
        avatar.src = this.currentUser.avatar;
      }
    } else {
      // User is logged out
      authButtons.style.display = "flex";
      userDropdown.style.display = "none";
      body.classList.remove("user-logged-in");
    }
  }

  showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${
                  type === "success"
                    ? "check"
                    : type === "error"
                    ? "exclamation"
                    : "info"
                }-circle"></i>
                <span>${message}</span>
            </div>
        `;

    // Add styles
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 2rem;
            background: ${
              type === "success"
                ? "var(--success)"
                : type === "error"
                ? "var(--error)"
                : "var(--accent)"
            };
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--radius);
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
        `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = "slideOutRight 0.3s ease-in";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  isAuthenticated() {
    return this.currentUser !== null;
  }

  getUser() {
    return this.currentUser;
  }
}

// Initialize auth system
const auth = new AuthSystem();
