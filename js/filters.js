// ============================================
// FILTERS & DESTINATIONS PAGE LOGIC
// ============================================

class DestinationsPage {
    constructor() {
        this.destinations = destinationsData || [];
        this.filteredDestinations = [...this.destinations];
        this.activeFilters = {
            category: [],
            region: [],
            difficulty: [],
            priceMin: 0,
            priceMax: 200
        };
        this.currentSort = 'popular';
        this.currentView = 'grid';

        this.init();
    }

    init() {
        this.cacheElements();
        this.attachEventListeners();
        this.renderDestinations();
        this.updateResultsCount();

        // Listen for storage changes (cross-tab sync)
        window.addEventListener('storage', (e) => {
            if (e.key === 'wishlist') {
                const wishlist = JSON.parse(e.newValue || '[]');

                // Update visible buttons
                const wishlistBtns = document.querySelectorAll('.wishlist-btn');
                wishlistBtns.forEach(btn => {
                    const destId = btn.dataset.id;
                    const dest = this.destinations.find(d => d.id === destId);
                    if (dest) {
                        if (wishlist.includes(dest.name)) {
                            btn.classList.add('active');
                        } else {
                            btn.classList.remove('active');
                        }
                    }
                });

                // Update header count
                const countEl = document.getElementById('wishlistCount');
                if (countEl) {
                    countEl.textContent = wishlist.length;
                    countEl.style.display = wishlist.length > 0 ? 'flex' : 'none';
                }
            }
        });
    }

    cacheElements() {
        // Filter elements
        this.filterSidebar = document.getElementById('filterSidebar');
        this.filterToggle = document.getElementById('filterToggle');
        this.clearFiltersBtn = document.getElementById('clearFilters');
        this.activeFiltersContainer = document.getElementById('activeFilters');
        this.applyFiltersBtn = document.getElementById('applyFilters');

        // Checkboxes
        this.categoryCheckboxes = document.querySelectorAll('input[name="category"]');
        this.regionCheckboxes = document.querySelectorAll('input[name="region"]');
        this.difficultyCheckboxes = document.querySelectorAll('input[name="difficulty"]');

        // Price inputs
        this.minPriceInput = document.getElementById('minPrice');
        this.maxPriceInput = document.getElementById('maxPrice');
        this.priceRangeSlider = document.getElementById('priceRange');

        // Toolbar elements
        this.sortSelect = document.getElementById('sortSelect');
        this.resultsCount = document.getElementById('resultsCount');
        this.viewButtons = document.querySelectorAll('.view-btn');

        // Grid and no results
        this.destinationsGrid = document.getElementById('destinationsGrid');
        this.noResults = document.getElementById('noResults');
        this.resetFiltersBtn = document.getElementById('resetFilters');
    }

    attachEventListeners() {
        // Filter toggle (mobile)
        if (this.filterToggle) {
            this.filterToggle.addEventListener('click', () => this.toggleFilterSidebar());
        }

        // Clear all filters
        if (this.clearFiltersBtn) {
            this.clearFiltersBtn.addEventListener('click', () => this.clearAllFilters());
        }

        // Reset filters (from no results)
        if (this.resetFiltersBtn) {
            this.resetFiltersBtn.addEventListener('click', () => this.clearAllFilters());
        }

        // Apply filters (mobile)
        if (this.applyFiltersBtn) {
            this.applyFiltersBtn.addEventListener('click', () => {
                this.toggleFilterSidebar();
                this.applyFilters();
            });
        }

        // Category checkboxes
        this.categoryCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.handleFilterChange());
        });

        // Region checkboxes
        this.regionCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.handleFilterChange());
        });

        // Difficulty checkboxes
        this.difficultyCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.handleFilterChange());
        });

        // Price inputs
        if (this.minPriceInput) {
            this.minPriceInput.addEventListener('input', () => this.handlePriceChange());
        }
        if (this.maxPriceInput) {
            this.maxPriceInput.addEventListener('input', () => this.handlePriceChange());
        }
        if (this.priceRangeSlider) {
            this.priceRangeSlider.addEventListener('input', (e) => {
                this.maxPriceInput.value = e.target.value;
                this.handlePriceChange();
            });
        }

        // Sort select
        if (this.sortSelect) {
            this.sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.sortDestinations();
                this.renderDestinations();
            });
        }

        // View toggle
        this.viewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.currentView = e.currentTarget.dataset.view;
                this.updateViewButtons();
                this.updateGridView();
            });
        });

        // Close filter sidebar when clicking overlay (mobile)
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024 &&
                this.filterSidebar &&
                this.filterSidebar.classList.contains('active') &&
                !this.filterSidebar.contains(e.target) &&
                !this.filterToggle.contains(e.target)) {
                this.toggleFilterSidebar();
            }
        });

        // Wishlist Event Delegation (Robust handling for dynamic elements)
        if (this.destinationsGrid) {
            this.destinationsGrid.addEventListener('click', (e) => {
                const btn = e.target.closest('.wishlist-btn');
                if (btn) {
                    const id = btn.dataset.id;
                    this.toggleWishlist(e, id);
                }
            });
        }
    }

    toggleFilterSidebar() {
        if (this.filterSidebar) {
            this.filterSidebar.classList.toggle('active');

            // Create/remove overlay
            let overlay = document.querySelector('.filter-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'filter-overlay';
                document.body.appendChild(overlay);
            }
            overlay.classList.toggle('active');
        }
    }

    handleFilterChange() {
        // Update active filters object
        this.activeFilters.category = Array.from(this.categoryCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        this.activeFilters.region = Array.from(this.regionCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        this.activeFilters.difficulty = Array.from(this.difficultyCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        this.applyFilters();
    }

    handlePriceChange() {
        this.activeFilters.priceMin = parseInt(this.minPriceInput.value) || 0;
        this.activeFilters.priceMax = parseInt(this.maxPriceInput.value) || 200;

        // Update slider
        if (this.priceRangeSlider) {
            this.priceRangeSlider.value = this.activeFilters.priceMax;
        }

        this.applyFilters();
    }

    applyFilters() {
        this.filteredDestinations = this.destinations.filter(dest => {
            // Category filter
            if (this.activeFilters.category.length > 0) {
                const hasCategory = dest.category.some(cat =>
                    this.activeFilters.category.includes(cat)
                );
                if (!hasCategory) return false;
            }

            // Region filter
            if (this.activeFilters.region.length > 0) {
                if (!this.activeFilters.region.includes(dest.region)) {
                    return false;
                }
            }

            // Difficulty filter
            if (this.activeFilters.difficulty.length > 0) {
                const destDifficulty = dest.difficulty.split('-')[0]; // Handle 'easy-moderate'
                const hasMatchingDifficulty = this.activeFilters.difficulty.some(diff =>
                    destDifficulty.includes(diff)
                );
                if (!hasMatchingDifficulty) return false;
            }

            // Price filter
            if (dest.price.min > this.activeFilters.priceMax ||
                dest.price.max < this.activeFilters.priceMin) {
                return false;
            }

            return true;
        });

        this.sortDestinations();
        this.renderDestinations();
        this.updateResultsCount();
        this.renderActiveFilters();
    }

    sortDestinations() {
        switch (this.currentSort) {
            case 'rating':
                this.filteredDestinations.sort((a, b) => b.rating - a.rating);
                break;
            case 'price-low':
                this.filteredDestinations.sort((a, b) => a.price.min - b.price.min);
                break;
            case 'price-high':
                this.filteredDestinations.sort((a, b) => b.price.max - a.price.max);
                break;
            case 'name':
                this.filteredDestinations.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'popular':
            default:
                this.filteredDestinations.sort((a, b) => b.reviews - a.reviews);
                break;
        }
    }

    renderDestinations() {
        if (this.filteredDestinations.length === 0) {
            this.destinationsGrid.style.display = 'none';
            this.noResults.style.display = 'block';
            return;
        }

        this.destinationsGrid.style.display = 'grid';
        this.noResults.style.display = 'none';

        this.destinationsGrid.innerHTML = this.filteredDestinations.map((dest, index) => `
            <article class="destination-card" data-id="${dest.id}" style="animation: fadeIn 0.5s ease both ${index * 0.1}s">
                <div class="card-image">
                    <img src="${dest.images[0]}" alt="${dest.name}">
                    <button class="wishlist-btn" aria-label="Add to wishlist" data-id="${dest.id}">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12 21L3 12C1 10 1 7 3 5C5 3 8 3 10 5L12 7L14 5C16 3 19 3 21 5C23 7 23 10 21 12L12 21Z"
                                stroke="currentColor" stroke-width="2" />
                        </svg>
                    </button>

                    ${this.getBadgeHtml(dest)}
                </div>
                <div class="card-content">
                    <div class="card-header">
                        <div>
                            <h3 class="card-title">${dest.name}</h3>
                            <p class="card-location">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path
                                        d="M8 1.5C5.51472 1.5 3.5 3.51472 3.5 6C3.5 9.5 8 14.5 8 14.5C8 14.5 12.5 9.5 12.5 6C12.5 3.51472 10.4853 1.5 8 1.5Z"
                                        stroke="currentColor" stroke-width="1.5" />
                                    <circle cx="8" cy="6" r="1.5" stroke="currentColor" stroke-width="1.5" />
                                </svg>
                                ${this.formatRegion(dest.region)}
                            </p>
                        </div>
                        <div class="card-rating">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path
                                    d="M8 1L10 5.5L15 6.25L11.5 9.5L12.5 15L8 12.5L3.5 15L4.5 9.5L1 6.25L6 5.5L8 1Z" />
                            </svg>
                            <span>${dest.rating}</span>
                        </div>
                    </div>
                    <p class="card-description">${dest.shortDescription}</p>
                    <div class="card-footer">
                        <div class="card-tags">
                            ${dest.tags.slice(0, 2).map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <a href="destination-detail.html?id=${dest.id}" class="btn-card">Explore</a>
                    </div>
                </div>
            </article>
        `).join('');
        // Re-attach wishlist listeners
        this.attachWishlistListeners();
    }

    toggleWishlist(e, destId) {
        e.preventDefault();
        e.stopPropagation();

        const btn = e.currentTarget;
        const dest = this.destinations.find(d => d.id === destId);

        if (!dest) return;

        const title = dest.name;
        let currentWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

        if (currentWishlist.includes(title)) {
            // Remove
            currentWishlist = currentWishlist.filter(item => item !== title);
            btn.classList.remove('active');
        } else {
            // Add
            if (!currentWishlist.includes(title)) currentWishlist.push(title);
            btn.classList.add('active');

            // Animation
            btn.style.transform = 'scale(1.3)';
            setTimeout(() => btn.style.transform = 'scale(1)', 200);
        }

        // Save
        localStorage.setItem('wishlist', JSON.stringify(currentWishlist));

        // Update App State
        if (typeof appState !== 'undefined') {
            appState.wishlist = currentWishlist;
        }

        // Update Header
        const countEl = document.getElementById('wishlistCount');
        if (countEl) {
            countEl.textContent = currentWishlist.length;
            countEl.style.display = currentWishlist.length > 0 ? 'flex' : 'none';
        }
    }

    attachWishlistListeners() {
        const wishlistBtns = document.querySelectorAll('.wishlist-btn');
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

        wishlistBtns.forEach(btn => {
            const destId = btn.dataset.id;
            const dest = this.destinations.find(d => d.id === destId);

            if (dest && wishlist.includes(dest.name)) {
                btn.classList.add('active');
            }
        });
    }

    formatRegion(region) {
        const regionMap = {
            'cultural-triangle': 'Cultural Triangle',
            'hill-country': 'Hill Country',
            'southern-coast': 'Southern Coast',
            'central': 'Central Province',
            'southeast': 'Southeast Coast'
        };
        return regionMap[region] || region;
    }

    renderActiveFilters() {
        const filters = [];

        // Category filters
        this.activeFilters.category.forEach(cat => {
            filters.push({ type: 'category', value: cat, label: this.capitalize(cat) });
        });

        // Region filters
        this.activeFilters.region.forEach(reg => {
            filters.push({ type: 'region', value: reg, label: this.formatRegion(reg) });
        });

        // Difficulty filters
        this.activeFilters.difficulty.forEach(diff => {
            filters.push({ type: 'difficulty', value: diff, label: this.capitalize(diff) });
        });

        // Price filter
        if (this.activeFilters.priceMin > 0 || this.activeFilters.priceMax < 200) {
            filters.push({
                type: 'price',
                value: 'price',
                label: `$${this.activeFilters.priceMin}-$${this.activeFilters.priceMax}`
            });
        }

        this.activeFiltersContainer.innerHTML = filters.map(filter => `
            <div class="filter-badge">
                <span>${filter.label}</span>
                <button onclick="destinationsPage.removeFilter('${filter.type}', '${filter.value}')">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>
        `).join('');
    }

    removeFilter(type, value) {
        if (type === 'price') {
            this.minPriceInput.value = 0;
            this.maxPriceInput.value = 200;
            this.priceRangeSlider.value = 200;
            this.handlePriceChange();
        } else {
            const checkbox = document.querySelector(`input[name="${type}"][value="${value}"]`);
            if (checkbox) {
                checkbox.checked = false;
                this.handleFilterChange();
            }
        }
    }

    clearAllFilters() {
        // Uncheck all checkboxes
        [...this.categoryCheckboxes, ...this.regionCheckboxes, ...this.difficultyCheckboxes].forEach(cb => {
            cb.checked = false;
        });

        // Reset price
        this.minPriceInput.value = 0;
        this.maxPriceInput.value = 200;
        this.priceRangeSlider.value = 200;

        // Reset filters
        this.activeFilters = {
            category: [],
            region: [],
            difficulty: [],
            priceMin: 0,
            priceMax: 200
        };

        this.applyFilters();
    }

    updateResultsCount() {
        const count = this.filteredDestinations.length;
        this.resultsCount.textContent = `Showing ${count} destination${count !== 1 ? 's' : ''}`;
    }

    updateViewButtons() {
        this.viewButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === this.currentView);
        });
    }

    updateGridView() {
        if (this.currentView === 'list') {
            this.destinationsGrid.classList.add('list-view');
        } else {
            this.destinationsGrid.classList.remove('list-view');
        }
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    getBadgeHtml(dest) {
        if (dest.category.includes('unesco')) {
            return '<div class="card-badge">UNESCO Site</div>';
        } else if (dest.category.includes('beach')) {
            return '<div class="card-badge">Top Beach</div>';
        } else if (dest.category.includes('wildlife')) {
            return '<div class="card-badge">Wildlife</div>';
        } else if (dest.category.includes('nature')) {
            return '<div class="card-badge">Nature</div>';
        } else if (dest.category.includes('hiking')) {
            return '<div class="card-badge">Top Hiking</div>';
        } else if (dest.category.includes('adventure')) {
            return '<div class="card-badge">Adventure</div>';
        } else if (dest.category.includes('culture')) {
            return '<div class="card-badge">Cultural</div>';
        }
        return '';
    }
}

// Initialize when DOM is ready
// Initialize when DOM is ready
let destinationsPage;
document.addEventListener('DOMContentLoaded', () => {
    destinationsPage = new DestinationsPage();
});
