/* ============================================
   MAIN APP LOGIC - Sri Lanka Travel App
   ============================================ */

// ============================================
// STATE MANAGEMENT
// ============================================

const appState = {
    wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
    searchHistory: JSON.parse(localStorage.getItem('searchHistory')) || [],
    currentTab: 'destinations'
};

// ============================================
// NAVIGATION
// ============================================

class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.mobileMenuToggle = document.getElementById('mobileMenuToggle');
        this.init();
    }

    init() {
        // Scroll effect
        window.addEventListener('scroll', () => this.handleScroll());

        // Mobile menu toggle
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Smooth scroll for nav links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.smoothScroll(e));
        });
    }

    handleScroll() {
        if (window.scrollY > 100) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    toggleMobileMenu() {
        // Mobile menu implementation
        console.log('Mobile menu toggled');
    }

    smoothScroll(e) {
        const href = e.currentTarget.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    }
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

class SearchWidget {
    constructor() {
        this.searchInput = document.getElementById('searchLocation');
        this.searchSuggestions = document.getElementById('searchSuggestions');
        this.searchTabs = document.querySelectorAll('.search-tab');
        this.destinations = this.getDestinations();
        this.init();
    }

    init() {
        // Search input
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => this.handleSearch(e));
            this.searchInput.addEventListener('focus', () => this.showSuggestions());

            // Close suggestions when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.search-field')) {
                    this.hideSuggestions();
                }
            });
        }

        // Search tabs
        this.searchTabs.forEach(tab => {
            tab.addEventListener('click', (e) => this.switchTab(e));
        });
    }

    getDestinations() {
        return [
            { name: 'Sigiriya', region: 'Cultural Triangle', type: 'destination' },
            { name: 'Ella', region: 'Hill Country', type: 'destination' },
            { name: 'Galle Fort', region: 'Southern Coast', type: 'destination' },
            { name: 'Mirissa', region: 'South Coast', type: 'destination' },
            { name: 'Yala National Park', region: 'Southeast Coast', type: 'destination' },
            { name: 'Kandy', region: 'Central Province', type: 'destination' },
            { name: 'Nuwara Eliya', region: 'Hill Country', type: 'destination' },
            { name: 'Arugam Bay', region: 'East Coast', type: 'destination' },
            { name: 'Anuradhapura', region: 'Cultural Triangle', type: 'destination' },
            { name: 'Polonnaruwa', region: 'Cultural Triangle', type: 'destination' },
            { name: 'Wildlife Safari', type: 'experience' },
            { name: 'Train Journey', type: 'experience' },
            { name: 'Temple Tour', type: 'experience' },
            { name: 'Beach Activities', type: 'experience' },
            { name: 'Food Tour', type: 'experience' },
            { name: 'Ayurveda Retreat', type: 'experience' }
        ];
    }

    handleSearch(e) {
        const query = e.target.value.toLowerCase().trim();

        if (query.length < 2) {
            this.hideSuggestions();
            return;
        }

        const filtered = this.destinations.filter(dest =>
            dest.name.toLowerCase().includes(query) ||
            (dest.region && dest.region.toLowerCase().includes(query))
        );

        this.displaySuggestions(filtered);
    }

    displaySuggestions(suggestions) {
        if (suggestions.length === 0) {
            this.hideSuggestions();
            return;
        }

        const html = suggestions.map(item => `
            <div class="suggestion-item" data-name="${item.name}">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2C6.68629 2 4 4.68629 4 8C4 12 10 18 10 18C10 18 16 12 16 8C16 4.68629 13.3137 2 10 2Z" stroke="currentColor" stroke-width="2"/>
                    <circle cx="10" cy="8" r="2" stroke="currentColor" stroke-width="2"/>
                </svg>
                <div>
                    <div class="suggestion-name">${item.name}</div>
                    ${item.region ? `<div class="suggestion-region">${item.region}</div>` : ''}
                </div>
            </div>
        `).join('');

        this.searchSuggestions.innerHTML = html;
        this.searchSuggestions.style.display = 'block';

        // Add click handlers
        this.searchSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => this.selectSuggestion(item));
        });
    }

    selectSuggestion(item) {
        const name = item.dataset.name;
        this.searchInput.value = name;
        this.hideSuggestions();

        // Save to search history
        this.addToSearchHistory(name);
    }

    showSuggestions() {
        if (this.searchSuggestions.innerHTML) {
            this.searchSuggestions.style.display = 'block';
        }
    }

    hideSuggestions() {
        this.searchSuggestions.style.display = 'none';
    }

    switchTab(e) {
        const tab = e.currentTarget;
        const tabType = tab.dataset.tab;

        // Update active state
        this.searchTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Update state
        appState.currentTab = tabType;

        // Update placeholder
        if (tabType === 'destinations') {
            this.searchInput.placeholder = 'Search destinations...';
        } else {
            this.searchInput.placeholder = 'Search experiences...';
        }
    }

    addToSearchHistory(query) {
        if (!appState.searchHistory.includes(query)) {
            appState.searchHistory.unshift(query);
            if (appState.searchHistory.length > 10) {
                appState.searchHistory.pop();
            }
            localStorage.setItem('searchHistory', JSON.stringify(appState.searchHistory));
        }
    }
}

// ============================================
// WISHLIST FUNCTIONALITY
// ============================================

class Wishlist {
    constructor() {
        this.wishlistBtn = document.getElementById('wishlistBtn');
        this.wishlistCount = document.getElementById('wishlistCount');
        this.init();
    }

    init() {
        this.updateCount();
        this.syncUI();
        this.attachWishlistButtons();

        // Listen for storage changes (cross-tab sync)
        window.addEventListener('storage', (e) => {
            if (e.key === 'wishlist') {
                appState.wishlist = JSON.parse(e.newValue || '[]');
                this.updateCount();
                this.syncUI();
            }
        });
    }

    syncUI() {
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            const card = btn.closest('.destination-card, .experience-card');
            if (card) {
                const titleEl = card.querySelector('.card-title, .experience-title');
                if (titleEl) {
                    const title = titleEl.textContent.trim();
                    if (appState.wishlist.includes(title)) {
                        btn.classList.add('active');
                    }
                }
            }
        });
    }

    attachWishlistButtons() {
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.toggleWishlist(e));
        });
    }

    toggleWishlist(e) {
        e.preventDefault();
        e.stopPropagation();

        const btn = e.currentTarget;
        const card = btn.closest('.destination-card, .experience-card');
        const title = card.querySelector('.card-title, .experience-title').textContent.trim();

        if (btn.classList.contains('active')) {
            this.removeFromWishlist(title);
            btn.classList.remove('active');
        } else {
            this.addToWishlist(title);
            btn.classList.add('active');
            this.animateHeart(btn);
        }
    }

    addToWishlist(item) {
        if (!appState.wishlist.includes(item)) {
            appState.wishlist.push(item);
            this.saveWishlist();
            this.updateCount();
        }
    }

    removeFromWishlist(item) {
        appState.wishlist = appState.wishlist.filter(i => i !== item);
        this.saveWishlist();
        this.updateCount();
    }

    saveWishlist() {
        localStorage.setItem('wishlist', JSON.stringify(appState.wishlist));
    }

    updateCount() {
        if (this.wishlistCount) {
            this.wishlistCount.textContent = appState.wishlist.length;
            if (appState.wishlist.length > 0) {
                this.wishlistCount.style.display = 'flex';
            } else {
                this.wishlistCount.style.display = 'none';
            }
        }
    }

    animateHeart(btn) {
        btn.style.transform = 'scale(1.3)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 200);
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, this.observerOptions);

        // Observe cards
        document.querySelectorAll('.destination-card, .experience-card, .testimonial-card').forEach((card, index) => {
            card.classList.add('fade-in');
            // Reduced delay with modulo to avoid long waits on lists
            card.style.transitionDelay = `${(index % 3) * 0.05}s`;
            observer.observe(card);
        });
    }
}

// ============================================
// NEWSLETTER FORM
// ============================================

class Newsletter {
    constructor() {
        this.form = document.getElementById('newsletterForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const email = this.form.querySelector('input[type="email"]').value;

        // Simulate API call
        this.showSuccess();
        this.form.reset();
    }

    showSuccess() {
        const btn = this.form.querySelector('.btn-newsletter');
        const originalText = btn.innerHTML;

        btn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 10L8 13L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Subscribed!
        `;

        setTimeout(() => {
            btn.innerHTML = originalText;
        }, 3000);
    }
}

// ============================================
// DATE PICKER (Simple Implementation)
// ============================================

class DatePicker {
    constructor() {
        this.dateInput = document.getElementById('searchDates');
        this.guestsInput = document.getElementById('searchGuests');
        this.init();
    }

    init() {
        if (this.dateInput) {
            this.dateInput.addEventListener('click', () => {
                this.dateInput.value = 'Feb 15 - Feb 22, 2026';
            });
        }

        if (this.guestsInput) {
            this.guestsInput.addEventListener('click', () => {
                this.guestsInput.value = '2 Adults';
            });
        }
    }
}

// ============================================
// CARD INTERACTIONS
// ============================================

class CardInteractions {
    constructor() {
        this.init();
    }

    init() {
        // Add click handlers to destination cards
        document.querySelectorAll('.destination-card, .experience-card').forEach(card => {
            card.addEventListener('click', (e) => {
                // Don't trigger if clicking wishlist button
                if (!e.target.closest('.wishlist-btn')) {
                    this.handleCardClick(card);
                }
            });
        });

        // Prevent card click when clicking buttons
        document.querySelectorAll('.btn-card, .btn-experience').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });
    }

    handleCardClick(card) {
        const title = card.querySelector('.card-title, .experience-title').textContent;
        console.log(`Navigating to: ${title}`);
        // In a real app, this would navigate to a detail page
    }
}

// ============================================
// PAGE LOADER
// ============================================

class PageLoader {
    constructor() {
        this.loader = document.getElementById('pageLoader');
        this.init();
    }

    init() {
        // Hide loader after page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.hideLoader();
            }, 1000);
        });
    }

    hideLoader() {
        if (this.loader) {
            this.loader.classList.add('hidden');
            setTimeout(() => {
                this.loader.style.display = 'none';
            }, 500);
        }
    }
}

// ============================================
// BACK TO TOP BUTTON
// ============================================

class BackToTop {
    constructor() {
        this.button = document.getElementById('backToTop');
        this.init();
    }

    init() {
        if (!this.button) return;

        // Show/hide on scroll
        window.addEventListener('scroll', () => this.handleScroll());

        // Click to scroll to top
        this.button.addEventListener('click', () => this.scrollToTop());
    }

    handleScroll() {
        if (window.scrollY > 500) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// ============================================
// INITIALIZE APP
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new PageLoader();
    new BackToTop();
    new Navigation();
    new SearchWidget();
    new Wishlist();
    new ScrollAnimations();
    new Newsletter();
    new DatePicker();
    new CardInteractions();

    // Add custom styles for suggestions
    addSuggestionStyles();

    console.log('🌴 Sri Lanka Travel App Initialized');
});

// ============================================
// HELPER FUNCTIONS
// ============================================

function addSuggestionStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .suggestion-item {
            display: flex;
            align-items: center;
            gap: var(--space-3);
            padding: var(--space-3) var(--space-4);
            cursor: pointer;
            transition: background var(--transition-fast);
        }
        
        .suggestion-item:hover {
            background: var(--gray-50);
        }
        
        .suggestion-item svg {
            color: var(--primary);
            flex-shrink: 0;
        }
        
        .suggestion-name {
            font-weight: var(--font-semibold);
            color: var(--gray-800);
        }
        
        .suggestion-region {
            font-size: var(--text-sm);
            color: var(--gray-500);
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
