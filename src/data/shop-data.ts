export interface ProductColor {
    name: string;
    code: string;
}

export interface ProductPoster {
    image: string;
    title: string;
    description: string;
}

export interface Product {
    id: string;
    title: string;
    category: string;
    price: number;
    originalPrice?: number;
    discountPercent?: number;

    image: string[];
    brand: string;
    size: string[];
    wheelSize: string;
    material: string;
    suspension: string;
    color: ProductColor[];
    description?: string;
    rating?: number;
    reviewCount?: number;

    productposters?: ProductPoster[];
    isdark?: boolean;
    isNew?: boolean;
    isFeatured?: boolean;
    tag?: "Best Seller" | "New Arrival" | "Trending" | "Limited";
    product_type: "bike" | "accessories";


    stock?: number;
    emi?: string;
    video?: string;
    specs?: {
        label: string;
        items: { name: string; value: string }[];
    }[];
    downloads?: { name: string; url: string }[];
    reviews?: Review[];
}

export interface Review {
    id: string;
    author: string;
    rating: number;
    date: string;
    content: string;
    title: string;
    isVerified?: boolean;
}


export const sortOptions = [
    { id: "all", label: "All" },
    { id: "newest", label: "Newest Arrivals" },
    { id: "featured", label: "Featured" },
];

export const filterCategories = {
    bikes: [
        "Road Bikes",
        "Gravel Bikes",
        "Mountain Bikes",
        "Hybrid Bikes",
        "Kids Bikes",
        "Electric Bikes",
    ],
    accessories: [
        "Helmets",
        "Gloves",
        "Saddles",
        "Pumps",
        "Locks",
        "Bags",
        "Tools",
    ],
    brands: [
        "Trek",
        "Cannondale",
        "Java",
        "Marin",
        "Fuji",
        "Polygon",
        "Look",
        "Firefox",
        "Imported",
    ],
    sizes: ["S1", "S2", "S3", "S4", "S5", "S6", "XXS"],
    wheelSizes: [
        "12 inch",
        "14 inch",
        "16 inch",
        "18 inch",
        "20 inch",
        "22 inch",
        "24 inch",
        "26 inch",
        "27.5 inch",
        "28 inch",
        "29 inch",
        "700C - hybrid bikes",
    ],
    suspension: ["Front & Rear", "Front", "Rigid"],
    material: ["Carbon", "Aluminum"],
    rearSuspensionTravel: [
        "75mm",
        "110mm",
        "120mm",
        "130mm",
        "140mm",
        "145mm",
        "150mm",
        "170mm",
        "200mm",
    ],
    colors: [
        { name: "Green", code: "#22c55e" },
        { name: "Blue", code: "#3b82f6" },
        { name: "Black", code: "#000000" },
        { name: "Grey", code: "#6b7280" },
        { name: "Red", code: "#ef4444" },
        { name: "Purple", code: "#a855f7" },
        { name: "Pink", code: "#ec4899" },
        { name: "White", code: "#ffffff" },
        { name: "Yellow", code: "#facc15" },
        { name: "Brown", code: "#92400e" },
        { name: "Orange", code: "#f97316" },
        { name: "Neutral", code: "#d1d5db" },
    ],
    priceRanges: [
        { label: "Below ₹25,000", min: 0, max: 25000 },
        { label: "₹25,000 - ₹50,000", min: 25000, max: 50000 },
        { label: "₹50,000 - ₹75,000", min: 50000, max: 75000 },
        { label: "₹75,000 - ₹1 Lakh", min: 75000, max: 100000 },
        { label: "₹1 Lakh - ₹5 Lakh", min: 100000, max: 500000 },
        { label: "Above ₹5 Lakh", min: 500000, max: Infinity },
    ],
};


// Generating dummy products
export const products: Product[] = [
    {
        id: "1",
        title: "Trek Marlin 7",
        category: "Mountain Bikes",
        price: 65000,
        brand: "Trek",
        size: ["S1", "S2", "S3", "S4", "S5", "S6"],
        wheelSize: "29 inch",
        material: "Aluminum",
        suspension: "Front",
        color: [{ name: "Red", code: "#ef4444" }, { name: "Black", code: "#000000" }],
        image: ["https://cradiac.com/cdn/shop/files/ft.jpg?v=1742208888", "https://cradiac.com/cdn/shop/files/Secondary2.0_1066x.jpg?v=1730970258"],
        product_type: "bike",
        productposters: [
            {
                image: "https://media.istockphoto.com/id/1288946192/photo/crop-of-cyclists-handlebars-and-front-wheel-during-sunrise.jpg?s=612x612&w=0&k=20&c=3vjUqZ_3fiEzO5Sv2auTu_sqrWHRRRzji-bKaOpFAn4=",
                title: "New Fit for More Comfort",
                description: "We increased the stack by 15mm to help take pressure off your hands, neck and shoulders."
            },
            {
                image: "https://media.istockphoto.com/id/2164408933/photo/woman-riding-her-roadbike-on-road-in-the-austrian-alps-under-dramatic-sky.jpg?s=612x612&w=0&k=20&c=XS_3a-Xqiehbq6ZmUbqi2bYx7zlrlfQlAd_yrUIDbqY=",
                title: "More Confidence, More Stability",
                description: "A 7mm longer wheelbase for confidence to push the pace on descents."
            },
            {
                image: "https://media.istockphoto.com/id/1288946192/photo/crop-of-cyclists-handlebars-and-front-wheel-during-sunrise.jpg?s=612x612&w=0&k=20&c=3vjUqZ_3fiEzO5Sv2auTu_sqrWHRRRzji-bKaOpFAn4=",
                title: "Carve the Corners with Precision",
                description: "A 0.5° Slacker Headtube creates nimble but intuitive handling. Reading your mind."
            },
            {
                image: "https://media.istockphoto.com/id/673085384/photo/cyclist-riding-mountain-road-on-racing-bike.jpg?s=612x612&w=0&k=20&c=tuktU7zpFdXptGDi0Po1TEwUSw_1OYtJq6R_lWU_AlU=",
                title: "Carve the Corners with Precision",
                description: "A 0.5° Slacker Headtube creates nimble but intuitive handling. Reading your mind."
            },
        ],
        isNew: true,
        isdark: true,
        tag: "Best Seller",
        originalPrice: 80000,
        discountPercent: 20,
        description: "The Trek Marlin 7 is the perfect entry point to serious mountain biking. It features a lightweight Alpha Silver Aluminum frame with internal routing to protect your cables and add to the bike's sleek look. The RockShox Judy fork gives you 100mm of travel to soak up rocks and roots.",
        rating: 4.8,
        reviewCount: 3,
        reviews: [
            {
                id: "r1",
                author: "Sarah J.",
                rating: 5,
                date: "2 months ago",
                title: "Best entry level MTB!",
                content: "I've been riding this bike for a few months now and it's been fantastic. The suspension handles small bumps easily and the shifting is crisp.",
                isVerified: true
            },
            {
                id: "r2",
                author: "Mike T.",
                rating: 5,
                date: "1 month ago",
                title: "Solid build quality",
                content: "Trek never disappoints. The frame geometry is perfect for long rides. Highly recommend for beginners and intermediates.",
                isVerified: true
            },
            {
                id: "r3",
                author: "Alex D.",
                rating: 4,
                date: "2 weeks ago",
                title: "Great value",
                content: "Good components for the price. The seat is a bit hard but manageable. Overall a great purchase.",
                isVerified: false
            }
        ],
        stock: 12,
        emi: "₹5,417/month",
        video: "8RXApPZzOmg",
        specs: [
            {
                label: "Frameset",
                items: [
                    { name: "Frame", value: "Alpha Silver Aluminum, internal routing, chainstay brake mount, rack and kickstand mount, 135x5mm QR" },
                    { name: "Fork", value: "RockShox Judy, coil spring, preload, TurnKey lockout, 100mm QR, 100mm travel" }
                ]
            },
            {
                label: "Drivetrain",
                items: [
                    { name: "Shifter", value: "Shimano Deore M4100, 10 speed" },
                    { name: "Rear Derailleur", value: "Shimano Deore M5120, long cage" },
                    { name: "Crank", value: "FSA Alpha Drive, 28T steel ring, Boost" }
                ]
            },
            {
                label: "Components",
                items: [
                    { name: "Saddle", value: "Bontrager Arvada, steel rails, 138mm width" },
                    { name: "Handlebar", value: "Bontrager alloy, 31.8mm, 5mm rise" }
                ]
            }
        ],
        downloads: [
            { name: "Trek Marlin User Manual", url: "#" },
            { name: "Suspension Setup Guide", url: "#" }
        ]
    },
    {
        id: "2",
        title: "Cannondale Topstone Carbon",
        category: "Gravel Bikes",
        price: 250000,
        brand: "Cannondale",
        size: ["S2", "S3", "S4"],
        wheelSize: "700C - hybrid bikes",
        material: "Carbon",
        suspension: "Rigid",
        color: [{ name: "Black", code: "#000000" }, { name: "Green", code: "#22c55e" }],
        image: ["https://cdn.shopify.com/s/files/1/0628/5547/9548/files/ZeetaPlus27ICMBlk_533x.jpg?v=1714986541", "https://5.imimg.com/data5/SELLER/Default/2025/6/518411085/LK/TL/AF/64907775/27-5-zeeta-plus-ic-electric-bicycle.png"],
        product_type: "bike",
        productposters: [
            {
                image: "https://media.istockphoto.com/id/1288946192/photo/crop-of-cyclists-handlebars-and-front-wheel-during-sunrise.jpg?s=612x612&w=0&k=20&c=3vjUqZ_3fiEzO5Sv2auTu_sqrWHRRRzji-bKaOpFAn4=",
                title: "New Fit for More Comfort",
                description: "We increased the stack by 15mm to help take pressure off your hands, neck and shoulders."
            },
            {
                image: "https://media.istockphoto.com/id/2164408933/photo/woman-riding-her-roadbike-on-road-in-the-austrian-alps-under-dramatic-sky.jpg?s=612x612&w=0&k=20&c=XS_3a-Xqiehbq6ZmUbqi2bYx7zlrlfQlAd_yrUIDbqY=",
                title: "More Confidence, More Stability",
                description: "A 7mm longer wheelbase for confidence to push the pace on descents."
            },
            {
                image: "https://media.istockphoto.com/id/1288946192/photo/crop-of-cyclists-handlebars-and-front-wheel-during-sunrise.jpg?s=612x612&w=0&k=20&c=3vjUqZ_3fiEzO5Sv2auTu_sqrWHRRRzji-bKaOpFAn4=",
                title: "Carve the Corners with Precision",
                description: "A 0.5° Slacker Headtube creates nimble but intuitive handling. Reading your mind."
            },
            {
                image: "https://media.istockphoto.com/id/673085384/photo/cyclist-riding-mountain-road-on-racing-bike.jpg?s=612x612&w=0&k=20&c=tuktU7zpFdXptGDi0Po1TEwUSw_1OYtJq6R_lWU_AlU=",
                title: "Carve the Corners with Precision",
                description: "A 0.5° Slacker Headtube creates nimble but intuitive handling. Reading your mind."
            },
        ],
        isFeatured: true,
        isdark: true,
        tag: "New Arrival",
        originalPrice: 280000,
        discountPercent: 10,
        description: "An unprecedented gravel bike with real suspension. It's the most off-road capable and on-road comfortable road bike ever made. Topstone Carbon distills our experience making fast race bikes, comfortable endurance bikes and ultra-light dual suspension mountain bikes into an exceptional machine.",
        rating: 4.9,
        reviewCount: 3,
        reviews: [
            {
                id: "r1",
                author: "James L.",
                rating: 5,
                date: "3 weeks ago",
                title: "Incredible Gravel Machine",
                content: "The Kingpin suspension system is a game changer. It smooths out the rough stuff without losing power transfer.",
                isVerified: true
            },
            {
                id: "r2",
                author: "Emily R.",
                rating: 5,
                date: "1 month ago",
                title: "Versatile and Fast",
                content: "I use this for commuting and weekend gravel grinder events. It handles everything beautifully.",
                isVerified: true
            },
            {
                id: "r3",
                author: "Mark S.",
                rating: 5,
                date: "2 months ago",
                title: "Worth every penny",
                content: "Top tier components and a frame that feels alive. Highly recommended for serious gravel riders.",
                isVerified: true
            }
        ],
        stock: 5,
        emi: "₹20,833/month",
        video: "8RXApPZzOmg",
        specs: [
            {
                label: "Frameset",
                items: [
                    { name: "Frame", value: "BallisTec Carbon Frame, Kingpin suspension system, 12x142 Speed Release Thru-axle, dropper post compatible" },
                    { name: "Fork", value: "BallisTec Full Carbon, 1-1/8\" to 1.5\" steerer, 55mm OutFront offset" }
                ]
            },
            {
                label: "Drivetrain",
                items: [
                    { name: "Shifters", value: "Shimano GRX 800, 11-speed" },
                    { name: "Rear Derailleur", value: "Shimano GRX 812, Shadow RD+" },
                    { name: "Crank", value: "Cannondale 1, BB30a, OPI SpideRing, 40T" },
                    { name: "Cassette", value: "Shimano SLX, 11-42, 11-speed" }
                ]
            },
            {
                label: "Components",
                items: [
                    { name: "Brakes", value: "Shimano GRX 400 hydraulic disc, 160/160mm RT64 rotors" },
                    { name: "Handlebar", value: "Cannondale 3, butted 6061 alloy, 16 deg flare drop" },
                    { name: "Saddle", value: "Fabric Scoop Shallow Sport, steel rails" }
                ]
            }
        ],
        downloads: [
            { name: "Topstone Owner's Manual", url: "#" },
            { name: "Cannondale Warranty Info", url: "#" }
        ]
    },
    {
        id: "3",
        title: "Polygon Siskiu T8",
        category: "Mountain Bikes",
        price: 180000,
        brand: "Polygon",
        size: ["S3", "S4", "S5"],
        wheelSize: "29 inch",
        material: "Aluminum",
        suspension: "Front & Rear",
        color: [{ name: "Purple", code: "#a855f7" }],
        image: ["https://cradiac.com/cdn/shop/files/ft.jpg?v=1742208888", "https://cradiac.com/cdn/shop/files/Secondary2.0_1066x.jpg?v=1730970258"],
        product_type: "bike",
        tag: "Trending",
        originalPrice: 200000,
        discountPercent: 15,
        description: "The Siskiu T8 is built for riders who want a bike that pedals efficiently uphill, yet descends like a demon. The frame features a slack head tube angle, long reach, and steep seat tube angle to give you the confidence to tackle any trail.",
        rating: 4.7,
        reviewCount: 2,
        reviews: [
            {
                id: "r1",
                author: "David K.",
                rating: 5,
                date: "1 week ago",
                title: "Best value trail bike",
                content: "You can't beat the specs for this price. Fox suspension and SLX drivetrain work flawlessly.",
                isVerified: true
            },
            {
                id: "r2",
                author: "Chris P.",
                rating: 4,
                date: "3 weeks ago",
                title: "Heavy but capable",
                content: "A bit heavy on the climbs, but it destroys the downhills. Very fun bike.",
                isVerified: true
            }
        ],
        productposters: [
            {
                image: "https://media.istockphoto.com/id/1288946192/photo/crop-of-cyclists-handlebars-and-front-wheel-during-sunrise.jpg?s=612x612&w=0&k=20&c=3vjUqZ_3fiEzO5Sv2auTu_sqrWHRRRzji-bKaOpFAn4=",
                title: "New Fit for More Comfort",
                description: "We increased the stack by 15mm to help take pressure off your hands, neck and shoulders."
            },
            {
                image: "https://media.istockphoto.com/id/2164408933/photo/woman-riding-her-roadbike-on-road-in-the-austrian-alps-under-dramatic-sky.jpg?s=612x612&w=0&k=20&c=XS_3a-Xqiehbq6ZmUbqi2bYx7zlrlfQlAd_yrUIDbqY=",
                title: "More Confidence, More Stability",
                description: "A 7mm longer wheelbase for confidence to push the pace on descents."
            },
            {
                image: "https://media.istockphoto.com/id/1288946192/photo/crop-of-cyclists-handlebars-and-front-wheel-during-sunrise.jpg?s=612x612&w=0&k=20&c=3vjUqZ_3fiEzO5Sv2auTu_sqrWHRRRzji-bKaOpFAn4=",
                title: "Carve the Corners with Precision",
                description: "A 0.5° Slacker Headtube creates nimble but intuitive handling. Reading your mind."
            },
            {
                image: "https://media.istockphoto.com/id/673085384/photo/cyclist-riding-mountain-road-on-racing-bike.jpg?s=612x612&w=0&k=20&c=tuktU7zpFdXptGDi0Po1TEwUSw_1OYtJq6R_lWU_AlU=",
                title: "Carve the Corners with Precision",
                description: "A 0.5° Slacker Headtube creates nimble but intuitive handling. Reading your mind."
            },
        ],
        stock: 8,
        emi: "₹15,000/month",
        video: "8RXApPZzOmg",
        specs: [
            {
                label: "Chassis",
                items: [
                    { name: "Frame", value: "ALX Trail Frame, 135mm Travel, Internal Routing, Boost 148mm" },
                    { name: "Fork", value: "Fox 34 Rhythm Boost 15x110mm, 140mm Travel" },
                    { name: "Shock", value: "Fox Float DPS Special Tuning" }
                ]
            },
            {
                label: "Drivetrain",
                items: [
                    { name: "Shifter", value: "Shimano SLX M7100, 12-Speed" },
                    { name: "Rear Derailleur", value: "Shimano SLX M7100, 12-Speed" },
                    { name: "Crank", value: "Shimano MT-510-1 Boost 32T" }
                ]
            },
            {
                label: "Wheels & Tires",
                items: [
                    { name: "Wheelset", value: "Entity XL2 Disc 35-584 (27.5\") / 35-622 (29\")" },
                    { name: "Tires", value: "Schwalbe Hans Dampf Evo 2.6\"" }
                ]
            }
        ],
        downloads: [
            { name: "Polygon User Guide", url: "#" }
        ]
    },
    {
        id: "4",
        title: "Java Siluro 3",
        category: "Road Bikes",
        price: 85000,
        brand: "Java",
        size: ["S2", "S3", "S4"],
        wheelSize: "700C - hybrid bikes",
        material: "Aluminum",
        suspension: "Rigid",
        color: [{ name: "Black", code: "#000000" }],
        image: ["https://cdn.shopify.com/s/files/1/0628/5547/9548/files/ZeetaPlus27ICMBlk_533x.jpg?v=1714986541", "https://5.imimg.com/data5/SELLER/Default/2025/6/518411085/LK/TL/AF/64907775/27-5-zeeta-plus-ic-electric-bicycle.png"],
        product_type: "bike",
        tag: "Limited",
        originalPrice: 100000,
        discountPercent: 25,
        description: "Java Siluro 3 is an aero road bike designed for speed. With its aerodynamic frame profile and integrated cabling, it cuts through the wind comfortably.",
        stock: 20,
        rating: 4.5,
        reviewCount: 3,
        reviews: [
            {
                id: "r1",
                author: "Rahul M.",
                rating: 5,
                date: "5 days ago",
                title: "Looks expensive!",
                content: "Everyone asks about this bike. The aero profile looks amazing and it's quite fast on flats.",
                isVerified: true
            },
            {
                id: "r2",
                author: "Amit B.",
                rating: 4,
                date: "2 weeks ago",
                title: "Good starter aero bike",
                content: "Decent components. The brakes needed some adjustment out of the box, but runs smooth now.",
                isVerified: false
            },
            {
                id: "r3",
                author: "Sandeep R.",
                rating: 4,
                date: "1 month ago",
                title: "Fast delivery",
                content: "Bike arrived in good condition. Easy to assemble.",
                isVerified: true
            }
        ],
        emi: "₹7,083/month",
        video: "8RXApPZzOmg",
        specs: [
            {
                label: "General",
                items: [
                    { name: "Frame", value: "Java Siluro Aluminium Aero Frame, Smooth Welds" },
                    { name: "Fork", value: "Carbon Fork, Tapered Steerer" },
                    { name: "Weight", value: "10.5 kg approx" }
                ]
            },
            {
                label: "Drivetrain",
                items: [
                    { name: "Shifters", value: "Deca 2x9 Speed" },
                    { name: "Derailleurs", value: "Shimano Sora R3000 (Front & Rear)" },
                    { name: "Crankset", value: "Deca Hollowtech, 50/34T" }
                ]
            },
            {
                label: "Components",
                items: [
                    { name: "Brakes", value: "Deca Cable Actuated Hydraulic Disc Brakes" },
                    { name: "Wheels", value: "Deca 40mm Deep Dish Alloy Rims" }
                ]
            }
        ],
        downloads: [
            { name: "Java Assembly Guide", url: "#" }
        ]
    },
    {
        id: "5",
        title: "Marin Bobcat Trail",
        category: "Mountain Bikes",
        price: 55000,
        brand: "Marin",
        size: ["S2", "S3", "S4"],
        wheelSize: "27.5 inch",
        material: "Aluminum",
        suspension: "Front",
        color: [{ name: "Blue", code: "#3b82f6" }],
        image: ["https://cradiac.com/cdn/shop/files/ft.jpg?v=1742208888", "https://cradiac.com/cdn/shop/files/Secondary2.0_1066x.jpg?v=1730970258"],
        product_type: "bike",
        tag: "Best Seller",
        originalPrice: 80000,
        discountPercent: 20,
        description: "The Bobcat Trail is a capable mountain bike with modern trail geometry build for exploring singletrack trail systems. Best-in-class frames and solid, serviceable spec make the Bobcat Trail a solid choice for the recreational rider looking to step up to modern geo.",
        stock: 15,
        rating: 4.6,
        reviewCount: 2,
        reviews: [
            {
                id: "r1",
                author: "Tom H.",
                rating: 5,
                date: "1 month ago",
                title: "Fun trail hardtail",
                content: "Geometry feels very modern and confidence inspiring. Great for local trails.",
                isVerified: true
            },
            {
                id: "r2",
                author: "Jerry F.",
                rating: 4,
                date: "3 weeks ago",
                title: "Good bones",
                content: "Frame is excellent, some parts are entry level but easy to upgrade later.",
                isVerified: true
            }
        ],
        emi: "₹4,583/month",
        video: "8RXApPZzOmg",
        specs: [
            {
                label: "Frameset",
                items: [
                    { name: "Frame", value: "Series 2 6061 Aluminum, 68mm BB shell, 135mm Forged Dropouts" },
                    { name: "Fork", value: "SR Suntour XCM HLO, 120mm Travel, Hydraulic Lockout" }
                ]
            },
            {
                label: "Drivetrain",
                items: [
                    { name: "Shifter", value: "Shimano Altus 2x9-Speed" },
                    { name: "Rear Derailleur", value: "Shimano Altus Shadow" },
                    { name: "Crank", value: "Alloy Crank, Steel Chainrings, 36/22T" }
                ]
            },
            {
                label: "Components",
                items: [
                    { name: "Brakes", value: "Tektro M275 Hydraulic Disc, 160mm/180mm Rotors" },
                    { name: "Cassette", value: "SunRace 9-Speed, 11-36T" }
                ]
            }
        ],
        downloads: [
            { name: "Marin Owner Manual", url: "#" }
        ]
    },
    {
        id: "6",
        title: "Look 795 Blade",
        category: "Road Bikes",
        price: 650000,
        brand: "Look",
        size: ["S3", "S4", "S5"],
        wheelSize: "700C - hybrid bikes",
        material: "Carbon",
        suspension: "Rigid",
        color: [{ name: "Green", code: "#22c55e" }, { name: "Black", code: "#000000" }],
        image: ["https://cdn.shopify.com/s/files/1/0628/5547/9548/files/ZeetaPlus27ICMBlk_533x.jpg?v=1714986541", "https://5.imimg.com/data5/SELLER/Default/2025/6/518411085/LK/TL/AF/64907775/27-5-zeeta-plus-ic-electric-bicycle.png"],
        product_type: "bike",
        isFeatured: true,
        tag: "New Arrival",
        originalPrice: 80000,
        discountPercent: 20,
        description: "The 795 Blade RS cuts through the air, provides unmatched stiffness to weight ratio and maintains traction where other bikes fail. Thanks to the new manufacturing process and new composition, the frame is lighter than ever.",
        stock: 2,
        rating: 5.0,
        reviewCount: 4,
        reviews: [
            {
                id: "r1",
                author: "Pierre V.",
                rating: 5,
                date: "2 months ago",
                title: "Ultimate speed machine",
                content: "Stiff, responsive, and insanely fast. The integration is flawless.",
                isVerified: true
            },
            {
                id: "r2",
                author: "Markus S.",
                rating: 5,
                date: "3 weeks ago",
                title: "Dream bike",
                content: "I saved up for years for this and it exceeded all expectations.",
                isVerified: true
            }
        ],
        emi: "₹54,166/month",
        video: "8RXApPZzOmg",
        specs: [
            {
                label: "Frameset",
                items: [
                    { name: "Frame", value: "Look 795 Blade RS Disc, High Modulus Carbon" },
                    { name: "Seatpost", value: "Look Aeropost 3. Carbon, 400mm" },
                    { name: "Stem", value: "Look ADS, integrated" }
                ]
            },
            {
                label: "Drivetrain",
                items: [
                    { name: "Groupset", value: "SRAM Red eTap AXS 12-speed" },
                    { name: "Crankset", value: "SRAM Red Carbon, 48/35T" },
                    { name: "Cassette", value: "SRAM XG-1290, 10-28T" }
                ]
            },
            {
                label: "Components",
                items: [
                    { name: "Wheels", value: "Corima 47mm WS Black Carbon" },
                    { name: "Tires", value: "Continental GP5000 25c" }
                ]
            }
        ],
        downloads: [
            { name: "Look 795 User Manual", url: "#" }
        ]
    },
    {
        id: "7",
        title: "Fuji Absolute",
        category: "Hybrid Bikes",
        price: 45000,
        brand: "Fuji",
        size: ["S2", "S3", "S4"],
        wheelSize: "700C - hybrid bikes",
        material: "Aluminum",
        suspension: "Rigid",
        color: [{ name: "Grey", code: "#6b7280" }, { name: "White", code: "#ffffff" }],
        image: ["https://cradiac.com/cdn/shop/files/ft.jpg?v=1742208888", "https://cradiac.com/cdn/shop/files/Secondary2.0_1066x.jpg?v=1730970258"],
        product_type: "bike",
        tag: "Trending",
        originalPrice: 60000,
        discountPercent: 10,
        description: "Known for versatility, the Absolute's geometry strikes a balance between speed and comfort, making it ideal for the fitness-minded rider, or the urbanite looking to ride to work or run errands.",
        stock: 25,
        rating: 4.4,
        reviewCount: 12,
        reviews: [
            {
                id: "r1",
                author: "Samantha W.",
                rating: 5,
                date: "3 months ago",
                title: "Perfect commuter",
                content: "I ride this to work every day. It's comfortable and reliable.",
                isVerified: true
            },
            {
                id: "r2",
                author: "Joe D.",
                rating: 4,
                date: "1 month ago",
                title: "Good fitness bike",
                content: "Nice for evening rides. The seat is okay but I might upgrade it.",
                isVerified: true
            }
        ],
        emi: "₹3,750/month",
        video: "8RXApPZzOmg",
        specs: [
            {
                label: "Frameset",
                items: [
                    { name: "Frame", value: "Fuji A2-SL custom-butted alloy" },
                    { name: "Fork", value: "Fuji Hi-Ten steel, straight blade" }
                ]
            },
            {
                label: "Drivetrain",
                items: [
                    { name: "Shifters", value: "Shimano Altus, Rapid Fire, 3x9-speed" },
                    { name: "Derailleurs", value: "Shimano Altus (Front & Rear)" },
                    { name: "Crankset", value: "Shimano Ty-501, 48/38/28T" }
                ]
            },
            {
                label: "Components",
                items: [
                    { name: "Brakes", value: "Tektro mechanical disc, 160mm rotors" },
                    { name: "Tires", value: "Kenda Tendril, 700 x 38c" }
                ]
            }
        ],
        downloads: [
            { name: "Fuji Owner's Manual", url: "#" }
        ]
    },
    {
        id: "8",
        title: "Firefox Bad Attitude",
        category: "Mountain Bikes",
        price: 22000,
        brand: "Firefox",
        size: ["S3"],
        wheelSize: "26 inch",
        material: "Steel",
        suspension: "Front",
        color: [{ name: "Black", code: "#000000" }],
        image: ["https://cdn.shopify.com/s/files/1/0628/5547/9548/files/ZeetaPlus27ICMBlk_533x.jpg?v=1714986541", "https://5.imimg.com/data5/SELLER/Default/2025/6/518411085/LK/TL/AF/64907775/27-5-zeeta-plus-ic-electric-bicycle.png"],
        product_type: "bike",
        tag: "Limited",
        originalPrice: 60000,
        discountPercent: 10,
        description: "The Firefox Bad Attitude is built on a strong Steel frame which is resilient and robust. The frame geometry allows for a comfortable upright riding position.",
        stock: 40,
        rating: 4.2,
        reviewCount: 8,
        reviews: [
            {
                id: "r1",
                author: "Karan S.",
                rating: 5,
                date: "6 months ago",
                title: "Strong bike",
                content: "Very durable. I abuse it on bad roads and it holds up.",
                isVerified: true
            },
            {
                id: "r2",
                author: "Arjun P.",
                rating: 3,
                date: "2 months ago",
                title: "Heavy",
                content: "It's a steel frame so it is heavy. Good for exercise though.",
                isVerified: true
            }
        ],
        emi: "₹1,833/month",
        video: "dummy_video_8",
        specs: [
            {
                label: "Frameset",
                items: [
                    { name: "Frame", value: "High Tensile Steel MTB Frame" },
                    { name: "Fork", value: "Zoom Suspension Fork, 60mm Travel" }
                ]
            },
            {
                label: "Drivetrain",
                items: [
                    { name: "Shifters", value: "Microshift, 21 Speed" },
                    { name: "Rear Derailleur", value: "Microshift M21" },
                    { name: "Crateset", value: "Steel, 42/34/24T" }
                ]
            },
            {
                label: "Components",
                items: [
                    { name: "Brakes", value: "V-Brakes" },
                    { name: "Rims", value: "Single Wall Alloy Rims" }
                ]
            }
        ],
        downloads: [
            { name: "Firefox User Guide", url: "#" }
        ]
    },
    {
        id: "9",
        title: "Firefox Viper",
        category: "Mountain Bikes",
        price: 24000,
        brand: "Firefox",
        size: ["S3", "S4"],
        wheelSize: "27.5 inch",
        material: "Aluminum",
        suspension: "Front",
        color: [{ name: "Black", code: "#000000" }],
        image: ["https://cdn.shopify.com/s/files/1/0628/5547/9548/files/ZeetaPlus27ICMBlk_533x.jpg?v=1714986541", "https://5.imimg.com/data5/SELLER/Default/2025/6/518411085/LK/TL/AF/64907775/27-5-zeeta-plus-ic-electric-bicycle.png"],
        product_type: "bike",
        tag: "Limited",
        originalPrice: 28000,
        discountPercent: 15,
        description: "Entry level MTB for city rides and light trails. Features 21 speed Shimano gears.",
        stock: 18,
        rating: 4.3,
        reviewCount: 5,
        reviews: [
            {
                id: "r1",
                author: "Vikram R.",
                rating: 4,
                date: "1 month ago",
                title: "Good looks",
                content: "Matte black finish looks great. Gear shifting is smooth.",
                isVerified: true
            }
        ],
        emi: "₹2,000/month",
        video: "8RXApPZzOmg",
        specs: [
            {
                label: "Frameset",
                items: [
                    { name: "Frame", value: "Alloy Hardtail MTB Frame" },
                    { name: "Fork", value: "Suspension Fork, 80mm Travel" }
                ]
            },
            {
                label: "Drivetrain",
                items: [
                    { name: "Shifters", value: "Shimano EF500, 21 Speed" },
                    { name: "Rear Derailleur", value: "Shimano Tourney TY300" }
                ]
            },
            {
                label: "Components",
                items: [
                    { name: "Brakes", value: "Mechanical Disc Brakes" },
                    { name: "Tires", value: "27.5 x 2.10\" Nylon Tires" }
                ]
            }
        ],
        downloads: [
            { name: "Firefox Manual", url: "#" }
        ]
    },
    {
        id: "10",
        title: "Trek Domane AL 2",
        category: "Road Bikes",
        price: 72000,
        brand: "Trek",
        size: ["S3", "S4", "S5"],
        wheelSize: "700C - hybrid bikes",
        material: "Aluminum",
        suspension: "Rigid",
        color: [{ name: "Black", code: "#000000" }, { name: "Red", code: "#ef4444" }],
        image: ["https://cdn.shopify.com/s/files/1/0628/5547/9548/files/ZeetaPlus27ICMBlk_533x.jpg?v=1714986541", "https://5.imimg.com/data5/SELLER/Default/2025/6/518411085/LK/TL/AF/64907775/27-5-zeeta-plus-ic-electric-bicycle.png"],
        product_type: "bike",
        tag: "Limited",
        originalPrice: 85000,
        discountPercent: 15,
        description: "Domane AL 2 is the perfect gateway to comfortable road cycling. It's stable, light, easy to accessorize, and fun to ride.",
        stock: 10,
        rating: 4.8,
        reviewCount: 6,
        reviews: [
            {
                id: "r1",
                author: "Lucas M.",
                rating: 5,
                date: "3 weeks ago",
                title: "Smooth ride",
                content: "The endurance geometry makes long rides very pleasant.",
                isVerified: true
            },
            {
                id: "r2",
                author: "Sarah T.",
                rating: 5,
                date: "2 months ago",
                title: "Trek quality",
                content: "Excellent build quality as expected from Trek. Great entry road bike.",
                isVerified: true
            }
        ],
        emi: "₹6,000/month",
        video: "8RXApPZzOmg",
        specs: [
            {
                label: "Frameset",
                items: [
                    { name: "Frame", value: "100 Series Alpha Aluminum, DuoTrap S compatible, fender mounts" },
                    { name: "Fork", value: "Domane carbon, straight alloy steerer" }
                ]
            },
            {
                label: "Drivetrain",
                items: [
                    { name: "Shifters", value: "Shimano Claris R2000, 8 speed" },
                    { name: "Front Derailleur", value: "Shimano Claris R2000, 31.8mm clamp" },
                    { name: "Rear Derailleur", value: "Shimano Claris R2000, medium cage, 34T max cog" }
                ]
            },
            {
                label: "Components",
                items: [
                    { name: "Brakes", value: "Alloy dual-pivot" },
                    { name: "Tires", value: "Bontrager R1 Hard-Case Lite, 700x28c" }
                ]
            }
        ],
        downloads: [
            { name: "Trek Domane Manual", url: "#" }
        ]
    },
    {
        id: "11",
        title: "Giant Talon 1",
        category: "Mountain Bikes",
        price: 58000,
        brand: "Imported",
        size: ["S2", "S3", "S4"],
        wheelSize: "29 inch",
        material: "Aluminum",
        suspension: "Front",
        color: [{ name: "Orange", code: "#f97316" }, { name: "Black", code: "#000000" }],
        image: ["https://cdn.shopify.com/s/files/1/0628/5547/9548/files/ZeetaPlus27ICMBlk_533x.jpg?v=1714986541", "https://5.imimg.com/data5/SELLER/Default/2025/6/518411085/LK/TL/AF/64907775/27-5-zeeta-plus-ic-electric-bicycle.png"],
        product_type: "bike",
        tag: "Limited",
        originalPrice: 65000,
        discountPercent: 10,
        description: "Get a feel for the trail with this all-new aluminum hardtail made for aspiring singletrack riders.",
        stock: 7,
        rating: 4.5,
        reviewCount: 9,
        reviews: [
            {
                id: "r1",
                author: "Nathan D.",
                rating: 5,
                date: "2 weeks ago",
                title: "Great first MTB",
                content: "I'm new to mountain biking and this bike has been perfect to learn on.",
                isVerified: true
            },
            {
                id: "r2",
                author: "Paul B.",
                rating: 4,
                date: "1 month ago",
                title: "Solid performance",
                content: "Brakes are responsive and the fork works well on small bumps.",
                isVerified: true
            }
        ],
        emi: "₹4,833/month",
        video: "8RXApPZzOmg",
        specs: [
            {
                label: "Frameset",
                items: [
                    { name: "Frame", value: "ALUXX-Grade Aluminum, disc" },
                    { name: "Fork", value: "SXC32-2 RL, air spring, QR, alloy steerer, 100mm travel" }
                ]
            },
            {
                label: "Drivetrain",
                items: [
                    { name: "Shifters", value: "Shimano Deore M4100, 1x10" },
                    { name: "Rear Derailleur", value: "Shimano Deore M5120" },
                    { name: "Crankset", value: "ProWheel Charm, 32t" }
                ]
            },
            {
                label: "Components",
                items: [
                    { name: "Brakes", value: "Tektro HDC M275, hydraulic, Tektro rotors [F]180mm, [R]160mm" },
                    { name: "Cassette", value: "Shimano Deore M4100, 11x42" }
                ]
            }
        ],
        downloads: [
            { name: "Giant Talon Manual", url: "#" }
        ]
    },
    {
        id: "12",
        title: "Scott Speedster 40",
        category: "Road Bikes",
        price: 78000,
        brand: "Imported",
        size: ["S3", "S4", "S5"],
        wheelSize: "700C - hybrid bikes",
        material: "Aluminum",
        suspension: "Rigid",
        color: [{ name: "Black", code: "#000000" }, { name: "Blue", code: "#3b82f6" }],
        image: ["https://cdn.shopify.com/s/files/1/0628/5547/9548/files/ZeetaPlus27ICMBlk_533x.jpg?v=1714986541", "https://5.imimg.com/data5/SELLER/Default/2025/6/518411085/LK/TL/AF/64907775/27-5-zeeta-plus-ic-electric-bicycle.png"],
        product_type: "bike",
        tag: "Limited",
        originalPrice: 82000,
        discountPercent: 5,
        description: "The Scott Speedster is light, agile and cost efficient. The Speedster 40 features a Shimano groupset and Syncros components.",
        stock: 6,
        rating: 4.7,
        reviewCount: 4,
        reviews: [
            {
                id: "r1",
                author: "Oliver G.",
                rating: 5,
                date: "1 month ago",
                title: "Fast and light",
                content: "Surprised by how light it is for an aluminum bike. Very fast on the road.",
                isVerified: true
            }
        ],
        emi: "₹6,500/month",
        video: "8RXApPZzOmg",
        specs: [
            {
                label: "Frameset",
                items: [
                    { name: "Frame", value: "Speedster / 6061 D.Butted Alloy, Endurance geometry" },
                    { name: "Fork", value: "Speedster Alloy, 1 1/8\" Alloy steerer" }
                ]
            },
            {
                label: "Drivetrain",
                items: [
                    { name: "Shifters", value: "Shimano Claris ST-R2000, Dual control 16 Speed" },
                    { name: "Derailleurs", value: "Shimano Claris RD-R2000-GS, 16 Speed" }
                ]
            },
            {
                label: "Components",
                items: [
                    { name: "Brakes", value: "Tektro BR-315, 39-51mm" },
                    { name: "Tires", value: "Schwalbe Lugano, 700x28C" }
                ]
            }
        ],
        downloads: [
            { name: "Scott Manual", url: "#" }
        ]
    },
    {
        id: "13",
        title: "Merida Big Nine",
        category: "Mountain Bikes",
        price: 48000,
        brand: "Imported",
        size: ["S2", "S3", "S4"],
        wheelSize: "29 inch",
        material: "Aluminum",
        suspension: "Front",
        color: [{ name: "Green", code: "#22c55e" }, { name: "Black", code: "#000000" }],
        image: ["https://cdn.shopify.com/s/files/1/0628/5547/9548/files/ZeetaPlus27ICMBlk_533x.jpg?v=1714986541", "https://5.imimg.com/data5/SELLER/Default/2025/6/518411085/LK/TL/AF/64907775/27-5-zeeta-plus-ic-electric-bicycle.png"],
        product_type: "bike",
        tag: "Limited",
        originalPrice: 55000,
        discountPercent: 12,
        description: "The Big Nine 20-2x is a hardtail mountain bike with 29 inch wheels and a 100mm travel fork.",
        stock: 14,
        rating: 4.3,
        reviewCount: 7,
        reviews: [
            {
                id: "r1",
                author: "Rohan K.",
                rating: 4,
                date: "3 weeks ago",
                title: "Good 29er",
                content: "Rolls over everything accurately. The components are decent for the price.",
                isVerified: true
            }
        ],
        emi: "₹4,000/month",
        video: "8RXApPZzOmg",
        specs: [
            {
                label: "Frameset",
                items: [
                    { name: "Frame", value: "BIG.NINE TFS III, aluminum, 29x2.25\" max wheel width" },
                    { name: "Fork", value: "Suntour XCT30 HLO, Coil, 100mm travel, lockout" }
                ]
            },
            {
                label: "Drivetrain",
                items: [
                    { name: "Shifters", value: "Shimano ST-EF505" },
                    { name: "Derailleurs", value: "Shimano FD-M2020-TS / Shimano RD-M370" }
                ]
            },
            {
                label: "Components",
                items: [
                    { name: "Brakes", value: "Shimano ST-EF505, BR-MT200 brake caliper" },
                    { name: "Rims", value: "MERIDA CC, 17mm inner width, aluminum" }
                ]
            }
        ],
        downloads: [
            { name: "Merida User Guide", url: "#" }
        ]
    },
    {
        id: "14",
        title: "Polygon Path 2",
        category: "Hybrid Bikes",
        price: 35000,
        brand: "Polygon",
        size: ["S3", "S4"],
        wheelSize: "700C - hybrid bikes",
        material: "Aluminum",
        suspension: "Rigid",
        color: [{ name: "White", code: "#ffffff" }, { name: "Blue", code: "#3b82f6" }],
        image: ["https://cdn.shopify.com/s/files/1/0628/5547/9548/files/ZeetaPlus27ICMBlk_533x.jpg?v=1714986541", "https://5.imimg.com/data5/SELLER/Default/2025/6/518411085/LK/TL/AF/64907775/27-5-zeeta-plus-ic-electric-bicycle.png"],
        product_type: "bike",
        tag: "Limited",
        originalPrice: 40000,
        discountPercent: 12,
        description: "Polygon Path 2 is a speed utility bike that combines the speed and agility of a road bike with the comfort and upright riding position of a commuter.",
        stock: 22,
        rating: 4.6,
        reviewCount: 15,
        reviews: [
            {
                id: "r1",
                author: "Anjali S.",
                rating: 5,
                date: "2 months ago",
                title: "Best city bike",
                content: "I love how fast this bike is. It's perfect for navigating through traffic.",
                isVerified: true
            }
        ],
        emi: "₹2,916/month",
        video: "8RXApPZzOmg",
        specs: [
            {
                label: "Frameset",
                items: [
                    { name: "Frame", value: "AL6 Urban Pavement Frame" },
                    { name: "Fork", value: "Alloy Rigid Fork" }
                ]
            },
            {
                label: "Drivetrain",
                items: [
                    { name: "Shifters", value: "Shimano Altus M315 3x8 Speed" },
                    { name: "Derailleurs", value: "Shimano Tourney / Altus" }
                ]
            },
            {
                label: "Components",
                items: [
                    { name: "Brakes", value: "Tektro MD-M280 Mechanical Disc Brake" },
                    { name: "Tires", value: "Vee Tire Speedster 700x40C" }
                ]
            }
        ],
        downloads: [
            { name: "Polygon Path Manual", url: "#" }
        ]
    },
    {
        id: "15",
        title: "Riverside 500",
        category: "Hybrid Bikes",
        price: 28000,
        brand: "Imported",
        size: ["S2", "S3"],
        wheelSize: "700C - hybrid bikes",
        material: "Aluminum",
        suspension: "Front",
        color: [{ name: "Grey", code: "#6b7280" }, { name: "Black", code: "#000000" }],
        image: ["https://cdn.shopify.com/s/files/1/0628/5547/9548/files/ZeetaPlus27ICMBlk_533x.jpg?v=1714986541", "https://5.imimg.com/data5/SELLER/Default/2025/6/518411085/LK/TL/AF/64907775/27-5-zeeta-plus-ic-electric-bicycle.png"],
        product_type: "bike",
        tag: "Limited",
        originalPrice: 32000,
        discountPercent: 12,
        description: "Designed for day-long rides on roads and trails. The Riverside 500 hybrid bike has been improved to protect you while riding off the beaten path.",
        stock: 30,
        emi: "₹2,333/month",
        video: "8RXApPZzOmg",
        specs: [
            {
                label: "Frameset",
                items: [
                    { name: "Frame", value: "6061 aluminum" },
                    { name: "Fork", value: "Spring suspension fork with 60mm travel" }
                ]
            },
            {
                label: "Drivetrain",
                items: [
                    { name: "Shifters", value: "Microshift, 9 speed" },
                    { name: "Rear Derailleur", value: "B'Twin by Microshift 9 speed" }
                ]
            },
            {
                label: "Components",
                items: [
                    { name: "Brakes", value: "Mechanical disc brakes" },
                    { name: "Wheels", value: "Double-walled aluminum rims, 28 inch" }
                ]
            }
        ],
        downloads: [
            { name: "Riverside Manual", url: "#" }
        ]
    },
];