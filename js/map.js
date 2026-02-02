// ============================================
// INTERACTIVE MAP LOGIC
// ============================================

class TravelMap {
    constructor() {
        this.map = null;
        this.markers = null; // MarkerClusterGroup
        this.activeCategory = 'all';
        this.destinations = destinationsData || [];

        // Sri Lanka Coordinates: Center of the island
        this.center = [7.8731, 80.7718];
        this.zoom = 8;

        // Elements
        this.previewCard = document.getElementById('destinationPreview');

        this.init();
    }

    init() {
        if (!document.getElementById('map')) return;

        this.initMap();
        this.initControls();
    }

    initMap() {
        // Initialize Leaflet Map
        this.map = L.map('map', {
            zoomControl: false, // We'll add it in a custom position
            attributionControl: false
        }).setView(this.center, this.zoom);

        // Add Tile Layer (OpenStreetMap)
        // Using a custom styled Voyager layer from CARTO for a cleaner look
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(this.map);

        // Add Zoom Control (Top Right)
        L.control.zoom({
            position: 'topright'
        }).addTo(this.map);

        // Initialize Marker Cluster Group
        this.markers = L.markerClusterGroup({
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true,
            spiderfyOnMaxZoom: true,
            removeOutsideVisibleBounds: true
        });

        // Add Markers
        this.addMarkers('all');
        this.map.addLayer(this.markers);
    }

    addMarkers(category) {
        this.markers.clearLayers();

        this.destinations.forEach(dest => {
            // Filter by category
            if (category !== 'all' && !dest.category.includes(category)) return;

            // Determine marker color class based on primary category
            let markerClass = 'marker-culture'; // default
            if (dest.category.includes('unesco')) markerClass = 'marker-unesco';
            else if (dest.category.includes('beach')) markerClass = 'marker-beach';
            else if (dest.category.includes('wildlife')) markerClass = 'marker-wildlife';

            // Create Custom Icon
            const icon = L.divIcon({
                className: `custom-marker-icon ${markerClass}`,
                html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
                iconSize: [40, 40],
                iconAnchor: [20, 40],
                popupAnchor: [0, -40]
            });

            // Create Marker
            const marker = L.marker(dest.coordinates, { icon: icon });

            // Add Click Event
            marker.on('click', () => {
                this.showPreview(dest);
                this.map.flyTo(dest.coordinates, 10, {
                    animate: true,
                    duration: 1
                });
            });

            this.markers.addLayer(marker);
        });
    }

    initControls() {
        const filterChips = document.querySelectorAll('.map-filter-chip');

        filterChips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                // Update active state
                filterChips.forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');

                // Filter markers
                this.activeCategory = e.target.dataset.category;
                this.addMarkers(this.activeCategory);

                // Hide preview when filtering
                this.hidePreview();
            });
        });
    }

    showPreview(dest) {
        // Generate HTML
        const html = `
            <div class="preview-image">
                <img src="${dest.images[0]}" alt="${dest.name}">
                <div class="preview-close" id="closePreview">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </div>
            </div>
            <div class="preview-content">
                <div class="preview-header">
                    <div>
                        <h3 class="preview-title">${dest.name}</h3>
                        <span class="tag">${dest.region.replace('-', ' ')}</span>
                    </div>
                    <div class="preview-rating">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                        ${dest.rating}
                    </div>
                </div>
                <p class="preview-desc">${dest.shortDescription}</p>
                <div class="preview-footer">
                    <span class="preview-price">$${dest.price.min} - $${dest.price.max}</span>
                    <a href="destination-detail.html?id=${dest.id}" class="btn-primary" style="padding: 8px 16px; font-size: 14px;">Explore</a>
                </div>
            </div>
        `;

        this.previewCard.innerHTML = html;
        this.previewCard.classList.add('active');

        // Close button logic
        document.getElementById('closePreview').addEventListener('click', () => {
            this.hidePreview();
        });
    }

    hidePreview() {
        this.previewCard.classList.remove('active');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the map page
    if (document.getElementById('map')) {
        const travelMap = new TravelMap();
    }
});
