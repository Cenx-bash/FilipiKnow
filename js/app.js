// FilipiKnow Premium Enhanced E-Commerce + KMS Application
class FilipiKnowPremium {
  constructor() {
    this.products = this.getSampleProducts();
    this.stories = this.getSampleStories();
    this.knowledge = this.getSampleKnowledge();
    this.currentFilter = "all";
    this.init();
  }

  init() {
    this.renderProducts();
    this.renderStories();
    this.renderKnowledge();
    this.setupEventListeners();
    this.setupScrollAnimations();
    this.hidePreloader();
  }

  getSampleProducts() {
    return [
      {
        id: 1,
        title: "Handwoven Inabel Textile",
        artisan: "Maria's Weaving Collective",
        price: "₱4,200",
        originalPrice: "₱5,000",
        image:
          "https://images.unsplash.com/photo-1583244685026-d8513b661c1e?w=400&h=500&fit=crop",
        location: "Ilocos Norte",
        description:
          "Traditional Inabel weaving using centuries-old techniques. Each thread tells a story of Ilocano heritage.",
        materials: "100% Cotton, Natural Dyes",
        techniques: "Traditional Loom Weaving",
        certification: "National Heritage Certified",
        story:
          "Maria's family has been weaving Inabel for five generations. This particular pattern was inspired by the waves of the West Philippine Sea and takes approximately 3 weeks to complete using traditional wooden looms.",
        dimensions: "2m x 1.5m",
        care: "Hand wash cold, dry flat",
        shipping: "Free shipping nationwide",
        returnPolicy: "30-day return policy",
        rating: 4.9,
        reviews: 127,
        tags: ["weaving", "textile", "traditional", "ilocos"],
        category: "weaving",
      },
      // ... more products (same as in your original code)
    ];
  }

  getSampleStories() {
    return [
      {
        id: 1,
        title: "The Last Piña Weavers",
        location: "Aklan, Visayas",
        image:
          "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=400&h=300&fit=crop",
        excerpt:
          "Meet the artisans keeping the delicate piña cloth tradition alive against modern challenges.",
        fullStory: `
          <p>In the quiet towns of Aklan, a handful of master weavers continue the centuries-old tradition of piña cloth making. Using fibers from pineapple leaves, they create some of the world's most delicate and luxurious textiles.</p>
          <p>Doña Elena, at 78 years old, is one of the last master weavers who remembers the techniques passed down from Spanish colonial times. "My grandmother taught me when I was seven," she recalls, her fingers still moving deftly across the loom. "Each thread must be extracted carefully from the pineapple leaf, then knotted by hand. It takes patience that young people today don't have."</p>
        `,
        artisan: {
          name: "Doña Elena Santos",
          role: "5th Generation Weaver",
          image:
            "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=100&h=100&fit=crop&crop=face",
          experience: "71 years",
        },
        stats: {
          readTime: "15 min",
          likes: 234,
          shares: 89,
        },
        video: "https://example.com/piña-weaving-documentary",
      },
      // ... more stories
    ];
  }

  getSampleKnowledge() {
    return [
      {
        id: 1,
        title: "Traditional Weaving Masterclass",
        description:
          "Learn the ancient art of Filipino weaving from master artisans in Ilocos Norte. This comprehensive course covers everything from thread preparation to complex patterns.",
        price: "₱2,500",
        originalPrice: "₱3,500",
        duration: "4 weeks",
        level: "Beginner to Advanced",
        students: 156,
        rating: 4.9,
        icon: "fas fa-vest",
        instructor: {
          name: "Master Weaver Elena",
          experience: "40 years",
          image:
            "https://images.unsplash.com/photo-1583244685026-d8513b661c1e?w=80&h=80&fit=crop&crop=face",
        },
        includes: [
          "8 video lessons",
          "Live Q&A sessions",
          "Digital certification",
          "Community access",
        ],
      },
      // ... more knowledge items
    ];
  }

  renderProducts() {
    const grid = document.getElementById("productsGrid");
    if (!grid) return;

    const filteredProducts =
      this.currentFilter === "all"
        ? this.products
        : this.products.filter(
            (product) => product.category === this.currentFilter
          );

    grid.innerHTML = filteredProducts
      .map(
        (product) => `
      <div class="product-card" data-id="${product.id}">
        <div class="product-image">
          <img src="${product.image}" alt="${product.title}">
          <div class="product-badge">Authenticated</div>
          <div class="product-overlay">
            <button class="btn btn-primary btn-small quick-view-btn" data-id="${
              product.id
            }">
              <i class="fas fa-eye"></i> Quick View
            </button>
          </div>
        </div>
        <div class="product-content">
          <h3 class="product-title">${product.title}</h3>
          <p class="product-artisan">by ${product.artisan} • ${
          product.location
        }</p>
          <div class="product-rating">
            <div class="stars">${this.generateStars(product.rating)}</div>
            <span class="rating-text">${product.rating} (${
          product.reviews
        } reviews)</span>
          </div>
          <div class="product-pricing">
            <span class="current-price">${product.price}</span>
            ${
              product.originalPrice
                ? `<span class="original-price">${product.originalPrice}</span>`
                : ""
            }
          </div>
          <div class="product-actions">
            <button class="icon-btn wishlist-btn" data-id="${product.id}">
              <i class="fas fa-heart"></i>
            </button>
            <button class="btn btn-primary add-to-cart-btn" data-id="${
              product.id
            }">
              <i class="fas fa-shopping-bag"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }

  generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = "";

    for (let i = 0; i < fullStars; i++) {
      stars += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
      stars += '<i class="fas fa-star-half-alt"></i>';
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars += '<i class="far fa-star"></i>';
    }

    return stars;
  }

  renderStories() {
    const grid = document.getElementById("storiesGrid");
    if (!grid) return;

    grid.innerHTML = this.stories
      .map(
        (story) => `
      <div class="story-card" data-id="${story.id}">
        <div class="story-image">
          <img src="${story.image}" alt="${story.title}">
          <div class="story-overlay">
            <button class="btn btn-outline read-story-btn" data-id="${story.id}">
              <i class="fas fa-book-open"></i> Read Story
            </button>
          </div>
        </div>
        <div class="story-content">
          <h3 class="story-title">${story.title}</h3>
          <p class="story-location">${story.location}</p>
          <p class="story-excerpt">${story.excerpt}</p>
          <div class="story-meta">
            <div class="artisan-info">
              <img src="${story.artisan.image}" alt="${story.artisan.name}">
              <div>
                <strong>${story.artisan.name}</strong>
                <span>${story.artisan.role}</span>
              </div>
            </div>
            <div class="story-stats">
              <span><i class="fas fa-clock"></i> ${story.stats.readTime}</span>
              <span><i class="fas fa-heart"></i> ${story.stats.likes}</span>
            </div>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }

  renderKnowledge() {
    const grid = document.getElementById("knowledgeGrid");
    if (!grid) return;

    grid.innerHTML = this.knowledge
      .map(
        (item) => `
      <div class="knowledge-card" data-id="${item.id}">
        <div class="knowledge-icon">
          <i class="${item.icon}"></i>
        </div>
        <div class="knowledge-content">
          <h3 class="knowledge-title">${item.title}</h3>
          <p class="knowledge-description">${item.description}</p>
          <div class="knowledge-meta">
            <div class="instructor-info">
              <img src="${item.instructor.image}" alt="${item.instructor.name}">
              <div>
                <strong>${item.instructor.name}</strong>
                <span>${item.instructor.experience} experience</span>
              </div>
            </div>
            <div class="course-stats">
              <span><i class="fas fa-users"></i> ${
                item.students
              } students</span>
              <span><i class="fas fa-star"></i> ${item.rating}/5</span>
            </div>
          </div>
          <div class="course-details">
            <span class="duration"><i class="fas fa-clock"></i> ${
              item.duration
            }</span>
            <span class="level"><i class="fas fa-signal"></i> ${
              item.level
            }</span>
          </div>
          <div class="knowledge-pricing">
            <span class="price">${item.price}</span>
            ${
              item.originalPrice
                ? `<span class="original-price">${item.originalPrice}</span>`
                : ""
            }
          </div>
          <button class="btn btn-primary enroll-btn" data-id="${item.id}">
            <i class="fas fa-shopping-cart"></i> Enroll Now
          </button>
        </div>
      </div>
    `
      )
      .join("");
  }

  setupEventListeners() {
    // Navigation and UI
    this.setupNavigation();
    this.setupSearch();
    this.setupFilters();
    this.setupModals();

    // Product interactions
    this.setupProductInteractions();
    this.setupStoryInteractions();
    this.setupKnowledgeInteractions();

    // Scroll and animations
    this.setupScrollEvents();
  }

  setupNavigation() {
    // Nav links
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        document
          .querySelectorAll(".nav-link")
          .forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      });
    });

    // Mobile menu
    const mobileToggle = document.querySelector(".mobile-menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        mobileToggle.classList.toggle("active");
      });
    }

    // Navbar scroll effect
    window.addEventListener("scroll", () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  setupSearch() {
    const searchToggle = document.querySelector(".search-toggle");
    const searchBox = document.querySelector(".search-box");
    const searchInput = document.querySelector(".search-input");
    const searchClose = document.querySelector(".search-close");

    if (searchToggle && searchBox) {
      searchToggle.addEventListener("click", () => {
        searchBox.classList.toggle("active");
        if (searchBox.classList.contains("active")) {
          searchInput.focus();
        }
      });

      searchClose.addEventListener("click", () => {
        searchBox.classList.remove("active");
      });

      // Search functionality
      searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length > 2) {
          this.performSearch(query);
        } else {
          this.renderProducts();
        }
      });
    }
  }

  performSearch(query) {
    const filteredProducts = this.products.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.artisan.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some((tag) => tag.toLowerCase().includes(query))
    );

    const grid = document.getElementById("productsGrid");
    if (filteredProducts.length === 0) {
      grid.innerHTML = `
        <div class="no-results">
          <i class="fas fa-search" style="font-size: 3rem; color: var(--gray-light); margin-bottom: 1rem;"></i>
          <h3>No products found</h3>
          <p>Try adjusting your search terms or browse our categories</p>
        </div>
      `;
    } else {
      this.currentFilter = "all";
      this.renderProducts();
    }
  }

  setupFilters() {
    const filterButtons = document.querySelectorAll(".collection-nav-btn");

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        // Add active class to clicked button
        button.classList.add("active");

        // Get filter value
        const filter = button.textContent.toLowerCase();
        this.currentFilter = filter === "all" ? "all" : filter;

        // Re-render products
        this.renderProducts();
      });
    });
  }

  setupModals() {
    // Close modals
    document.querySelectorAll(".close-modal").forEach((btn) => {
      btn.addEventListener("click", () => this.closeModals());
    });

    document.querySelectorAll(".modal").forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          this.closeModals();
        }
      });
    });

    // Escape key to close modals
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeModals();
      }
    });
  }

  setupProductInteractions() {
    // Add to cart
    document.addEventListener("click", (e) => {
      if (e.target.closest(".add-to-cart-btn")) {
        const productId = parseInt(
          e.target.closest(".add-to-cart-btn").dataset.id
        );
        const product = this.products.find((p) => p.id === productId);

        if (product && typeof cart !== "undefined") {
          cart.addToCart(product);
        }
      }
    });

    // Add to wishlist
    document.addEventListener("click", (e) => {
      if (e.target.closest(".wishlist-btn")) {
        const productId = parseInt(
          e.target.closest(".wishlist-btn").dataset.id
        );

        if (typeof auth !== "undefined" && auth.isAuthenticated()) {
          // Add to wishlist logic here
          if (typeof auth !== "undefined") {
            auth.showNotification("Added to wishlist", "success");
          }
        } else {
          auth.showNotification(
            "Please sign in to add items to your wishlist",
            "error"
          );
          auth.showAuthModal("login");
        }
      }
    });
  }

  setupStoryInteractions() {
    document.addEventListener("click", (e) => {
      if (e.target.closest(".read-story-btn")) {
        const storyId = parseInt(
          e.target.closest(".read-story-btn").dataset.id
        );
        this.showStoryModal(storyId);
      }
    });
  }

  setupKnowledgeInteractions() {
    document.addEventListener("click", (e) => {
      if (e.target.closest(".enroll-btn")) {
        const courseId = parseInt(e.target.closest(".enroll-btn").dataset.id);

        if (typeof auth !== "undefined" && auth.isAuthenticated()) {
          this.enrollInCourse(courseId);
        } else {
          auth.showNotification("Please sign in to enroll in courses", "error");
          auth.showAuthModal("login");
        }
      }
    });
  }

  enrollInCourse(courseId) {
    const course = this.knowledge.find((c) => c.id === courseId);
    if (!course) return;

    // In a real implementation, this would redirect to checkout
    if (typeof auth !== "undefined") {
      auth.showNotification(`Enrolling in ${course.title}`, "success");
    }

    // Simulate enrollment process
    setTimeout(() => {
      if (typeof auth !== "undefined") {
        auth.showNotification(
          "Successfully enrolled! Check your email for course access.",
          "success"
        );
      }
    }, 1000);
  }

  setupScrollEvents() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    // Observe all reveal elements
    document.querySelectorAll(".reveal").forEach((el) => {
      observer.observe(el);
    });
  }

  showStoryModal(storyId) {
    const story = this.stories.find((s) => s.id === storyId);
    if (!story) return;

    const modalBody = document.getElementById("storyModalBody");
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div class="story-modal">
        <div class="story-hero">
          <img src="${story.image}" alt="${story.title}">
          <div class="story-hero-content">
            <h1>${story.title}</h1>
            <p class="story-location">${story.location}</p>
          </div>
        </div>
        <div class="story-content-modal">
          <div class="artisan-profile">
            <img src="${story.artisan.image}" alt="${story.artisan.name}">
            <div>
              <h3>${story.artisan.name}</h3>
              <p>${story.artisan.role}</p>
              <span>${story.artisan.experience} of experience</span>
            </div>
          </div>
          <div class="story-body">
            ${story.fullStory}
          </div>
          <div class="story-stats-modal">
            <div class="stat">
              <i class="fas fa-clock"></i>
              <span>${story.stats.readTime} read</span>
            </div>
            <div class="stat">
              <i class="fas fa-heart"></i>
              <span>${story.stats.likes} likes</span>
            </div>
            <div class="stat">
              <i class="fas fa-share"></i>
              <span>${story.stats.shares} shares</span>
            </div>
          </div>
          <div class="story-actions">
            <button class="btn btn-primary" onclick="app.playStoryVideo('${story.video}')">
              <i class="fas fa-play"></i> Watch Documentary
            </button>
            <button class="btn btn-outline">
              <i class="fas fa-heart"></i> Like Story
            </button>
            <button class="btn btn-outline">
              <i class="fas fa-share"></i> Share
            </button>
          </div>
        </div>
      </div>
    `;

    this.openModal("storyModal");
  }

  playStoryVideo(videoUrl) {
    // In a real implementation, this would open a video player
    alert("Opening documentary video: " + videoUrl);
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  closeModals() {
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.classList.remove("active");
    });
    document.body.style.overflow = "auto";
  }

  hidePreloader() {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add("fade-out");
        setTimeout(() => {
          preloader.style.display = "none";
        }, 500);
      }, 1500);
    }
  }
}

// Initialize the application
const app = new FilipiKnowPremium();
window.app = app; // Make app globally available
