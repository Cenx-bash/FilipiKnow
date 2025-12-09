class Database {
    constructor() {
        this.products = this.getProducts();
        this.stories = this.getStories();
        this.knowledge = this.getKnowledge();
        this.artisans = this.getArtisans();
        this.users = this.getUsers();
        this.currentUser = null;
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    }

    // Products Data
    getProducts() {
        return [
            {
                id: 1,
                title: "Handwoven Inabel Textile",
                artisan: "Maria's Weaving Collective",
                price: 4200,
                originalPrice: 5000,
                image: "images/products/handwoven.jpeg",
                location: "Ilocos Norte",
                description: "Traditional Inabel weaving using centuries-old techniques. Each thread tells a story of Ilocano heritage.",
                materials: ["100% Cotton", "Natural Dyes"],
                techniques: ["Traditional Loom Weaving", "Hand-spun Threads"],
                certification: "National Heritage Certified",
                story: "Maria's family has been weaving Inabel for five generations. This particular pattern was inspired by the waves of the West Philippine Sea and takes approximately 3 weeks to complete using traditional wooden looms.",
                dimensions: "2m x 1.5m",
                care: "Hand wash cold, dry flat",
                shipping: "Free shipping nationwide",
                returnPolicy: "30-day return policy",
                rating: 4.9,
                reviews: 127,
                tags: ["weaving", "textile", "traditional", "ilocos"],
                category: "weaving",
                stock: 15,
                featured: true
            },
            {
                id: 2,
                title: "Narra Wood Carving",
                artisan: "Paete Woodcarvers Guild",
                price: 8500,
                originalPrice: 9500,
                image: "images/products/narrawoodcraving.jpeg",
                location: "Paete, Laguna",
                description: "Intricate Narra wood carving depicting Filipino folklore scenes. Hand-carved by master craftsmen.",
                materials: ["Narra Wood", "Natural Polish"],
                techniques: ["Hand Carving", "Relief Sculpture"],
                certification: "Heritage Artisan Certified",
                story: "The Paete woodcarving tradition dates back to the Spanish colonial period. Each piece is carved from a single block of Narra wood, with artisans spending up to 80 hours on intricate details.",
                dimensions: "30cm x 20cm x 15cm",
                care: "Dust with soft cloth, avoid direct sunlight",
                shipping: "Free shipping nationwide",
                returnPolicy: "30-day return policy",
                rating: 4.8,
                reviews: 89,
                tags: ["woodcraft", "carving", "sculpture", "narra"],
                category: "woodcraft",
                stock: 8,
                featured: true
            },
            {
                id: 3,
                title: "Silver Filigree Jewelry Set",
                artisan: "Cordillera Silversmiths",
                price: 3200,
                image: "images/products/jewelry.jpg",
                location: "Cordillera Region",
                description: "Exquisite silver filigree jewelry set featuring traditional Cordillera patterns.",
                materials: ["925 Sterling Silver"],
                techniques: ["Filigree", "Hand Forging"],
                certification: "Authentic Cordillera Craft",
                story: "The filigree technique was introduced to the Cordillera region in the 19th century. Each piece is meticulously crafted by twisting and soldering fine silver threads into intricate patterns.",
                dimensions: "Varies by piece",
                care: "Store in dry place, polish with silver cloth",
                shipping: "Free shipping nationwide",
                returnPolicy: "30-day return policy",
                rating: 4.7,
                reviews: 156,
                tags: ["metalwork", "jewelry", "filigree", "silver"],
                category: "metalwork",
                stock: 25,
                featured: false
            },
            {
                id: 4,
                title: "Burnay Pottery Jar",
                artisan: "Vigan Pottery Collective",
                price: 2800,
                originalPrice: 3500,
                image: "images/products/jar.png",
                location: "Vigan, Ilocos Sur",
                description: "Traditional Burnay jar made using ancient pottery techniques, perfect for fermentation.",
                materials: ["Local Clay", "River Sand"],
                techniques: ["Wheel Throwing", "Wood Firing"],
                certification: "Traditional Pottery Certified",
                story: "The Burnay pottery tradition in Vigan has been preserved for over 400 years. These jars are still made using methods passed down from Chinese immigrants who settled in the area during the Spanish era.",
                dimensions: "40cm height x 30cm diameter",
                care: "Hand wash only, avoid sudden temperature changes",
                shipping: "Free shipping nationwide",
                returnPolicy: "30-day return policy",
                rating: 4.6,
                reviews: 73,
                tags: ["pottery", "jar", "traditional", "vigan"],
                category: "pottery",
                stock: 12,
                featured: true
            },
            {
                id: 5,
                title: "Piña-Seda Embroidered Shawl",
                artisan: "Aklan Piña Weavers",
                price: 9800,
                image: "images/products/pina-seda.png",
                location: "Aklan, Visayas",
                description: "Luxurious shawl made from pineapple fiber and silk, featuring intricate embroidery.",
                materials: ["Piña Fiber", "Silk Thread"],
                techniques: ["Hand Weaving", "Embroidery"],
                certification: "Premium Heritage Product",
                story: "Piña cloth, made from pineapple fibers, is one of the most delicate textiles in the world. This shawl represents months of painstaking work by master weavers who maintain this dying art form.",
                dimensions: "2m x 1m",
                care: "Dry clean only",
                shipping: "Free shipping worldwide",
                returnPolicy: "30-day return policy",
                rating: 4.9,
                reviews: 42,
                tags: ["textile", "weaving", "pineapple", "embroidery"],
                category: "textiles",
                stock: 5,
                featured: false
            },
            {
                id: 6,
                title: "Brass Tribal Mask",
                artisan: "Mountain Province Artisans",
                price: 5500,
                originalPrice: 6500,
                image: "images/products/mask.png",
                location: "Mountain Province",
                description: "Hand-crafted brass mask depicting traditional tribal deities and guardians.",
                materials: ["Brass", "Copper Inlay"],
                techniques: ["Lost Wax Casting", "Hand Chasing"],
                certification: "Cultural Artifact Replica",
                story: "These masks are replicas of ancient tribal artifacts used in rituals and ceremonies. Each piece is individually cast using the traditional lost wax method, a technique dating back thousands of years.",
                dimensions: "25cm x 20cm x 10cm",
                care: "Polish with brass cleaner, avoid moisture",
                shipping: "Free shipping nationwide",
                returnPolicy: "30-day return policy",
                rating: 4.5,
                reviews: 31,
                tags: ["metalwork", "mask", "tribal", "brass"],
                category: "metalwork",
                stock: 7,
                featured: true
            }
        ];
    }

    // Stories Data
    getStories() {
        return [
            {
                id: 1,
                title: "The Last Piña Weavers",
                location: "Aklan, Visayas",
                image: "images/products/handwoven.jpeg",
                excerpt: "Meet the artisans keeping the delicate piña cloth tradition alive against modern challenges.",
                fullStory: `
                    <p>In the quiet towns of Aklan, a handful of master weavers continue the centuries-old tradition of piña cloth making. Using fibers from pineapple leaves, they create some of the world's most delicate and luxurious textiles.</p>
                    <p>Doña Elena, at 78 years old, is one of the last master weavers who remembers the techniques passed down from Spanish colonial times. "My grandmother taught me when I was seven," she recalls, her fingers still moving deftly across the loom. "Each thread must be extracted carefully from the pineapple leaf, then knotted by hand. It takes patience that young people today don't have."</p>
                    <p>The process is labor-intensive. For one meter of piña cloth, a weaver needs approximately 1,200 pineapple leaves. Each leaf yields only a few centimeters of fiber, which must be hand-scraped, washed, dried, and knotted before it can be woven.</p>
                    <p>"Young people want quick money," Doña Elena says with a sigh. "They go to the city to work in call centers or factories. They don't want to spend months learning something that might not make them rich."</p>
                    <p>Despite the challenges, there is hope. Organizations like FilipiKnow are working to document these techniques and create sustainable markets for traditional crafts. Through masterclasses and online platforms, they're connecting weavers with global customers who appreciate handmade quality.</p>
                    <p>"When I see young designers using piña in modern clothing," Doña Elena smiles, "I feel like maybe this tradition won't die with me. Maybe it will change, evolve, but it will live on."</p>
                `,
                artisan: {
                    name: "Doña Elena Santos",
                    role: "5th Generation Weaver",
                    image: "images/women.jpeg",
                    experience: "71 years",
                    quote: "Every thread tells a story of patience and perseverance."
                },
                stats: {
                    readTime: "15 min",
                    likes: 234,
                    shares: 89,
                    views: 1567
                },
                video: "images/products/Bamboo_video.mp4",
                featured: false
            },
            {
                id: 2,
                title: "The Woodcarvers of Paete",
                location: "Paete, Laguna",
                image: "images/products/woodcraving.jpeg",
                excerpt: "In the carving capital of the Philippines, artisans transform wood into masterpieces.",
                fullStory: `
                    <p>Paete, a small town in Laguna, has been the woodcarving capital of the Philippines for over 400 years. The name "Paete" itself comes from the Spanish word for chisel, "pait."</p>
                    <p>Master carver Juan Dela Cruz, 65, represents the fourth generation of woodcarvers in his family. His workshop is filled with the scent of freshly cut Narra and Acacia wood, and the sound of chisels tapping rhythmically.</p>
                    <p>"My great-grandfather carved religious icons for churches during the Spanish time," Juan explains. "My grandfather survived the war by carving furniture for American soldiers. My father adapted to tourism by making souvenirs. Now, I create both traditional and contemporary pieces."</p>
                    <p>The process begins with selecting the right wood. Narra is preferred for its durability and beautiful grain, but it's becoming increasingly rare. Acacia and mahogany are common alternatives.</p>
                    <p>"A simple piece might take a week," Juan says. "But a complex religious sculpture can take months. You have to understand the wood—its grain, its hardness, how it will age."</p>
                    <p>Today, Paete faces challenges from mass-produced imports and changing tastes. But the town's carvers are adapting, creating everything from traditional saints to modern abstract sculptures.</p>
                    <p>"Woodcarving isn't just a job here," Juan says proudly. "It's our identity. It's in our blood."</p>
                `,
                artisan: {
                    name: "Juan Dela Cruz",
                    role: "Master Woodcarver",
                    image: "images/man.jpeg",
                    experience: "45 years",
                    quote: "The wood speaks to you if you listen carefully."
                },
                stats: {
                    readTime: "12 min",
                    likes: 189,
                    shares: 67,
                    views: 1245
                },
                video: "videos/woodcarving.mp4",
                featured: false
            }
        ];
    }

    // Knowledge Data
    getKnowledge() {
        return [
            {
                id: 1,
                title: "Traditional Weaving Masterclass",
                description: "Learn the ancient art of Filipino weaving from master artisans in Ilocos Norte. This comprehensive course covers everything from thread preparation to complex patterns.",
                price: 2500,
                originalPrice: 3500,
                duration: "4 weeks",
                level: "Beginner to Advanced",
                students: 156,
                rating: 4.9,
                icon: "fas fa-vest",
                instructor: {
                    name: "Master Weaver Elena",
                    experience: "40 years",
                    image: "images/womenF.jpeg"
                },
                includes: [
                    "8 video lessons",
                    "Live Q&A sessions",
                    "Digital certification",
                    "Community access",
                    "E-book with patterns"
                ],
                featured: false
            },
            {
                id: 2,
                title: "Woodcarving Fundamentals",
                description: "Master the basic techniques of Filipino woodcarving, from tool handling to finishing methods.",
                price: 1800,
                originalPrice: 2200,
                duration: "3 weeks",
                level: "Beginner",
                students: 89,
                rating: 4.7,
                icon: "fas fa-tree",
                instructor: {
                    name: "Master Carver Juan",
                    experience: "45 years",
                    image: "images/manTwo.jpeg"
                },
                includes: [
                    "6 video lessons",
                    "Tool kit guide",
                    "Pattern templates",
                    "Community access"
                ],
                featured: false
            },
            {
                id: 3,
                title: "HandWoven Fundamentals",
                description: "Master the basic techniques of Filipino handwoven for scratch",
                price: 1500,
                originalPrice: 2000,
                level: "Beginner",
                students: 156,
                rating: 4.7,
                icon: "fas fa-globe",
                instructor: {
                    name: "Master Joe Doe",
                    experience: "45 years",
                    image: "images/man.jpeg"
                },
                includes: [
                    "6 video lessons",
                    "Tool kit guide",
                    "Pattern templates"
                ],
                featured: false
            }
        ];
    }

    // Artisans Data
    getArtisans() {
        return [
            {
                id: 1,
                name: "Maria Santos",
                craft: "Weaving",
                location: "Ilocos Norte",
                experience: "40 years",
                image: "images/womenF.jpeg",
                story: "Fifth generation weaver specializing in Inabel textiles",
                products: 15,
                rating: 4.9
            },
            {
                id: 2,
                name: "Juan Dela Cruz",
                craft: "Woodcarving",
                location: "Paete, Laguna",
                experience: "45 years",
                image: "images/man.jpeg",
                story: "Master carver preserving traditional religious sculpture",
                products: 22,
                rating: 4.8
            },
            {
                id: 3,
                name: "Elena Torres",
                craft: "Pottery",
                location: "Vigan, Ilocos Sur",
                experience: "35 years",
                image: "images/woman.jpeg",
                story: "Burnay pottery specialist using ancient techniques",
                products: 18,
                rating: 4.7
            }
        ];
    }

    // Users Data
    getUsers() {
        return JSON.parse(localStorage.getItem('users')) || [
            {
                id: 1,
                email: "demo@filipiknow.com",
                password: "demo123",
                name: "Demo User",
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
            }
        ];
    }

    // Save users to localStorage
    saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    // Cart methods
    addToCart(product, quantity = 1) {
        const existingItem = this.cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                ...product,
                quantity: quantity
            });
        }

        this.saveCart();
        return this.cart;
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        return this.cart;
    }

    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
            }
        }
        this.saveCart();
        return this.cart;
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
    }

    // Wishlist methods
    addToWishlist(product) {
        if (!this.wishlist.find(item => item.id === product.id)) {
            this.wishlist.push(product);
            this.saveWishlist();
        }
        return this.wishlist;
    }

    removeFromWishlist(productId) {
        this.wishlist = this.wishlist.filter(item => item.id !== productId);
        this.saveWishlist();
        return this.wishlist;
    }

    saveWishlist() {
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    }

    // User authentication
    login(email, password) {
        const user = this.users.find(user =>
            user.email === email && user.password === password
        );

        if (user) {
            this.currentUser = { ...user };
            delete this.currentUser.password;
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            return { success: true, user: this.currentUser };
        }

        return { success: false, message: "Invalid email or password" };
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }

    register(name, email, password) {
        // Check if user exists
        if (this.users.find(user => user.email === email)) {
            return { success: false, message: "Email already registered" };
        }

        // Create new user
        const newUser = {
            id: this.users.length + 1,
            name,
            email,
            password,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=8b7355&color=fff`
        };

        this.users.push(newUser);
        this.saveUsers();

        // Auto login
        this.currentUser = { ...newUser };
        delete this.currentUser.password;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

        return { success: true, user: this.currentUser };
    }

    getCurrentUser() {
        if (!this.currentUser) {
            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                this.currentUser = JSON.parse(savedUser);
            }
        }
        return this.currentUser;
    }

    // Search functionality
    searchProducts(query) {
        const searchTerm = query.toLowerCase();
        return this.products.filter(product =>
            product.title.toLowerCase().includes(searchTerm) ||
            product.artisan.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }

    // Filter products by category
    getProductsByCategory(category) {
        if (category === 'all') return this.products;
        return this.products.filter(product => product.category === category);
    }

    // Get featured products
    getFeaturedProducts() {
        return this.products.filter(product => product.featured);
    }

    // Get featured story
    getFeaturedStory() {
        return this.stories.find(story => story.featured);
    }

    // Get featured knowledge
    getFeaturedKnowledge() {
        return this.knowledge.find(item => item.featured);
    }
}

// Initialize database
const db = new Database();
window.db = db;