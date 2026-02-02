// ============================================
// DESTINATIONS DATA - Sri Lanka Travel App
// ============================================

const destinationsData = [
    {
        id: 'sigiriya',
        name: 'Sigiriya',
        slug: 'sigiriya',
        category: ['unesco', 'culture', 'adventure'],
        region: 'cultural-triangle',
        coordinates: [7.9570, 80.7603],
        rating: 4.9,
        reviews: 2847,
        price: { min: 30, max: 100, currency: 'USD' },
        duration: '3-4 hours',
        difficulty: 'moderate',
        bestTime: 'December to April',
        shortDescription: 'Ancient rock fortress rising 200m above jungle, featuring stunning frescoes and breathtaking panoramic views.',
        description: `Sigiriya, also known as Lion Rock, is an ancient rock fortress and palace ruin surrounded by the remains of an extensive network of gardens, reservoirs, and other structures. Built by King Kashyapa in the 5th century AD, this UNESCO World Heritage Site is one of the best-preserved examples of ancient urban planning.

The climb to the summit takes you past the famous frescoes of the "Sigiriya Maidens," through the Mirror Wall covered in ancient graffiti, and finally through the massive Lion's Gate. At the top, you'll find the ruins of the palace and breathtaking 360-degree views of the surrounding jungle and countryside.`,
        highlights: [
            'Lion\'s Gate entrance with massive lion paws',
            'Ancient frescoes of celestial maidens',
            '360° panoramic views from the summit',
            'Sophisticated water gardens and fountains',
            'Mirror Wall with ancient inscriptions',
            'Archaeological museum'
        ],
        images: [
            'assets/images/destinations/sigiriya_new.png',
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1588417835326-b7f8b8c4b0e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ],
        thingsToDo: [
            'Climb to the summit (1,200 steps)',
            'Explore the water gardens',
            'Visit the archaeological museum',
            'Photography at sunrise or sunset',
            'Guided historical tours'
        ],
        gettingThere: 'Located 169km from Colombo (4 hours by car). Nearest town is Dambulla (20km). Regular buses and private transfers available.',
        nearby: ['polonnaruwa', 'dambulla', 'minneriya'],
        tags: ['History', 'Adventure', 'Photography', 'UNESCO']
    },
    {
        id: 'ella',
        name: 'Ella',
        slug: 'ella',
        category: ['nature', 'adventure', 'hiking'],
        region: 'hill-country',
        coordinates: [6.8667, 81.0467],
        rating: 4.8,
        reviews: 3521,
        price: { min: 15, max: 80, currency: 'USD' },
        duration: '2-3 days',
        difficulty: 'easy-moderate',
        bestTime: 'January to March',
        shortDescription: 'Misty mountains, iconic Nine Arch Bridge, and scenic train journeys through emerald tea plantations.',
        description: `Ella is a small mountain village in Sri Lanka's Hill Country, famous for its stunning natural beauty, cool climate, and laid-back atmosphere. Surrounded by tea plantations, waterfalls, and hiking trails, Ella has become one of the most popular destinations for travelers seeking adventure and natural beauty.

The town is known for the iconic Nine Arch Bridge, a marvel of colonial-era railway construction, and the scenic train journey from Kandy to Ella, considered one of the most beautiful train rides in the world.`,
        highlights: [
            'Nine Arch Bridge - iconic railway viaduct',
            'Little Adam\'s Peak - easy sunrise hike',
            'Ella Rock - challenging trek with panoramic views',
            'Ravana Falls - stunning waterfall',
            'Tea plantation tours',
            'Scenic train journey from Kandy'
        ],
        images: [
            'assets/images/destinations/ella.jpg',
            'https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1609137144813-7d9921338f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ],
        thingsToDo: [
            'Hike to Little Adam\'s Peak',
            'Trek to Ella Rock summit',
            'Visit Nine Arch Bridge',
            'Tour tea plantations',
            'Zip-lining adventures',
            'Waterfall swimming'
        ],
        gettingThere: 'Located 200km from Colombo. Best reached by scenic train from Kandy (7 hours) or Nuwara Eliya (3 hours). Buses and private cars also available.',
        nearby: ['nuwara-eliya', 'haputale', 'badulla'],
        tags: ['Nature', 'Hiking', 'Photography', 'Adventure']
    },
    {
        id: 'galle-fort',
        name: 'Galle Fort',
        slug: 'galle-fort',
        category: ['unesco', 'culture', 'architecture'],
        region: 'southern-coast',
        coordinates: [6.0268, 80.2170],
        rating: 4.7,
        reviews: 2156,
        price: { min: 0, max: 50, currency: 'USD' },
        duration: '3-5 hours',
        difficulty: 'easy',
        bestTime: 'November to April',
        shortDescription: '17th-century Dutch colonial fort with cobblestone streets, boutique shops, and stunning ocean views.',
        description: `Galle Fort is a UNESCO World Heritage Site and the best-preserved colonial sea fortress in South Asia. Built by the Portuguese in 1588 and extensively fortified by the Dutch in the 17th century, the fort is a living city with a unique blend of European architecture and South Asian traditions.

Walking through the cobblestone streets, you'll discover charming cafes, boutique hotels, art galleries, and museums housed in beautifully restored colonial buildings. The fort's ramparts offer stunning views of the Indian Ocean, especially at sunset.`,
        highlights: [
            'Dutch Reformed Church (1755)',
            'Galle Lighthouse - iconic landmark',
            'Maritime Museum',
            'Rampart walk with ocean views',
            'Colonial architecture and cobblestone streets',
            'Boutique shops and art galleries'
        ],
        images: [
            'assets/images/destinations/galle_fort.png',
            'https://images.unsplash.com/photo-1584735175315-9d5df23860bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1609137144813-7d9921338f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ],
        thingsToDo: [
            'Walk the fort ramparts',
            'Visit the lighthouse',
            'Explore museums and galleries',
            'Shop for souvenirs and crafts',
            'Dine at colonial-era restaurants',
            'Sunset watching from the walls'
        ],
        gettingThere: 'Located 116km south of Colombo (2.5 hours by car or train). Regular buses and trains from Colombo Fort station.',
        nearby: ['unawatuna', 'mirissa', 'hikkaduwa'],
        tags: ['Culture', 'Architecture', 'History', 'UNESCO']
    },
    {
        id: 'mirissa',
        name: 'Mirissa',
        slug: 'mirissa',
        category: ['beach', 'wildlife', 'relaxation'],
        region: 'southern-coast',
        coordinates: [5.9467, 80.4686],
        rating: 4.9,
        reviews: 1876,
        price: { min: 25, max: 120, currency: 'USD' },
        duration: '2-4 days',
        difficulty: 'easy',
        bestTime: 'November to April',
        shortDescription: 'Paradise beach town famous for whale watching, surfing, and spectacular golden sunsets over the Indian Ocean.',
        description: `Mirissa is a small coastal town on Sri Lanka's southern coast, famous for its pristine beaches, whale watching opportunities, and laid-back atmosphere. The crescent-shaped beach with its golden sand and turquoise waters is perfect for swimming, surfing, and relaxation.

From November to April, Mirissa becomes one of the best places in the world to see blue whales and dolphins. The town also offers excellent surfing conditions, fresh seafood, and stunning sunsets from the iconic Parrot Rock.`,
        highlights: [
            'Blue whale and dolphin watching',
            'Pristine crescent beach',
            'Parrot Rock viewpoint',
            'Surfing and water sports',
            'Fresh seafood restaurants',
            'Spectacular sunsets'
        ],
        images: [
            'assets/images/destinations/mirissa.jpg',
            'https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ],
        thingsToDo: [
            'Whale watching tours (Nov-Apr)',
            'Surfing lessons',
            'Snorkeling and diving',
            'Beach hopping',
            'Sunset from Parrot Rock',
            'Fresh seafood dining'
        ],
        gettingThere: 'Located 150km south of Colombo (3 hours by car). Regular buses from Colombo and Galle. Nearest railway station is Weligama (4km).',
        nearby: ['weligama', 'galle-fort', 'unawatuna'],
        tags: ['Beach', 'Wildlife', 'Surfing', 'Relaxation']
    },
    {
        id: 'yala',
        name: 'Yala National Park',
        slug: 'yala-national-park',
        category: ['wildlife', 'safari', 'nature'],
        region: 'southeast',
        coordinates: [6.3725, 81.5185],
        rating: 4.8,
        reviews: 2341,
        price: { min: 45, max: 150, currency: 'USD' },
        duration: 'Half/Full Day',
        difficulty: 'easy',
        bestTime: 'February to July',
        shortDescription: 'Home to the world\'s highest density of leopards, plus elephants, sloth bears, and over 200 bird species.',
        description: `Yala National Park is Sri Lanka's most visited and second-largest national park, famous for having one of the highest leopard densities in the world. Covering 979 square kilometers, the park features diverse ecosystems including forests, grasslands, lagoons, and coastal areas.

A safari through Yala offers incredible wildlife viewing opportunities, with elephants, leopards, sloth bears, crocodiles, and numerous bird species. The park is also home to ancient Buddhist sites and stunning coastal scenery.`,
        highlights: [
            'Highest leopard density in the world',
            'Large elephant herds',
            'Sloth bears and crocodiles',
            'Over 200 bird species',
            'Ancient Buddhist ruins',
            'Coastal lagoons and beaches'
        ],
        images: [
            'https://images.unsplash.com/photo-1544979590-37e9b47eb705?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1549366021-9f761d450615?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ],
        thingsToDo: [
            'Morning safari (best for leopards)',
            'Evening safari (best for elephants)',
            'Bird watching tours',
            'Photography safaris',
            'Visit ancient Buddhist sites',
            'Beach camping (with permits)'
        ],
        gettingThere: 'Located 305km from Colombo (6 hours by car). Nearest town is Tissamaharama (24km). Safari jeeps available from Tissa.',
        nearby: ['tissamaharama', 'kataragama', 'bundala'],
        tags: ['Safari', 'Wildlife', 'Photography', 'Nature']
    },
    {
        id: 'kandy',
        name: 'Kandy',
        slug: 'kandy',
        category: ['unesco', 'culture', 'spiritual'],
        region: 'central',
        coordinates: [7.2906, 80.6337],
        rating: 4.7,
        reviews: 3102,
        price: { min: 30, max: 90, currency: 'USD' },
        duration: '1-2 days',
        difficulty: 'easy',
        bestTime: 'December to April',
        shortDescription: 'Sacred city housing the Temple of the Tooth Relic, surrounded by misty hills and the serene Kandy Lake.',
        description: `Kandy, Sri Lanka's last royal capital, is a UNESCO World Heritage Site and one of the most sacred Buddhist cities in the world. The city is home to the Temple of the Sacred Tooth Relic, which houses a tooth of the Buddha and is one of the most important pilgrimage sites for Buddhists.

Set in a valley surrounded by mountains and centered around the picturesque Kandy Lake, the city offers a perfect blend of culture, history, and natural beauty. The annual Esala Perahera festival in July/August is one of Asia's most spectacular cultural events.`,
        highlights: [
            'Temple of the Sacred Tooth Relic',
            'Kandy Lake and scenic walks',
            'Royal Botanical Gardens, Peradeniya',
            'Traditional Kandyan dance performances',
            'Esala Perahera festival (July/Aug)',
            'Scenic viewpoints from surrounding hills'
        ],
        images: [
            'assets/images/destinations/kandy.jpg',
            'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1609137144813-7d9921338f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ],
        thingsToDo: [
            'Visit Temple of the Tooth',
            'Walk around Kandy Lake',
            'Explore Royal Botanical Gardens',
            'Watch Kandyan dance performance',
            'Visit tea plantations',
            'Shop at Kandy Market'
        ],
        gettingThere: 'Located 115km from Colombo (3 hours by car or train). Regular trains and buses from Colombo. Scenic train journey recommended.',
        nearby: ['peradeniya', 'pinnawala', 'nuwara-eliya'],
        tags: ['Spiritual', 'Culture', 'History', 'UNESCO']
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = destinationsData;
}
