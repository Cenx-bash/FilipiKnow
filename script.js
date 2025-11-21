// FilipiKnow Premium Enhanced E-Commerce + KMS Application
class FilipiKnowPremium {
  constructor() {
    this.products = this.getSampleProducts();
    this.stories = this.getSampleStories();
    this.knowledge = this.getSampleKnowledge();
    this.cart = JSON.parse(localStorage.getItem("filipiknow_cart")) || [];
    this.wishlist =
      JSON.parse(localStorage.getItem("filipiknow_wishlist")) || [];
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
    this.updateCartBadge();
    this.updateWishlistBadge();
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
      {
        id: 2,
        title: "Carved Narra Wood Bowl",
        artisan: "Juan's Woodcraft",
        price: "₱3,800",
        originalPrice: "₱4,500",
        image:
          "https://images.unsplash.com/photo-1567767292271-875b8bcb5bb0?w=400&h=500&fit=crop",
        location: "Paete, Laguna",
        description:
          "Exquisitely carved narra wood bowl featuring traditional Filipino motifs.",
        materials: "Solid Narra Wood, Food-safe Finish",
        techniques: "Hand Carving, Oil Finishing",
        certification: "Artisan Guild Certified",
        story:
          "Juan learned woodcarving from his grandfather. Each piece takes 3 weeks to complete, using tools passed down through generations. The narra wood is sustainably sourced from managed forests.",
        dimensions: "30cm diameter × 15cm height",
        care: "Wipe with damp cloth, oil monthly",
        shipping: "Free shipping nationwide",
        returnPolicy: "30-day return policy",
        rating: 4.8,
        reviews: 89,
        tags: ["woodcarving", "narra", "paete", "traditional"],
        category: "woodcraft",
      },
      {
        id: 3,
        title: "Silver Filigree Jewelry Set",
        artisan: "Cordillera Silverworks",
        price: "₱6,500",
        originalPrice: "₱7,800",
        image:
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop",
        location: "Baguio City",
        description:
          "Intricate silver filigree jewelry inspired by Cordillera tribal patterns.",
        materials: "925 Sterling Silver",
        techniques: "Filigree, Lost Wax Casting",
        certification: "Indigenous Craft Certified",
        story:
          "Made by third-generation silversmiths preserving the traditional filigree techniques of the Cordillera region. Each piece is signed by the artisan and comes with a certificate of authenticity.",
        dimensions: "Necklace: 45cm, Earrings: 3cm",
        care: "Store in dry place, polish with silver cloth",
        shipping: "Free shipping nationwide",
        returnPolicy: "30-day return policy",
        rating: 5.0,
        reviews: 203,
        tags: ["silver", "filigree", "cordillera", "jewelry"],
        category: "metalwork",
      },
      {
        id: 4,
        title: "Hand-Embroidered Barong Tagalog",
        artisan: "Lumban Embroidery Collective",
        price: "₱8,900",
        originalPrice: "₱10,500",
        image:
          "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
        location: "Lumban, Laguna",
        description:
          "Exquisite hand-embroidered Barong Tagalog using traditional jusi fabric.",
        materials: "Pure Jusi Fabric, Silk Thread",
        techniques: "Hand Embroidery, Cutwork",
        certification: "Heritage Craft Certified",
        story:
          "Crafted by master embroiderers from Lumban, known as the embroidery capital of the Philippines. Each piece takes 2-3 weeks to complete with intricate designs inspired by Philippine flora.",
        dimensions: "Custom sizing available",
        care: "Dry clean only",
        shipping: "Free shipping nationwide",
        returnPolicy: "30-day return policy",
        rating: 4.9,
        reviews: 156,
        tags: ["barong", "embroidery", "lumban", "formal"],
        category: "textiles",
      },
      {
        id: 5,
        title: "Traditional Clay Pottery Set",
        artisan: "Vigan Pottery House",
        price: "₱2,800",
        originalPrice: "₱3,500",
        image:
          "https://images.unsplash.com/photo-1573152958735-6e9a6b79eba8?w=400&h=500&fit=crop",
        location: "Vigan, Ilocos Sur",
        description:
          "Traditional burnay pottery set for authentic Filipino cooking.",
        materials: "Local Clay, Natural Glaze",
        techniques: "Wheel Throwing, Wood Firing",
        certification: "Cultural Heritage Certified",
        story:
          "Using techniques brought by Chinese traders centuries ago, Vigan potters create these iconic clay jars. The wood-firing process gives each piece unique characteristics and superior heat retention.",
        dimensions: "Various sizes in set",
        care: "Season before use, hand wash",
        shipping: "Free shipping nationwide",
        returnPolicy: "30-day return policy",
        rating: 4.7,
        reviews: 94,
        tags: ["pottery", "clay", "vigan", "cooking"],
        category: "pottery",
      },
      {
        id: 6,
        title: "Abaca Fiber Handbag",
        artisan: "Bicol Weavers Cooperative",
        price: "₱2,200",
        originalPrice: "₱2,800",
        image:
          "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop",
        location: "Bicol Region",
        description: "Sustainable handbag woven from natural abaca fibers.",
        materials: "100% Abaca Fiber, Leather Trim",
        techniques: "Hand Weaving, Natural Dyeing",
        certification: "Eco-Craft Certified",
        story:
          "Woven by women artisans from the Bicol region using sustainably harvested abaca fibers. The natural dyes are extracted from local plants, making each bag unique and environmentally friendly.",
        dimensions: "25cm × 18cm × 10cm",
        care: "Spot clean with damp cloth",
        shipping: "Free shipping nationwide",
        returnPolicy: "30-day return policy",
        rating: 4.8,
        reviews: 178,
        tags: ["abaca", "handbag", "sustainable", "bicol"],
        category: "weaving",
      },
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
                    
                    <p>The process is incredibly labor-intensive. It takes approximately 1,000 pineapple leaves to produce just one meter of piña cloth. The fibers are so fine that weaving must be done during daylight hours to avoid breaking the delicate threads.</p>
                    
                    <p>Despite the challenges, a new generation is showing interest. Through our FilipiKnow authentication program, we're helping connect these master weavers with global markets that appreciate true craftsmanship.</p>
                    
                    <h4>Preservation Efforts</h4>
                    <p>Our foundation has established a training program that pairs young apprentices with master weavers. We provide sustainable income through authenticated sales and document these precious techniques for future generations.</p>
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
      {
        id: 2,
        title: "Mountain Pottery Revival",
        location: "Sagada, Mountain Province",
        image:
          "https://images.unsplash.com/photo-1573152958735-6e9a6b79eba8?w=400&h=300&fit=crop",
        excerpt:
          "How indigenous communities are reviving ancient pottery techniques.",
        fullStory: `
                    <p>Deep in the Mountain Province, indigenous communities are rediscovering their ancestral pottery methods. Using local clay and traditional firing techniques, they create functional art that tells stories of their heritage.</p>
                    
                    <p>Mang Kadu, a respected elder in his community, leads the pottery revival movement. "Our ancestors made pottery for cooking, storage, and rituals," he explains. "When plastic and metal became common, we almost lost these skills. Now, we're teaching the young ones."</p>
                    
                    <p>The clay is sourced from sacred mountains, mixed with crushed volcanic rock for strength. The pieces are sun-dried for weeks before being fired in open pits using specific woods that create unique coloration patterns.</p>
                    
                    <p>Each piece carries symbols representing protection, abundance, and connection to the land - meanings that were nearly forgotten but are now being preserved through our documentation efforts.</p>
                    
                    <h4>Cultural Significance</h4>
                    <p>Beyond their practical use, these pottery pieces serve as cultural artifacts. The patterns and shapes tell stories of creation myths, clan histories, and spiritual beliefs that have been passed down orally for generations.</p>
                `,
        artisan: {
          name: "Mang Kadu",
          role: "Pottery Master & Elder",
          image:
            "https://images.unsplash.com/photo-1573152958735-6e9a6b79eba8?w=100&h=100&fit=crop&crop=face",
          experience: "45 years",
        },
        stats: {
          readTime: "12 min",
          likes: 189,
          shares: 67,
        },
        video: "https://example.com/mountain-pottery-revival",
      },
      {
        id: 3,
        title: "The Bamboo Instrument Masters",
        location: "Bukidnon, Mindanao",
        image: "Img/Bamboo.jpeg",
        excerpt:
          "Crafting musical instruments from bamboo using ancestral techniques.",
        fullStory: `
        <p>In the highlands of Bukidnon, indigenous instrument makers continue the ancient art of crafting bamboo instruments. Each instrument is tuned to the natural frequencies of the bamboo and carries the unique voice of the forest.</p>
        
        <p>Datu Makadingding, a master instrument maker, explains: "We don't just make instruments; we help the bamboo sing. Each piece of bamboo has its own song waiting to be released. We listen to the bamboo before we cut it - if it doesn't speak to us, we leave it to grow."</p>
        
        <p>The process begins with selecting mature bamboo during specific moon phases. The instruments are tuned using traditional methods passed down through oral tradition, with some techniques dating back thousands of years.</p>
        
        <p>These instruments are used in rituals, celebrations, and storytelling sessions that preserve the community's history and cultural identity.</p>
        
        <h4>Musical Heritage</h4>
        <p>Each instrument type serves specific cultural purposes - from the kubing (jaw harp) used in courtship to the tongali (nose flute) played during healing ceremonies. The knowledge of making and playing these instruments is considered sacred.</p>
    `,
        artisan: {
          name: "Datu Makadingding",
          role: "Master Instrument Maker",
          image: "Img/Bamboomaster.jpeg", // FIXED: removed space
          experience: "52 years",
        },
        stats: {
          readTime: "18 min",
          likes: 156,
          shares: 45,
        },
        video: "https://www.youtube.com/embed/1yrYDgc5h2s", // FIXED: embed URL
      },
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
      {
        id: 2,
        title: "Woodcarving Techniques",
        description:
          "Master the traditional woodcarving methods of Paete craftsmen. Learn to transform narra wood into intricate sculptures and functional art pieces.",
        price: "₱3,000",
        originalPrice: "₱4,200",
        duration: "6 weeks",
        level: "Intermediate",
        students: 89,
        rating: 4.8,
        icon: "fas fa-hammer",
        instructor: {
          name: "Juan Dela Cruz",
          experience: "35 years",
          image:
            "https://images.unsplash.com/photo-1567767292271-875b8bcb5bb0?w=80&h=80&fit=crop&crop=face",
        },
        includes: [
          "12 video lessons",
          "Toolkit guide",
          "Personal feedback",
          "Certificate of completion",
        ],
      },
      {
        id: 3,
        title: "Natural Dye Workshop",
        description:
          "Create vibrant colors using indigenous plants and traditional methods. Learn sustainable dyeing techniques from Cordillera experts.",
        price: "₱1,800",
        originalPrice: "₱2,500",
        duration: "2 weeks",
        level: "Beginner",
        students: 203,
        rating: 4.7,
        icon: "fas fa-palette",
        instructor: {
          name: "Maria Cordillera",
          experience: "25 years",
          image:
            "https://images.unsplash.com/photo-1573152958735-6e9a6b79eba8?w=80&h=80&fit=crop&crop=face",
        },
        includes: [
          "4 video lessons",
          "Dye recipe book",
          "Plant identification guide",
          "Community forum access",
        ],
      },
      {
        id: 4,
        title: "Pottery & Ceramics",
        description:
          "Discover the art of traditional Filipino pottery from Vigan masters. Learn wheel throwing, hand-building, and wood-firing techniques.",
        price: "₱3,500",
        originalPrice: "₱4,800",
        duration: "8 weeks",
        level: "All Levels",
        students: 134,
        rating: 4.9,
        icon: "fas fa-hand-sparkles",
        instructor: {
          name: "Pottery Master Kadu",
          experience: "45 years",
          image:
            "https://images.unsplash.com/photo-1511376979163-f804dff7f6b5?w=80&h=80&fit=crop&crop=face",
        },
        includes: [
          "10 video lessons",
          "Clay preparation guide",
          "Firing techniques",
          "Digital portfolio review",
        ],
      },
    ];
  }

  renderProducts() {
    const grid = document.getElementById("productsGrid");
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
                            <div class="stars">
                                ${this.generateStars(product.rating)}
                            </div>
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
                            <button class="icon-btn wishlist-btn" data-id="${
                              product.id
                            }">
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
                                <img src="${item.instructor.image}" alt="${
          item.instructor.name
        }">
                                <div>
                                    <strong>${item.instructor.name}</strong>
                                    <span>${
                                      item.instructor.experience
                                    } experience</span>
                                </div>
                            </div>
                            
                            <div class="course-stats">
                                <span><i class="fas fa-users"></i> ${
                                  item.students
                                } students</span>
                                <span><i class="fas fa-star"></i> ${
                                  item.rating
                                }/5</span>
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
                        
                        <button class="btn btn-primary enroll-btn" data-id="${
                          item.id
                        }">
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

    if (mobileToggle) {
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
      grid.innerHTML = filteredProducts
        .map(
          (product) => `
                    <div class="product-card" data-id="${product.id}">
                        <div class="product-image">
                            <img src="${product.image}" alt="${product.title}">
                            <div class="product-badge">Authenticated</div>
                        </div>
                        <div class="product-content">
                            <h3 class="product-title">${product.title}</h3>
                            <p class="product-artisan">by ${product.artisan} • ${product.location}</p>
                            <div class="product-price">${product.price}</div>
                            <div class="product-actions">
                                <button class="btn btn-primary" onclick="app.addToCart(${product.id})">
                                    <i class="fas fa-shopping-bag"></i> Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                `
        )
        .join("");
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
    // Quick view
    document.addEventListener("click", (e) => {
      if (e.target.closest(".quick-view-btn")) {
        const productId = e.target.closest(".quick-view-btn").dataset.id;
        this.showQuickView(productId);
      }
    });

    // Add to cart
    document.addEventListener("click", (e) => {
      if (e.target.closest(".add-to-cart-btn")) {
        const productId = e.target.closest(".add-to-cart-btn").dataset.id;
        this.addToCart(parseInt(productId));
      }
    });

    // Add to wishlist
    document.addEventListener("click", (e) => {
      if (e.target.closest(".wishlist-btn")) {
        const productId = e.target.closest(".wishlist-btn").dataset.id;
        this.addToWishlist(parseInt(productId));
      }
    });

    // Product card click
    document.addEventListener("click", (e) => {
      if (
        e.target.closest(".product-card") &&
        !e.target.closest(".product-actions")
      ) {
        const productId = e.target.closest(".product-card").dataset.id;
        this.showProductModal(parseInt(productId));
      }
    });
  }

  setupStoryInteractions() {
    document.addEventListener("click", (e) => {
      if (e.target.closest(".read-story-btn")) {
        const storyId = e.target.closest(".read-story-btn").dataset.id;
        this.showStoryModal(parseInt(storyId));
      }
    });
  }

  setupKnowledgeInteractions() {
    document.addEventListener("click", (e) => {
      if (e.target.closest(".enroll-btn")) {
        const courseId = e.target.closest(".enroll-btn").dataset.id;
        this.enrollInCourse(parseInt(courseId));
      }
    });
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

  showQuickView(productId) {
    const product = this.products.find((p) => p.id === productId);
    if (!product) return;

    const panel = document.getElementById("quickViewPanel");
    const content = panel.querySelector(".quick-view-content");

    content.innerHTML = `
                <div class="quick-view-header">
                    <h3>${product.title}</h3>
                    <button class="close-quick-view"><i class="fas fa-times"></i></button>
                </div>
                <div class="quick-view-body">
                    <img src="${product.image}" alt="${product.title}">
                    <div class="quick-view-info">
                        <p class="artisan">by ${product.artisan}</p>
                        <div class="price">${product.price}</div>
                        <div class="rating">
                            ${this.generateStars(product.rating)}
                            <span>${product.rating} (${
      product.reviews
    } reviews)</span>
                        </div>
                        <p class="description">${product.description}</p>
                        <button class="btn btn-primary" onclick="app.addToCart(${
                          product.id
                        }); app.closeQuickView()">
                            <i class="fas fa-shopping-bag"></i> Add to Cart
                        </button>
                        <button class="btn btn-outline" onclick="app.showProductModal(${
                          product.id
                        }); app.closeQuickView()">
                            <i class="fas fa-expand"></i> View Details
                        </button>
                    </div>
                </div>
            `;

    panel.classList.add("active");

    // Close quick view
    content.querySelector(".close-quick-view").addEventListener("click", () => {
      this.closeQuickView();
    });
  }

  closeQuickView() {
    document.getElementById("quickViewPanel").classList.remove("active");
  }

  showProductModal(productId) {
    const product = this.products.find((p) => p.id === productId);
    if (!product) return;

    const modalBody = document.getElementById("modalBody");

    modalBody.innerHTML = `
                <div class="product-modal">
                    <div class="product-gallery">
                        <div class="main-image">
                            <img src="${product.image}" alt="${product.title}">
                        </div>
                    </div>
                    
                    <div class="product-details">
                        <div class="product-header">
                            <h1>${product.title}</h1>
                            <div class="product-meta">
                                <span class="artisan">by ${
                                  product.artisan
                                }</span>
                                <span class="location">${
                                  product.location
                                }</span>
                            </div>
                        </div>
                        
                        <div class="product-rating-large">
                            ${this.generateStars(product.rating)}
                            <span>${product.rating} • ${
      product.reviews
    } reviews</span>
                        </div>
                        
                        <div class="product-pricing-large">
                            <span class="current-price">${product.price}</span>
                            ${
                              product.originalPrice
                                ? `<span class="original-price">${product.originalPrice}</span>`
                                : ""
                            }
                        </div>
                        
                        <div class="product-description">
                            <p>${product.description}</p>
                        </div>
                        
                        <div class="product-story">
                            <h3>Artisan Story</h3>
                            <p>${product.story}</p>
                        </div>
                        
                        <div class="product-specs">
                            <div class="spec-item">
                                <strong>Materials:</strong>
                                <span>${product.materials}</span>
                            </div>
                            <div class="spec-item">
                                <strong>Techniques:</strong>
                                <span>${product.techniques}</span>
                            </div>
                            <div class="spec-item">
                                <strong>Dimensions:</strong>
                                <span>${product.dimensions}</span>
                            </div>
                            <div class="spec-item">
                                <strong>Care Instructions:</strong>
                                <span>${product.care}</span>
                            </div>
                        </div>
                        
                        <div class="authentication-badge-large">
                            <i class="fas fa-certificate"></i>
                            <div>
                                <strong>${product.certification}</strong>
                                <span>Verified by FilipiKnow Premium</span>
                            </div>
                        </div>
                        
                        <div class="product-actions-large">
                            <div class="quantity-selector">
                                <label>Quantity:</label>
                                <div class="quantity-controls">
                                    <button class="quantity-btn" onclick="app.adjustQuantity(-1)">-</button>
                                    <span class="quantity">1</span>
                                    <button class="quantity-btn" onclick="app.adjustQuantity(1)">+</button>
                                </div>
                            </div>
                            <button class="btn btn-primary btn-large" onclick="app.addToCart(${
                              product.id
                            }); app.closeModals()">
                                <i class="fas fa-shopping-bag"></i> Add to Cart - ${
                                  product.price
                                }
                            </button>
                            <button class="btn btn-outline" onclick="app.addToWishlist(${
                              product.id
                            })">
                                <i class="fas fa-heart"></i> Add to Wishlist
                            </button>
                        </div>
                        
                        <div class="shipping-info">
                            <div class="info-item">
                                <i class="fas fa-shipping-fast"></i>
                                <span>${product.shipping}</span>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-undo"></i>
                                <span>${product.returnPolicy}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;

    this.openModal("productModal");
  }

  showStoryModal(storyId) {
    const story = this.stories.find((s) => s.id === storyId);
    if (!story) return;

    const modalBody = document.getElementById("storyModalBody");

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

  adjustQuantity(change) {
    const quantityElement = document.querySelector(".quantity");
    let quantity = parseInt(quantityElement.textContent);
    quantity = Math.max(1, quantity + change);
    quantityElement.textContent = quantity;
  }

  playStoryVideo(videoUrl) {
    // In a real implementation, this would open a video player
    alert("Opening documentary video: " + videoUrl);
  }

  addToCart(productId) {
    const product = this.products.find((p) => p.id === productId);
    if (!product) return;

    const existingItem = this.cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({
        ...product,
        quantity: 1,
        addedAt: new Date().toISOString(),
      });
    }

    this.saveCart();
    this.updateCartBadge();
    this.showNotification("Added to cart", "success");
  }

  addToWishlist(productId) {
    const product = this.products.find((p) => p.id === productId);
    if (!product) return;

    const existingItem = this.wishlist.find((item) => item.id === productId);

    if (!existingItem) {
      this.wishlist.push({
        ...product,
        addedAt: new Date().toISOString(),
      });
      this.saveWishlist();
      this.updateWishlistBadge();
      this.showNotification("Added to wishlist", "success");
    } else {
      this.showNotification("Already in wishlist", "info");
    }
  }

  enrollInCourse(courseId) {
    const course = this.knowledge.find((c) => c.id === courseId);
    if (!course) return;

    // In a real implementation, this would redirect to checkout
    this.showNotification(`Enrolling in ${course.title}`, "success");

    // Simulate enrollment process
    setTimeout(() => {
      this.showNotification(
        "Successfully enrolled! Check your email for course access.",
        "success"
      );
    }, 1000);
  }

  saveCart() {
    localStorage.setItem("filipiknow_cart", JSON.stringify(this.cart));
  }

  saveWishlist() {
    localStorage.setItem("filipiknow_wishlist", JSON.stringify(this.wishlist));
  }

  updateCartBadge() {
    const badge = document.querySelector(".cart-btn .badge");
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
  }

  updateWishlistBadge() {
    const badge = document.querySelector(".wishlist-btn .badge");
    badge.textContent = this.wishlist.length;
  }

  openModal(modalId) {
    document.getElementById(modalId).classList.add("active");
    document.body.style.overflow = "hidden";
  }

  closeModals() {
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.classList.remove("active");
    });
    document.body.style.overflow = "auto";
  }

  showNotification(message, type = "success") {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
                <div class="notification-content">
                    <i class="fas fa-${
                      type === "success" ? "check" : "info"
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
                  type === "success" ? "var(--success)" : "var(--accent)"
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

  hidePreloader() {
    const preloader = document.querySelector(".preloader");
    setTimeout(() => {
      preloader.classList.add("fade-out");
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    }, 1500);
  }
}

// Add additional CSS animations
const additionalStyles = document.createElement("style");
additionalStyles.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .product-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: var(--transition);
        }
        
        .product-card:hover .product-overlay {
            opacity: 1;
        }
        
        .story-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: var(--transition);
        }
        
        .story-card:hover .story-overlay {
            opacity: 1;
        }
        
        .no-results {
            grid-column: 1 / -1;
            text-align: center;
            padding: 4rem 2rem;
            color: var(--gray);
        }
        
        .product-rating {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }
        
        .stars {
            color: var(--accent);
        }
        
        .rating-text {
            font-size: 0.8rem;
            color: var(--gray);
        }
        
        .product-pricing {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }
        
        .current-price {
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--primary);
        }
        
        .original-price {
            font-size: 1rem;
            color: var(--gray);
            text-decoration: line-through;
        }
        
        .quick-view-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--gray-light);
        }
        
        .close-quick-view {
            background: none;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            color: var(--gray);
        }
        
        .quick-view-body {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }
        
        .quick-view-body img {
            width: 100%;
            border-radius: var(--radius);
        }
        
        .product-modal {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
        }
        
        .product-gallery img {
            width: 100%;
            border-radius: var(--radius);
        }
        
        .product-header h1 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }
        
        .product-meta {
            display: flex;
            gap: 1rem;
            margin-bottom: 1rem;
            color: var(--gray);
        }
        
        .product-rating-large {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
        }
        
        .product-pricing-large {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        
        .product-pricing-large .current-price {
            font-size: 1.5rem;
        }
        
        .product-story, .product-specs {
            margin: 2rem 0;
            padding: 1.5rem;
            background: var(--light);
            border-radius: var(--radius);
        }
        
        .product-story h3, .product-specs h3 {
            margin-bottom: 1rem;
        }
        
        .spec-item {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 0;
            border-bottom: 1px solid var(--gray-light);
        }
        
        .spec-item:last-child {
            border-bottom: none;
        }
        
        .authentication-badge-large {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background: var(--light);
            border-radius: var(--radius);
            margin: 1.5rem 0;
        }
        
        .authentication-badge-large i {
            font-size: 2rem;
            color: var(--accent);
        }
        
        .product-actions-large {
            margin: 2rem 0;
        }
        
        .quantity-selector {
            margin-bottom: 1rem;
        }
        
        .quantity-controls {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-top: 0.5rem;
        }
        
        .quantity-btn {
            width: 30px;
            height: 30px;
            border: 1px solid var(--gray-light);
            background: white;
            border-radius: 50%;
            cursor: pointer;
        }
        
        .quantity {
            font-weight: 600;
        }
        
        .shipping-info {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .info-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--gray);
        }
        
        .story-modal img {
            width: 100%;
            height: 300px;
            object-fit: cover;
            border-radius: var(--radius);
        }
        
        .story-hero-content {
            text-align: center;
            margin-top: 1rem;
        }
        
        .artisan-profile {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin: 2rem 0;
            padding: 1.5rem;
            background: var(--light);
            border-radius: var(--radius);
        }
        
        .artisan-profile img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
        }
        
        .story-body {
            line-height: 1.8;
            margin-bottom: 2rem;
        }
        
        .story-body h4 {
            margin: 1.5rem 0 0.5rem 0;
            color: var(--primary);
        }
        
        .story-stats-modal {
            display: flex;
            gap: 2rem;
            margin: 2rem 0;
            padding: 1rem;
            background: var(--light);
            border-radius: var(--radius);
        }
        
        .stat {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .story-actions {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }
        
        @media (max-width: 768px) {
            .quick-view-body,
            .product-modal {
                grid-template-columns: 1fr;
            }
            
            .story-actions {
                flex-direction: column;
            }
            
            .product-actions-large .btn {
                width: 100%;
                margin-bottom: 0.5rem;
            }
        }
    `;
document.head.appendChild(additionalStyles);

// Initialize the application
const app = new FilipiKnowPremium();
window.app = app; // Make app globally available for onclick handlers
