// Main Application for FilipiKnow Premium
class FilipiKnowApp {
    constructor() {
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeApp();
            });
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        this.setupEventListeners();
        this.renderHeroCards();
        this.renderProducts();
        this.renderStories();
        this.renderKnowledge();
        this.renderArtisans();
        this.setupScrollAnimations();
        this.hidePreloader();

        // Initialize other components if they exist
        if (typeof auth !== 'undefined') {
            auth.updateUI();
            auth.updateWishlistCount();
        }

        if (typeof cart !== 'undefined') {
            cart.updateCartCount();
        }
    }

    setupEventListeners() {
        // Navigation
        this.setupNavigation();

        // Search functionality
        this.setupSearch();

        // Filters
        this.setupFilters();

        // Modals
        this.setupModals();

        // Product interactions
        this.setupProductInteractions();

        // Story interactions
        this.setupStoryInteractions();

        // Knowledge interactions
        this.setupKnowledgeInteractions();

        // Scroll events
        this.setupScrollEvents();

        // Cart interactions
        this.setupCartInteractions();
    }

    setupNavigation() {
        // Nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                this.scrollToSection(section);

                // Update active state
                document.querySelectorAll('.nav-link').forEach(l => {
                    l.classList.remove('active');
                });
                link.classList.add('active');
            });
        });

        // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                mobileToggle.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                });
            });
        }

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    setupSearch() {
        const searchToggle = document.querySelector('.search-toggle');
        const searchBox = document.querySelector('.search-box');
        const searchInput = document.querySelector('.search-input');
        const searchClose = document.querySelector('.search-close');

        if (searchToggle && searchBox) {
            searchToggle.addEventListener('click', () => {
                searchBox.classList.toggle('active');
                if (searchBox.classList.contains('active')) {
                    searchInput.focus();
                }
            });

            searchClose.addEventListener('click', () => {
                searchBox.classList.remove('active');
                searchInput.value = '';
                document.querySelector('.search-results').innerHTML = '';
            });

            // Search functionality
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (query.length > 2) {
                    this.performSearch(query);
                } else {
                    document.querySelector('.search-results').innerHTML = '';
                }
            });

            // Close search when clicking outside
            document.addEventListener('click', (e) => {
                if (!searchToggle.contains(e.target) && !searchBox.contains(e.target)) {
                    searchBox.classList.remove('active');
                }
            });
        }
    }

    performSearch(query) {
        const results = db.searchProducts(query);
        const resultsContainer = document.querySelector('.search-results');

        if (!resultsContainer) return;

        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <p>No products found for "${query}"</p>
                </div>
            `;
            return;
        }

        resultsContainer.innerHTML = results.slice(0, 5).map(product => `
            <div class="search-result-item" data-id="${product.id}">
                <img src="${product.image}" alt="${product.title}" class="search-result-image">
                <div class="search-result-info">
                    <h4>${product.title}</h4>
                    <p>${product.artisan} • ₱${product.price.toLocaleString()}</p>
                </div>
            </div>
        `).join('');

        // Add click events to search results
        resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const productId = parseInt(item.dataset.id);
                this.showProductModal(productId);
                document.querySelector('.search-box').classList.remove('active');
                searchInput.value = '';
                resultsContainer.innerHTML = '';
            });
        });
    }

    setupFilters() {
        document.querySelectorAll('.collection-nav-btn').forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                document.querySelectorAll('.collection-nav-btn').forEach(btn => {
                    btn.classList.remove('active');
                });

                // Add active class to clicked button
                button.classList.add('active');

                // Get filter value
                this.currentFilter = button.dataset.filter || 'all';

                // Re-render products
                this.renderProducts();
            });
        });
    }

    setupModals() {
        // Close modals
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => this.closeModals());
        });

        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModals();
                }
            });
        });

        // Escape key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModals();
            }
        });
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    }

    setupProductInteractions() {
        // Add to cart buttons
        document.addEventListener('click', (e) => {
            const addToCartBtn = e.target.closest('.add-to-cart-btn');
            if (addToCartBtn) {
                e.preventDefault();
                e.stopPropagation();
                const productId = parseInt(addToCartBtn.dataset.id);
                if (typeof cart !== 'undefined') {
                    cart.addToCart(productId, 1);
                }
            }
        });

        // Quick view buttons
        document.addEventListener('click', (e) => {
            const quickViewBtn = e.target.closest('.quick-view-btn');
            if (quickViewBtn) {
                e.preventDefault();
                e.stopPropagation();
                const productId = parseInt(quickViewBtn.dataset.id);
                this.showProductModal(productId);
            }
        });

        // Wishlist buttons
        document.addEventListener('click', (e) => {
            const wishlistBtn = e.target.closest('.wishlist-btn');
            if (wishlistBtn) {
                e.preventDefault();
                e.stopPropagation();
                const productId = parseInt(wishlistBtn.dataset.id);
                this.toggleWishlist(productId, wishlistBtn);
            }
        });

        // Product card clicks (for quick view)
        document.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            if (productCard && !e.target.closest('.product-actions')) {
                const productId = parseInt(productCard.dataset.id);
                this.showProductModal(productId);
            }
        });
    }

    setupCartInteractions() {
        // Cart toggle
        const cartToggle = document.querySelector('.cart-toggle');
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
    }

    setupStoryInteractions() {
        // Story card clicks
        document.addEventListener('click', (e) => {
            const storyCard = e.target.closest('.story-card');
            if (storyCard) {
                const storyId = parseInt(storyCard.dataset.id);
                this.showStoryModal(storyId);
            }
        });

        // Read story buttons
        document.addEventListener('click', (e) => {
            const readStoryBtn = e.target.closest('.read-story-btn');
            if (readStoryBtn) {
                e.preventDefault();
                const storyId = parseInt(readStoryBtn.dataset.id);
                this.showStoryModal(storyId);
            }
        });
    }

    setupKnowledgeInteractions() {
        // Enroll buttons
        document.addEventListener('click', (e) => {
            const enrollBtn = e.target.closest('.enroll-btn');
            if (enrollBtn) {
                e.preventDefault();
                const courseId = parseInt(enrollBtn.dataset.id);
                this.enrollInCourse(courseId);
            }
        });
    }

    setupScrollEvents() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                if (this.getAttribute('href') === '#') return;

                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);

                if (target) {
                    const headerHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top;
                    const offsetPosition = targetPosition + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Hero scroll indicator
        document.querySelector('.hero-scroll-indicator')?.addEventListener('click', () => {
            const firstSection = document.querySelector('section[id]');
            if (firstSection) {
                window.scrollTo({
                    top: firstSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        // Observe all reveal elements
        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });

        // Observe sections for nav highlighting
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.dataset.section === id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // Render Methods
    renderHeroCards() {
        const floatingCards = document.querySelector('.floating-cards');
        if (!floatingCards) return;

        const featuredProducts = db.getFeaturedProducts().slice(0, 3);

        floatingCards.innerHTML = featuredProducts.map((product, index) => `
            <div class="craft-card card-${index + 1}" data-id="${product.id}">
                <div class="card-image">
                    <img src="${product.image}" alt="${product.title}">
                    <div class="card-overlay">
                        <button class="btn btn-primary btn-small quick-view-btn" data-id="${product.id}">
                            <i class="fas fa-eye"></i> Quick View
                        </button>
                    </div>
                </div>
                <div class="card-content">
                    <div class="card-header">
                        <h3>${product.title}</h3>
                        <div class="card-badge">
                            <i class="fas fa-certificate"></i>
                        </div>
                    </div>
                    <p>${product.location}</p>
                    <div class="card-meta">
                        <span class="meta-item">
                            <i class="fas fa-star"></i>
                            ${product.rating}/5
                        </span>
                        <span class="meta-item">
                            <i class="fas fa-tag"></i>
                            ₱${product.price.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderProducts() {
        const grid = document.getElementById('productsGrid');
        if (!grid) return;

        const products = db.getProductsByCategory(this.currentFilter);

        if (products.length === 0) {
            grid.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-box-open fa-3x"></i>
                    <h3>No products found</h3>
                    <p>Try selecting a different category</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = products.map(product => `
            <div class="product-card reveal" data-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                    ${product.featured ? '<div class="product-badge">Featured</div>' : ''}
                    <div class="product-overlay">
                        <button class="btn btn-primary btn-small quick-view-btn" data-id="${product.id}">
                            <i class="fas fa-eye"></i> Quick View
                        </button>
                    </div>
                </div>
                <div class="product-content">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-artisan">by ${product.artisan} • ${product.location}</p>
                    <div class="product-rating">
                        <div class="stars">${this.generateStars(product.rating)}</div>
                        <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
                    </div>
                    <div class="product-pricing">
                        <span class="current-price">₱${product.price.toLocaleString()}</span>
                        ${product.originalPrice ?
            `<span class="original-price">₱${product.originalPrice.toLocaleString()}</span>` : ''}
                    </div>
                    <div class="product-actions">
                        <button class="icon-btn wishlist-btn" data-id="${product.id}" title="Add to Wishlist">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}">
                            <i class="fas fa-shopping-bag"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderStories() {
        const featuredStory = document.querySelector('.featured-story');
        const storiesGrid = document.getElementById('storiesGrid');

        if (!featuredStory || !storiesGrid) return;

        // Featured story
        const featured = db.getFeaturedStory();
        if (featured) {
            featuredStory.innerHTML = `
                <div class="featured-story-content">
                    <div class="featured-story-badge">Featured Story</div>
                    <h3>${featured.title}</h3>
                    <p class="featured-story-excerpt">${featured.excerpt}</p>
                    <div class="featured-story-meta">
                        <div class="artisan-info">
                            <img src="${featured.artisan.image}" alt="${featured.artisan.name}">
                            <div>
                                <strong>${featured.artisan.name}</strong>
                                <span>${featured.artisan.role}</span>
                            </div>
                        </div>
                        <div class="featured-story-stats">
                            <span><i class="fas fa-clock"></i> ${featured.stats.readTime} read</span>
                            <span><i class="fas fa-heart"></i> ${featured.stats.likes}</span>
                        </div>
                    </div>
                    <button class="btn btn-primary story-play-btn" data-video="${featured.video}">
                        <i class="fas fa-play-circle"></i>
                        Watch Documentary
                    </button>
                </div>
                <div class="featured-story-visual">
                    <img src="${featured.image}" alt="${featured.title}">
                    <div class="featured-story-play-btn story-play-btn" data-video="${featured.video}">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
            `;
        }

        // Other stories
        const otherStories = db.stories.filter(story => !story.featured);
        storiesGrid.innerHTML = otherStories.map(story => `
            <div class="story-card reveal" data-id="${story.id}">
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
        `).join('');
    }

    renderKnowledge() {
        const knowledgeFeatured = document.querySelector('.knowledge-featured');
        const knowledgeGrid = document.getElementById('knowledgeGrid');

        if (!knowledgeFeatured || !knowledgeGrid) return;

        // Other knowledge items (featured knowledge might not exist in db)
        const allKnowledge = db.knowledge;
        if (allKnowledge.length > 0) {
            // Use first as featured
            const featured = allKnowledge[0];
            knowledgeFeatured.innerHTML = `
                <div class="featured-class">
                    <div class="class-content">
                        <div class="class-badge">Most Popular</div>
                        <h3>${featured.title}</h3>
                        <p class="class-description">${featured.description}</p>
                        <div class="class-meta">
                            <div class="instructor">
                                <img src="${featured.instructor.image}" alt="${featured.instructor.name}">
                                <div>
                                    <strong>${featured.instructor.name}</strong>
                                    <span>${featured.instructor.experience} experience</span>
                                </div>
                            </div>
                            <div class="class-stats">
                                <span><i class="fas fa-users"></i> ${featured.students} students</span>
                                <span><i class="fas fa-star"></i> ${featured.rating}/5</span>
                            </div>
                        </div>
                        <div class="class-pricing">
                            <span class="price">₱${featured.price.toLocaleString()}</span>
                            ${featured.originalPrice ?
                `<span class="original-price">₱${featured.originalPrice.toLocaleString()}</span>
                                 <span class="discount">${Math.round((1 - featured.price/featured.originalPrice) * 100)}% off</span>` : ''}
                        </div>
                        <button class="btn btn-primary enroll-btn" data-id="${featured.id}">
                            <i class="fas fa-shopping-cart"></i>
                            Enroll Now
                        </button>
                    </div>
                    <div class="class-preview">
                        <img src="${featured.image || 'images/class.jpg'}" alt="${featured.title}">
                        <div class="preview-overlay">
                            <button class="btn btn-outline story-play-btn" data-video="videos/class-preview.mp4">
                                <i class="fas fa-play"></i>
                                Preview Class
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }

        // Other knowledge items
        const otherKnowledge = allKnowledge.slice(1);
        knowledgeGrid.innerHTML = otherKnowledge.map(item => `
            <div class="knowledge-card reveal" data-id="${item.id}">
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
                            <span><i class="fas fa-users"></i> ${item.students} students</span>
                            <span><i class="fas fa-star"></i> ${item.rating}/5</span>
                        </div>
                    </div>
                    ${item.duration ? `
                        <div class="course-details">
                            <span class="duration"><i class="fas fa-clock"></i> ${item.duration}</span>
                            <span class="level"><i class="fas fa-signal"></i> ${item.level || 'Beginner'}</span>
                        </div>
                    ` : ''}
                    <div class="knowledge-pricing">
                        <span class="price">₱${item.price.toLocaleString()}</span>
                        ${item.originalPrice ?
            `<span class="original-price">₱${item.originalPrice.toLocaleString()}</span>` : ''}
                    </div>
                    <button class="btn btn-primary enroll-btn" data-id="${item.id}">
                        <i class="fas fa-shopping-cart"></i> Enroll Now
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderArtisans() {
        const artisansGrid = document.getElementById('artisansGrid');
        if (!artisansGrid) return;

        artisansGrid.innerHTML = db.artisans.map(artisan => `
            <div class="artisan-card reveal">
                <div class="artisan-image">
                    <img src="${artisan.image}" alt="${artisan.name}">
                    <div class="artisan-badge">
                        <i class="fas fa-certificate"></i>
                        <span>Master Artisan</span>
                    </div>
                </div>
                <div class="artisan-content">
                    <h3>${artisan.name}</h3>
                    <p class="artisan-craft">${artisan.craft}</p>
                    <p class="artisan-location">${artisan.location}</p>
                    <div class="artisan-stats">
                        <div class="artisan-stat">
                            <i class="fas fa-clock"></i>
                            <span>${artisan.experience}</span>
                        </div>
                        <div class="artisan-stat">
                            <i class="fas fa-box"></i>
                            <span>${artisan.products} products</span>
                        </div>
                        <div class="artisan-stat">
                            <i class="fas fa-star"></i>
                            <span>${artisan.rating}/5</span>
                        </div>
                    </div>
                    <p class="artisan-story">${artisan.story}</p>
                    <button class="btn btn-outline view-artisan-btn" data-id="${artisan.id}">
                        <i class="fas fa-eye"></i> View Profile
                    </button>
                </div>
            </div>
        `).join('');

        // Add event listeners for artisan buttons
        document.querySelectorAll('.view-artisan-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const artisanId = parseInt(e.target.closest('.view-artisan-btn').dataset.id);
                this.showArtisanModal(artisanId);
            });
        });
    }

    // Helper Methods
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';

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

    // Modal Methods
    showProductModal(productId) {
        const product = db.products.find(p => p.id === productId);
        if (!product) return;

        const modalBody = document.getElementById('modalBody');
        if (!modalBody) return;

        modalBody.innerHTML = `
            <div class="product-modal">
                <div class="product-modal-gallery">
                    <div class="main-image">
                        <img src="${product.image}" alt="${product.title}">
                    </div>
                </div>
                <div class="product-modal-info">
                    <div class="product-header">
                        <h1>${product.title}</h1>
                        <div class="product-rating">
                            <div class="stars">${this.generateStars(product.rating)}</div>
                            <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
                        </div>
                    </div>
                    
                    <div class="product-artisan-info">
                        <div class="artisan-avatar">
                            <i class="fas fa-user-circle"></i>
                        </div>
                        <div>
                            <h3>${product.artisan}</h3>
                            <p>${product.location}</p>
                        </div>
                    </div>
                    
                    <div class="product-description">
                        <p>${product.description}</p>
                    </div>
                    
                    <div class="product-details">
                        <h3>Details</h3>
                        <div class="details-grid">
                            <div class="detail">
                                <span class="label">Materials:</span>
                                <span class="value">${product.materials.join(', ')}</span>
                            </div>
                            <div class="detail">
                                <span class="label">Techniques:</span>
                                <span class="value">${product.techniques.join(', ')}</span>
                            </div>
                            <div class="detail">
                                <span class="label">Dimensions:</span>
                                <span class="value">${product.dimensions}</span>
                            </div>
                            <div class="detail">
                                <span class="label">Care Instructions:</span>
                                <span class="value">${product.care}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="product-story">
                        <h3>The Story</h3>
                        <p>${product.story}</p>
                    </div>
                    
                    <div class="product-pricing-modal">
                        <div class="price-section">
                            <span class="current-price">₱${product.price.toLocaleString()}</span>
                            ${product.originalPrice ?
            `<span class="original-price">₱${product.originalPrice.toLocaleString()}</span>` : ''}
                        </div>
                        <div class="stock-info">
                            <i class="fas fa-box"></i>
                            <span>${product.stock} in stock</span>
                        </div>
                    </div>
                    
                    <div class="product-actions-modal">
                        <div class="quantity-control">
                            <button class="quantity-btn minus">-</button>
                            <input type="number" class="quantity-input" value="1" min="1" max="${product.stock}">
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="btn btn-primary add-to-cart-modal" data-id="${product.id}">
                            <i class="fas fa-shopping-bag"></i> Add to Cart
                        </button>
                        <button class="btn btn-outline wishlist-modal" data-id="${product.id}">
                            <i class="fas fa-heart"></i> Add to Wishlist
                        </button>
                    </div>
                    
                    <div class="product-shipping">
                        <div class="shipping-info">
                            <i class="fas fa-shipping-fast"></i>
                            <div>
                                <strong>${product.shipping}</strong>
                                <p>Estimated delivery: 3-7 business days</p>
                            </div>
                        </div>
                        <div class="return-info">
                            <i class="fas fa-undo"></i>
                            <div>
                                <strong>${product.returnPolicy}</strong>
                                <p>Easy returns within 30 days</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners for modal controls
        this.setupProductModalListeners(product);

        // Show modal
        const modal = document.getElementById('productModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    setupProductModalListeners(product) {
        // Quantity controls
        const quantityInput = document.querySelector('.quantity-input');
        const minusBtn = document.querySelector('.quantity-btn.minus');
        const plusBtn = document.querySelector('.quantity-btn.plus');

        minusBtn?.addEventListener('click', () => {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });

        plusBtn?.addEventListener('click', () => {
            let value = parseInt(quantityInput.value);
            if (value < product.stock) {
                quantityInput.value = value + 1;
            }
        });

        quantityInput?.addEventListener('change', () => {
            let value = parseInt(quantityInput.value);
            if (value < 1) quantityInput.value = 1;
            if (value > product.stock) quantityInput.value = product.stock;
        });

        // Add to cart button in modal
        const addToCartBtn = document.querySelector('.add-to-cart-modal');
        addToCartBtn?.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value);
            if (typeof cart !== 'undefined') {
                cart.addToCart(product.id, quantity);
            }
            this.closeModal('productModal');
        });

        // Wishlist button in modal
        const wishlistBtn = document.querySelector('.wishlist-modal');
        wishlistBtn?.addEventListener('click', () => {
            this.toggleWishlist(product.id);
            this.closeModal('productModal');
        });
    }

    showStoryModal(storyId) {
        const story = db.stories.find(s => s.id === storyId);
        if (!story) return;

        const modalBody = document.getElementById('modalBody');
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
                    <div class="artisan-quote">
                        <i class="fas fa-quote-left"></i>
                        <p>"${story.artisan.quote}"</p>
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
                        <div class="stat">
                            <i class="fas fa-eye"></i>
                            <span>${story.stats.views} views</span>
                        </div>
                    </div>
                    <div class="story-actions">
                        <button class="btn btn-primary story-play-btn" data-video="${story.video}">
                            <i class="fas fa-play"></i> Watch Documentary
                        </button>
                        <button class="btn btn-outline like-story-btn" data-id="${story.id}">
                            <i class="fas fa-heart"></i> Like Story
                        </button>
                        <button class="btn btn-outline share-story-btn" data-id="${story.id}">
                            <i class="fas fa-share"></i> Share
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners
        const likeBtn = modalBody.querySelector('.like-story-btn');
        likeBtn?.addEventListener('click', () => {
            story.stats.likes++;
            likeBtn.innerHTML = `<i class="fas fa-heart"></i> Liked (${story.stats.likes})`;
            likeBtn.classList.add('liked');
            if (typeof auth !== 'undefined') {
                auth.showNotification('Story liked!', 'success');
            }
        });

        const shareBtn = modalBody.querySelector('.share-story-btn');
        shareBtn?.addEventListener('click', () => {
            this.shareStory(story.id);
        });

        // Show modal
        const modal = document.getElementById('productModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    showArtisanModal(artisanId) {
        const artisan = db.artisans.find(a => a.id === artisanId);
        if (!artisan) return;

        const modalBody = document.getElementById('modalBody');
        if (!modalBody) return;

        // Get artisan's products
        const artisanProducts = db.products.filter(p => p.artisan.includes(artisan.name));

        modalBody.innerHTML = `
            <div class="artisan-modal">
                <div class="artisan-modal-header">
                    <img src="${artisan.image}" alt="${artisan.name}">
                    <div class="artisan-header-info">
                        <h1>${artisan.name}</h1>
                        <p class="craft">${artisan.craft} • ${artisan.location}</p>
                        <div class="artisan-rating">
                            <div class="stars">${this.generateStars(artisan.rating)}</div>
                            <span class="rating-text">${artisan.rating}/5</span>
                        </div>
                    </div>
                </div>
                <div class="artisan-modal-body">
                    <div class="artisan-stats-modal">
                        <div class="stat">
                            <i class="fas fa-clock"></i>
                            <div>
                                <span class="stat-value">${artisan.experience}</span>
                                <span class="stat-label">Experience</span>
                            </div>
                        </div>
                        <div class="stat">
                            <i class="fas fa-box"></i>
                            <div>
                                <span class="stat-value">${artisan.products}</span>
                                <span class="stat-label">Products</span>
                            </div>
                        </div>
                        <div class="stat">
                            <i class="fas fa-star"></i>
                            <div>
                                <span class="stat-value">${artisan.rating}/5</span>
                                <span class="stat-label">Rating</span>
                            </div>
                        </div>
                    </div>
                    <div class="artisan-bio">
                        <h3>Biography</h3>
                        <p>${artisan.story}</p>
                    </div>
                    ${artisanProducts.length > 0 ? `
                        <div class="artisan-products">
                            <h3>Featured Products</h3>
                            <div class="products-mini-grid">
                                ${artisanProducts.slice(0, 3).map(product => `
                                    <div class="mini-product-card" data-id="${product.id}">
                                        <img src="${product.image}" alt="${product.title}">
                                        <div class="mini-product-info">
                                            <h4>${product.title}</h4>
                                            <p>₱${product.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;

        // Add click events to mini product cards
        modalBody.querySelectorAll('.mini-product-card').forEach(card => {
            card.addEventListener('click', () => {
                const productId = parseInt(card.dataset.id);
                this.showProductModal(productId);
            });
        });

        // Show modal
        const modal = document.getElementById('productModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Wishlist functionality
    toggleWishlist(productId, button = null) {
        if (typeof auth !== 'undefined' && !auth.isAuthenticated()) {
            auth.showNotification('Please sign in to add items to wishlist', 'error');
            auth.showAuthModal('login');
            return;
        }

        const product = db.products.find(p => p.id === productId);
        if (!product) return;

        const isInWishlist = db.wishlist.find(item => item.id === productId);

        if (isInWishlist) {
            db.removeFromWishlist(productId);
            if (button) {
                button.innerHTML = '<i class="far fa-heart"></i>';
            }
            if (typeof auth !== 'undefined') {
                auth.showNotification('Removed from wishlist', 'info');
                auth.updateWishlistCount();
            }
        } else {
            db.addToWishlist(product);
            if (button) {
                button.innerHTML = '<i class="fas fa-heart"></i>';
            }
            if (typeof auth !== 'undefined') {
                auth.showNotification('Added to wishlist', 'success');
                auth.updateWishlistCount();
            }
        }
    }

    // Course enrollment
    enrollInCourse(courseId) {
        if (typeof auth !== 'undefined' && !auth.isAuthenticated()) {
            auth.showNotification('Please sign in to enroll in courses', 'error');
            auth.showAuthModal('login');
            return;
        }

        const course = db.knowledge.find(c => c.id === courseId);
        if (!course) return;

        // Show loading overlay
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('active');
        }

        // Simulate enrollment process
        setTimeout(() => {
            if (loadingOverlay) {
                loadingOverlay.classList.remove('active');
            }

            if (typeof auth !== 'undefined') {
                auth.showNotification(
                    `Successfully enrolled in ${course.title}! Check your email for course access.`,
                    'success'
                );
            }
        }, 1500);
    }

    // Story sharing
    shareStory(storyId) {
        const story = db.stories.find(s => s.id === storyId);
        if (!story) return;

        if (navigator.share) {
            navigator.share({
                title: story.title,
                text: story.excerpt,
                url: window.location.href
            }).then(() => {
                story.stats.shares++;
                if (typeof auth !== 'undefined') {
                    auth.showNotification('Story shared successfully!', 'success');
                }
            }).catch(err => {
                console.log('Error sharing:', err);
                this.copyStoryLink(story);
            });
        } else {
            this.copyStoryLink(story);
        }
    }

    copyStoryLink(story) {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            if (typeof auth !== 'undefined') {
                auth.showNotification('Story link copied to clipboard!', 'success');
            }
        }).catch(err => {
            console.log('Error copying:', err);
            if (typeof auth !== 'undefined') {
                auth.showNotification('Could not share story', 'error');
            }
        });
    }

    hidePreloader() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 1500);
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const app = new FilipiKnowApp();
    window.app = app;
});