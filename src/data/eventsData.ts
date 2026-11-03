export interface CyclingEvent {
    id: string;
    title: string;
    category: 'Community' | 'Trail' | 'Race' | 'Workshop';
    categoryLabel: string;
    tag: string;
    date: string;
    time: string;
    location: string;
    distance: string;
    difficulty: 'All Levels' | 'Beginner Friendly' | 'Intermediate' | 'Advanced' | 'Expert';
    fee: string;
    maxSpots: number;
    filledSpots: number;
    image: string;
    description: string;
    highlights: string[];
}

export const EVENTS_DATA: CyclingEvent[] = [
    {
        id: 'malabar-dawn-ride',
        title: 'Malabar Coast Dawn Ride',
        category: 'Community',
        categoryLabel: 'Community Ride',
        tag: 'Popular',
        date: 'Sun, Nov 15, 2026',
        time: '5:30 AM - 9:00 AM',
        location: 'Calicut Beach Promenade, Kozhikode',
        distance: '35 km',
        difficulty: 'Beginner Friendly',
        fee: 'Free Entry',
        maxSpots: 60,
        filledSpots: 46,
        image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1200&q=80',
        description: 'Catch the golden sunrise along the Arabian Sea with the Boatrider cycling community. Includes breakfast, hydration stations, and technical support.',
        highlights: ['Scenic Coastal Route', 'Free Breakfast & Coffee', 'Technical Escort Vehicle']
    },
    {
        id: 'wayanad-ghats-challenge',
        title: 'Wayanad Ghats Mountain Challenge',
        category: 'Trail',
        categoryLabel: 'Hill Climb',
        tag: 'Featured',
        date: 'Sat, Nov 28, 2026',
        time: '6:00 AM - 1:00 PM',
        location: 'Thamarassery Churam Pass, Wayanad',
        distance: '65 km',
        difficulty: 'Advanced',
        fee: '₹499 (Jersey Included)',
        maxSpots: 40,
        filledSpots: 31,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
        description: 'Conquer the legendary 9 hairpin bends with 1,200m elevation gain. Breathtaking misty mountain views, timing chips, and finisher medals.',
        highlights: ['1,200m Elevation Gain', 'Finisher Medal & Jersey', 'Physio & Ambulance Escort']
    },
    {
        id: 'kozhikode-sunset-criterium',
        title: 'Kozhikode Sunset Criterium',
        category: 'Race',
        categoryLabel: 'Circuit Race',
        tag: 'Championship',
        date: 'Sun, Dec 06, 2026',
        time: '4:00 PM - 7:30 PM',
        location: 'Cyberpark Circuit, Kozhikode',
        distance: '40 km (20 Laps)',
        difficulty: 'Intermediate',
        fee: '₹299',
        maxSpots: 35,
        filledSpots: 24,
        image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=80',
        description: 'High-speed closed-circuit criterium under evening floodlights. Compete for podium trophies, gear vouchers, and Boatrider championship points.',
        highlights: ['Closed Traffic-Free Loop', 'Cash Prizes for Top 3', 'Live Lap Timing']
    },
    {
        id: 'bike-maintenance-masterclass',
        title: 'Bike Maintenance & Trail Fixes Workshop',
        category: 'Workshop',
        categoryLabel: 'Workshop',
        tag: 'Hands-on',
        date: 'Sat, Dec 12, 2026',
        time: '10:00 AM - 1:00 PM',
        location: 'Boatrider Experience Hub, Francis Road',
        distance: '3 Hours Workshop',
        difficulty: 'All Levels',
        fee: 'Free Entry',
        maxSpots: 20,
        filledSpots: 17,
        image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=1200&q=80',
        description: 'Hands-on clinic with certified mechanics. Learn roadside chain repair, gear indexing, tubeless puncture fixes, and pre-ride safety checks.',
        highlights: ['Tool Kit Provided', '1-on-1 Mechanic Guidance', 'Take-Home Maintenance Guide']
    },
    {
        id: 'kappad-night-cruise',
        title: 'Kappad Beach Moonlight Cruise',
        category: 'Community',
        categoryLabel: 'Night Ride',
        tag: 'Weekend Special',
        date: 'Fri, Dec 18, 2026',
        time: '8:00 PM - 11:30 PM',
        location: 'Kappad Historic Beach, Calicut',
        distance: '28 km',
        difficulty: 'Beginner Friendly',
        fee: 'Free Entry',
        maxSpots: 80,
        filledSpots: 58,
        image: 'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=1200&q=80',
        description: 'A breezy evening ride under the stars to historic Kappad Beach. Complete with illuminated bicycles, seaside acoustic session, and hot chai.',
        highlights: ['Night Lights Required', 'Campfire & Hot Tea', 'Leisurely Social Pace']
    },
    {
        id: 'nilambur-gravel-epic',
        title: 'Nilambur Forest Gravel Odyssey',
        category: 'Trail',
        categoryLabel: 'Gravel & Forest',
        tag: 'Epic Trail',
        date: 'Sun, Jan 10, 2027',
        time: '5:00 AM - 3:00 PM',
        location: 'Nilambur Teak Forest Reserve',
        distance: '95 km',
        difficulty: 'Expert',
        fee: '₹799 (Full Support)',
        maxSpots: 50,
        filledSpots: 38,
        image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=1200&q=80',
        description: 'Epic off-road adventure through dense teak reserves and quiet plantation trails. Full nutrition stations, support vehicles, and post-ride BBQ feast.',
        highlights: ['Unpaved Forest Gravel', 'Full Nutrition Stations', 'Post-Ride Barbecue']
    }
];

