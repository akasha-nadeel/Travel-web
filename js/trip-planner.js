/* ============================================
   TRIP PLANNER LOGIC
   ============================================ */

// ============================================
// STATE MANAGEMENT
// ============================================

const tripState = {
    name: 'My Sri Lanka Adventure',
    dates: 'Feb 15 - Feb 22, 2026',
    duration: 7,
    travelers: '2 Adults',
    destinations: JSON.parse(localStorage.getItem('tripDestinations')) || [],
    budget: 0
};

// ============================================
// TRIP PLANNER CLASS
// ============================================

class TripPlanner {
    constructor() {
        this.destinations = destinationsData || [];
        this.filteredDestinations = [...this.destinations];
        this.map = null;
        this.markers = [];
        this.routeLine = null;
        this.init();
    }

    init() {
        this.loadTripData();
        this.renderDestinations();
        this.updateTripSummary();
        this.initializeMap();
        this.attachEventListeners();
        this.hideLoader();
    }

    hideLoader() {
        const loader = document.getElementById('pageLoader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 300);
            }, 500);
        }
    }

    loadTripData() {
        // Load saved trip data from localStorage
        const savedTrip = localStorage.getItem('currentTrip');
        if (savedTrip) {
            const trip = JSON.parse(savedTrip);
            tripState.name = trip.name || tripState.name;
            tripState.dates = trip.dates || tripState.dates;
            tripState.duration = trip.duration || tripState.duration;
            tripState.travelers = trip.travelers || tripState.travelers;
        }

        // Update form fields
        document.getElementById('tripName').value = tripState.name;
        document.getElementById('tripDates').value = tripState.dates;
        document.getElementById('tripDuration').textContent = `${tripState.duration} Days`;
        document.getElementById('tripTravelers').textContent = tripState.travelers;
    }

    attachEventListeners() {
        // Search
        const searchInput = document.getElementById('plannerSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }

        // Filter tabs
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.handleFilter(e.target.dataset.category));
        });

        // Trip name input
        const tripNameInput = document.getElementById('tripName');
        if (tripNameInput) {
            tripNameInput.addEventListener('change', (e) => {
                tripState.name = e.target.value;
                this.saveTripData();
            });
        }

        // Action buttons
        const saveBtn = document.getElementById('saveTrip');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveTrip());
        }

        const shareBtn = document.getElementById('shareTrip');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.shareTrip());
        }

        const clearBtn = document.getElementById('clearTrip');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearTrip());
        }
    }

    handleSearch(query) {
        const searchTerm = query.toLowerCase().trim();

        if (searchTerm === '') {
            this.filteredDestinations = [...this.destinations];
        } else {
            this.filteredDestinations = this.destinations.filter(dest =>
                dest.name.toLowerCase().includes(searchTerm) ||
                dest.shortDescription.toLowerCase().includes(searchTerm) ||
                dest.region.toLowerCase().includes(searchTerm)
            );
        }

        this.renderDestinations();
    }

    handleFilter(category) {
        // Update active tab
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.category === category) {
                tab.classList.add('active');
            }
        });

        // Filter destinations
        if (category === 'all') {
            this.filteredDestinations = [...this.destinations];
        } else {
            this.filteredDestinations = this.destinations.filter(dest =>
                dest.category.includes(category)
            );
        }

        this.renderDestinations();
    }

    renderDestinations() {
        const grid = document.getElementById('plannerDestinationsGrid');
        if (!grid) return;

        if (this.filteredDestinations.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="m21 21-4.35-4.35"/>
                    </svg>
                    <p>No destinations found</p>
                    <small>Try adjusting your search or filters</small>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.filteredDestinations.map(dest => {
            const isInTrip = tripState.destinations.some(d => d.id === dest.id);
            const mainImage = dest.images && dest.images[0] ? dest.images[0] : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800';

            return `
                <div class="planner-destination-card ${isInTrip ? 'in-trip' : ''}" data-id="${dest.id}">
                    <div class="planner-card-image">
                        <img src="${mainImage}" alt="${dest.name}">
                        <div class="planner-card-badge">${dest.category[0]}</div>
                        <button class="add-to-trip-btn ${isInTrip ? 'added' : ''}" 
                                onclick="tripPlanner.toggleDestination('${dest.id}')"
                                aria-label="${isInTrip ? 'Remove from trip' : 'Add to trip'}">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                ${isInTrip ?
                    '<path d="M20 6L9 17l-5-5"/>' :
                    '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>'
                }
                            </svg>
                        </button>
                    </div>
                    <div class="planner-card-content">
                        <h3 class="planner-card-title">${dest.name}</h3>
                        <p class="planner-card-location">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 1.5C5.51472 1.5 3.5 3.51472 3.5 6C3.5 9.5 8 14.5 8 14.5C8 14.5 12.5 9.5 12.5 6C12.5 3.51472 10.4853 1.5 8 1.5Z" 
                                      stroke="currentColor" stroke-width="1.5"/>
                                <circle cx="8" cy="6" r="1.5" stroke="currentColor" stroke-width="1.5"/>
                            </svg>
                            ${dest.region}
                        </p>
                        <p class="planner-card-description">${dest.shortDescription}</p>
                        <div class="planner-card-footer">
                            <div class="planner-card-price">
                                <strong>$${dest.price.min}-${dest.price.max}</strong>
                                <span>/person</span>
                            </div>
                            <div class="planner-card-duration">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path d="M12 6v6l4 2"/>
                                </svg>
                                ${dest.duration}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    toggleDestination(destId) {
        const destination = this.destinations.find(d => d.id === destId);
        if (!destination) return;

        const index = tripState.destinations.findIndex(d => d.id === destId);

        if (index > -1) {
            // Remove from trip
            tripState.destinations.splice(index, 1);
        } else {
            // Add to trip
            tripState.destinations.push(destination);
        }

        // Save and update
        this.saveTripData();
        this.updateTripSummary();
        this.renderDestinations();
        this.updateMap();
    }

    updateTripSummary() {
        // Update destination count
        const countEl = document.getElementById('destinationCount');
        if (countEl) {
            countEl.textContent = tripState.destinations.length;
        }

        // Update destinations list
        const listEl = document.getElementById('tripDestinationsList');
        if (!listEl) return;

        if (tripState.destinations.length === 0) {
            listEl.innerHTML = `
                <div class="empty-state">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <p>No destinations added yet</p>
                    <small>Browse destinations below to add them to your trip</small>
                </div>
            `;
        } else {
            listEl.innerHTML = tripState.destinations.map(dest => {
                const mainImage = dest.images && dest.images[0] ? dest.images[0] : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800';

                return `
                    <div class="trip-destination-item">
                        <img src="${mainImage}" alt="${dest.name}">
                        <div class="trip-destination-info">
                            <h4>${dest.name}</h4>
                            <span>${dest.duration}</span>
                        </div>
                        <button class="remove-destination" onclick="tripPlanner.toggleDestination('${dest.id}')" aria-label="Remove destination">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>
                `;
            }).join('');
        }

        // Calculate and update budget
        this.updateBudget();
    }

    updateBudget() {
        let totalMin = 0;
        let totalMax = 0;

        tripState.destinations.forEach(dest => {
            totalMin += dest.price.min;
            totalMax += dest.price.max;
        });

        const avgBudget = Math.round((totalMin + totalMax) / 2);
        tripState.budget = avgBudget;

        const budgetEl = document.getElementById('budgetAmount');
        if (budgetEl) {
            budgetEl.textContent = `$${avgBudget}`;
        }

        // Update budget bar (assuming max budget of $2000)
        const budgetFill = document.getElementById('budgetFill');
        if (budgetFill) {
            const percentage = Math.min((avgBudget / 2000) * 100, 100);
            budgetFill.style.width = `${percentage}%`;
        }
    }

    initializeMap() {
        const mapEl = document.getElementById('tripMap');
        if (!mapEl) return;

        // Initialize Leaflet map centered on Sri Lanka
        this.map = L.map('tripMap').setView([7.8731, 80.7718], 7);

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(this.map);

        // Update map with current destinations
        this.updateMap();
    }

    updateMap() {
        if (!this.map) return;

        // Clear existing markers and routes
        this.markers.forEach(marker => this.map.removeLayer(marker));
        this.markers = [];

        if (this.routeLine) {
            this.map.removeLayer(this.routeLine);
            this.routeLine = null;
        }

        if (tripState.destinations.length === 0) return;

        // Add markers for each destination
        const coordinates = [];

        tripState.destinations.forEach((dest, index) => {
            if (dest.coordinates && dest.coordinates.length === 2) {
                const [lat, lng] = dest.coordinates;
                coordinates.push([lat, lng]);

                // Create custom icon
                const icon = L.divIcon({
                    className: 'custom-marker',
                    html: `
                        <div style="
                            width: 32px;
                            height: 32px;
                            background: ${index === 0 ? '#E9C46A' : '#1E6B4E'};
                            border: 3px solid white;
                            border-radius: 50%;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: white;
                            font-weight: bold;
                            font-size: 14px;
                        ">${index + 1}</div>
                    `,
                    iconSize: [32, 32],
                    iconAnchor: [16, 16]
                });

                const marker = L.marker([lat, lng], { icon })
                    .bindPopup(`
                        <div style="text-align: center;">
                            <strong>${dest.name}</strong><br>
                            <small>${dest.region}</small>
                        </div>
                    `)
                    .addTo(this.map);

                this.markers.push(marker);
            }
        });

        // Draw route line if multiple destinations
        if (coordinates.length > 1) {
            this.routeLine = L.polyline(coordinates, {
                color: '#1E6B4E',
                weight: 3,
                opacity: 0.7,
                dashArray: '10, 10'
            }).addTo(this.map);

            // Fit map to show all markers
            const bounds = L.latLngBounds(coordinates);
            this.map.fitBounds(bounds, { padding: [50, 50] });
        } else if (coordinates.length === 1) {
            this.map.setView(coordinates[0], 10);
        }
    }

    saveTripData() {
        // Save to localStorage
        localStorage.setItem('tripDestinations', JSON.stringify(tripState.destinations));
        localStorage.setItem('currentTrip', JSON.stringify({
            name: tripState.name,
            dates: tripState.dates,
            duration: tripState.duration,
            travelers: tripState.travelers,
            budget: tripState.budget
        }));
    }

    saveTrip() {
        this.saveTripData();

        // Show success message
        const btn = document.getElementById('saveTrip');
        const originalHTML = btn.innerHTML;

        btn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 6L9 17l-5-5"/>
            </svg>
            Saved!
        `;
        btn.style.background = 'var(--accent)';

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
        }, 2000);
    }

    shareTrip() {
        if (tripState.destinations.length === 0) {
            alert('Please add some destinations to your trip before sharing!');
            return;
        }

        // Create shareable text
        const destinationNames = tripState.destinations.map(d => d.name).join(', ');
        const shareText = `Check out my ${tripState.name}! Visiting: ${destinationNames}. Budget: $${tripState.budget}`;

        // Try to use Web Share API
        if (navigator.share) {
            navigator.share({
                title: tripState.name,
                text: shareText,
                url: window.location.href
            }).catch(err => console.log('Share cancelled'));
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                const btn = document.getElementById('shareTrip');
                const originalHTML = btn.innerHTML;

                btn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    Copied to Clipboard!
                `;

                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                }, 2000);
            });
        }
    }

    clearTrip() {
        if (tripState.destinations.length === 0) return;

        if (confirm('Are you sure you want to clear all destinations from your trip?')) {
            tripState.destinations = [];
            this.saveTripData();
            this.updateTripSummary();
            this.renderDestinations();
            this.updateMap();
        }
    }
}

// ============================================
// INITIALIZE
// ============================================

let tripPlanner;

document.addEventListener('DOMContentLoaded', () => {
    tripPlanner = new TripPlanner();
});
