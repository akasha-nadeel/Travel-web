# 🗺️ Phase 2: Discovery - Sri Lanka Travel App

## 🎯 Phase 2 Overview

**Goal**: Transform the homepage into a complete discovery platform with interactive maps, detailed destination pages, advanced filtering, and trip planning capabilities.

**Timeline**: Week 2
**Status**: 🚧 In Progress

---

## 📋 Phase 2 Features

### 1. **Interactive Map** 🗺️
- [ ] Leaflet.js integration
- [ ] Custom markers for all destinations
- [ ] Popup cards with destination info
- [ ] Cluster markers for nearby locations
- [ ] Filter by category (UNESCO, Beach, Wildlife, Culture)
- [ ] Zoom to destination on click
- [ ] Route planning between destinations

### 2. **Destination Detail Pages** 📄
- [ ] Individual page for each destination
- [ ] Photo gallery with lightbox
- [ ] Detailed description and history
- [ ] Best time to visit
- [ ] Getting there information
- [ ] Things to do section
- [ ] Nearby attractions
- [ ] Reviews and ratings
- [ ] Book now CTA

### 3. **Advanced Filters** 🔍
- [ ] Filter by category (Beach, Culture, Wildlife, Adventure)
- [ ] Filter by region (North, South, East, West, Central, Hill Country)
- [ ] Filter by price range
- [ ] Filter by duration
- [ ] Filter by difficulty level
- [ ] Sort by: Popular, Rating, Price, Distance
- [ ] Clear all filters button
- [ ] Active filter badges

### 4. **Trip Planner** 📅
- [ ] Interactive calendar
- [ ] Multi-day itinerary builder
- [ ] Drag-and-drop destinations
- [ ] Duration calculator
- [ ] Budget estimator
- [ ] Save itinerary to localStorage
- [ ] Share itinerary (copy link)
- [ ] Print itinerary
- [ ] Suggested itineraries (3, 5, 7, 14 days)

---

## 🏗️ New Pages to Create

### **Pages**
1. `destinations.html` - All destinations grid with filters
2. `destination-detail.html` - Template for individual destinations
3. `map.html` - Full-screen interactive map
4. `trip-planner.html` - Itinerary builder
5. `about.html` - About Sri Lanka page
6. `contact.html` - Contact form

### **Individual Destination Pages**
1. `sigiriya.html`
2. `ella.html`
3. `galle-fort.html`
4. `mirissa.html`
5. `yala.html`
6. `kandy.html`
7. `nuwara-eliya.html`
8. `polonnaruwa.html`
9. `anuradhapura.html`
10. `arugam-bay.html`

---

## 🎨 New Components

### **Map Component**
```
- Interactive Leaflet map
- Custom marker icons
- Popup cards
- Cluster groups
- Search on map
- Filter controls
```

### **Filter Sidebar**
```
- Category checkboxes
- Region dropdown
- Price range slider
- Duration selector
- Difficulty level
- Apply/Reset buttons
```

### **Gallery Component**
```
- Thumbnail grid
- Lightbox overlay
- Navigation arrows
- Zoom controls
- Caption display
```

### **Itinerary Builder**
```
- Calendar picker
- Destination cards
- Drag-and-drop zones
- Day-by-day breakdown
- Budget calculator
- Save/Share buttons
```

---

## 📦 New Dependencies

### **Libraries to Add**
1. **Leaflet.js** - Interactive maps
   ```html
   <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
   <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
   ```

2. **Leaflet MarkerCluster** - Marker clustering
   ```html
   <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css" />
   <script src="https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js"></script>
   ```

3. **GLightbox** - Photo gallery lightbox
   ```html
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css" />
   <script src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js"></script>
   ```

4. **Sortable.js** - Drag and drop
   ```html
   <script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>
   ```

---

## 🗂️ New File Structure

```
Travel App/
├── index.html                    ✅ Homepage
├── destinations.html             🆕 All destinations
├── destination-detail.html       🆕 Template
├── map.html                      🆕 Interactive map
├── trip-planner.html            🆕 Itinerary builder
├── about.html                    🆕 About page
├── contact.html                  🆕 Contact form
├── destinations/                 🆕 Individual pages
│   ├── sigiriya.html
│   ├── ella.html
│   ├── galle-fort.html
│   └── ... (10 total)
├── css/
│   ├── index.css                ✅ Design system
│   ├── components.css           ✅ Existing components
│   ├── pages.css                ✅ Existing pages
│   ├── enhancements.css         ✅ Existing enhancements
│   ├── map.css                  🆕 Map styles
│   ├── filters.css              🆕 Filter sidebar
│   └── trip-planner.css         🆕 Itinerary builder
├── js/
│   ├── app.js                   ✅ Homepage logic
│   ├── map.js                   🆕 Map functionality
│   ├── filters.js               🆕 Filter logic
│   ├── trip-planner.js          🆕 Itinerary builder
│   └── destinations-data.js     🆕 All destination data
└── assets/
    └── images/
        └── destinations/         ✅ Existing images
```

---

## 📊 Destination Data Structure

```javascript
const destinations = [
  {
    id: 'sigiriya',
    name: 'Sigiriya',
    slug: 'sigiriya',
    category: ['unesco', 'culture', 'adventure'],
    region: 'cultural-triangle',
    coordinates: [7.9570, 80.7603],
    rating: 4.9,
    reviews: 2847,
    price: { min: 30, max: 100 },
    duration: '3-4 hours',
    difficulty: 'moderate',
    bestTime: 'December to April',
    description: 'Ancient rock fortress rising 200m above jungle...',
    highlights: [
      'Lion\'s Gate entrance',
      'Ancient frescoes',
      '360° panoramic views',
      'Water gardens'
    ],
    images: [
      'sigiriya-1.jpg',
      'sigiriya-2.jpg',
      'sigiriya-3.jpg'
    ],
    nearby: ['polonnaruwa', 'dambulla', 'minneriya']
  },
  // ... more destinations
];
```

---

## 🎯 Implementation Order

### **Week 2 - Day 1-2: Data & Structure**
- [x] Create destination data file
- [ ] Build destinations.html with grid
- [ ] Add filter sidebar
- [ ] Implement filter logic

### **Week 2 - Day 3-4: Map Integration**
- [ ] Set up Leaflet map
- [ ] Add custom markers
- [ ] Create popup cards
- [ ] Add clustering
- [ ] Connect filters to map

### **Week 2 - Day 5-6: Detail Pages**
- [ ] Create destination-detail.html template
- [ ] Build photo gallery
- [ ] Add reviews section
- [ ] Create 3-4 example pages

### **Week 2 - Day 7: Trip Planner**
- [ ] Build calendar interface
- [ ] Add drag-and-drop
- [ ] Create itinerary display
- [ ] Add save/share functionality

---

## 🎨 Design Consistency

All new pages will maintain:
- ✅ Same color palette
- ✅ Same typography
- ✅ Same component styles
- ✅ Same animations
- ✅ Same responsive breakpoints
- ✅ Same navigation/footer

---

## 🚀 Quick Start Phase 2

1. **Create destination data file**
2. **Build destinations page with filters**
3. **Add interactive map**
4. **Create detail page template**
5. **Build trip planner**

---

## 📈 Success Metrics

By end of Phase 2, users can:
- ✅ Browse all destinations with filters
- ✅ View destinations on interactive map
- ✅ Read detailed destination pages
- ✅ Plan multi-day itineraries
- ✅ Save and share trip plans

---

**Ready to build Phase 2?** Let's start! 🚀
