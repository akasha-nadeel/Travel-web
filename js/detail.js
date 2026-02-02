// ============================================
// DETAIL PAGE LOGIC
// ============================================

class DetailPage {
    constructor() {
        this.params = new URLSearchParams(window.location.search);
        this.destId = this.params.get('id');
        this.destination = null;
        this.map = null;

        this.init();
    }

    init() {
        if (!this.destId) {
            // Redirect to destinations page if no ID provided
            window.location.href = 'destinations.html';
            return;
        }

        // Find destination data
        this.destination = destinationsData.find(d => d.id === this.destId || d.slug === this.destId);

        if (!this.destination) {
            // Handle not found (could verify later)
            console.error('Destination not found');
            return;
        }

        this.renderContent();
        this.initMap();
        this.initGallery();

        // Hide loader
        document.getElementById('pageLoader').style.display = 'none';

        // Update page title
        document.title = `${this.destination.name} - Explore Sri Lanka`;
    }

    renderContent() {
        const d = this.destination;

        // Hero
        const heroBg = document.getElementById('heroBg');
        heroBg.style.backgroundImage = `url('${d.images[0]}')`;

        document.getElementById('heroTitle').textContent = d.name;
        document.getElementById('breadcrumbCurrent').textContent = d.name;
        document.getElementById('heroLocation').textContent = this.formatRegion(d.region);
        document.getElementById('heroRating').textContent = d.rating;
        document.getElementById('heroReviews').textContent = `${d.reviews} reviews`;

        // Tags
        const tagsHtml = d.category.map(cat =>
            `<span class="hero-tag">${this.capitalize(cat)}</span>`
        ).join('');
        document.getElementById('heroTags').innerHTML = tagsHtml;

        // About
        document.getElementById('aboutName').textContent = d.name;
        document.getElementById('detailDescription').textContent = d.description;

        // Key Facts
        document.getElementById('factBestTime').textContent = d.bestTime;
        document.getElementById('factDuration').textContent = d.duration;
        document.getElementById('factDifficulty').textContent = this.capitalize(d.difficulty);
        document.getElementById('factPrice').textContent = `$${d.price.min} - $${d.price.max}`;

        // Lists
        this.renderList('highlightsList', d.highlights);
        this.renderList('todoList', d.thingsToDo);

        // Gallery
        const galleryHtml = d.images.map(img => `
            <a href="${img}" class="gallery-item glightbox">
                <img src="${img}" alt="${d.name}">
            </a>
        `).join('');
        document.getElementById('photoGallery').innerHTML = galleryHtml;

        // Getting There
        document.getElementById('gettingThere').textContent = d.gettingThere;

        // Sidebar
        document.getElementById('bookingPrice').textContent = `$${d.price.min}`;
        document.getElementById('bookingRating').textContent = d.rating;

        // Nearby Destinations
        this.renderNearby(d.nearby);
    }

    renderList(elementId, items) {
        const html = items.map(item => `<li>${item}</li>`).join('');
        document.getElementById(elementId).innerHTML = html;
    }

    renderNearby(nearbyIds) {
        const nearbyContainer = document.getElementById('nearbyList');
        if (!nearbyIds || nearbyIds.length === 0) {
            nearbyContainer.innerHTML = '<p>No nearby destinations found.</p>';
            return;
        }

        const nearbyHtml = nearbyIds.map(id => {
            const nearDest = destinationsData.find(d => d.id === id);
            if (!nearDest) return '';

            return `
                <a href="destination-detail.html?id=${nearDest.id}" class="nearby-item">
                    <img src="${nearDest.images[0]}" alt="${nearDest.name}">
                    <div class="nearby-info">
                        <h4>${nearDest.name}</h4>
                        <span>${this.formatRegion(nearDest.region)}</span>
                    </div>
                </a>
            `;
        }).join('');

        nearbyContainer.innerHTML = nearbyHtml;
    }

    initMap() {
        if (!document.getElementById('miniMap')) return;

        const coords = this.destination.coordinates;
        this.map = L.map('miniMap', {
            center: coords,
            zoom: 13,
            dragging: false, // Static map feeling
            scrollWheelZoom: false,
            zoomControl: false
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap &copy; CARTO'
        }).addTo(this.map);

        // Add Marker
        const icon = L.divIcon({
            className: 'custom-marker-icon marker-unesco', // Generic class for now
            html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
            iconSize: [40, 40],
            iconAnchor: [20, 40]
        });

        L.marker(coords, { icon: icon }).addTo(this.map);
    }

    initGallery() {
        // Initialize GLightbox
        const lightbox = GLightbox({
            selector: '.glightbox',
            touchNavigation: true,
            loop: true
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

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new DetailPage();
});
