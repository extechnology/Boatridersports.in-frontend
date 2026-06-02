export const MENU_ITEMS = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Bikes', href: '/shop/bike', hasDropdown: true },
    { name: 'Accessories', href: '/shop/accessories', hasDropdown: true },
    { name: 'Events', href: '/events', },
    { name: 'Contact', href: '/contact' },
];

export const BIKES_CATEGORIES = [
    {
        title: 'Mountain Bikes',
        href: '/shop/mountain',
        items: [
            { name: 'Trail', price: 'From $2,500', image: "https://justbuycycles.com/cdn/shop/products/T04726_1.png?v=1663829546" },
            { name: 'Downhill', price: 'From $4,000', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9kosXTzQyuibQ3S8xL-fHhWJN7FO0VkVb1A&s" },
            { name: 'Cross Country', price: 'From $3,200', image: "https://justbuycycles.com/cdn/shop/files/1_497c3424-d767-4f02-8868-5d24fc7736ea.jpg?v=1728047417" },
            { name: 'Enduro', price: 'From $3,200', image: "https://justbuycycles.com/cdn/shop/files/1_497c3424-d767-4f02-8868-5d24fc7736ea.jpg?v=1728047417" },
            { name: 'Enduro', price: 'From $3,200', image: "https://justbuycycles.com/cdn/shop/files/1_497c3424-d767-4f02-8868-5d24fc7736ea.jpg?v=1728047417" },
            { name: 'Enduro', price: 'From $3,200', image: "https://justbuycycles.com/cdn/shop/files/1_497c3424-d767-4f02-8868-5d24fc7736ea.jpg?v=1728047417" },
        ],
        image: 'https://static.vecteezy.com/system/resources/thumbnails/070/103/302/small/mountain-biker-cycling-on-rocky-trail-outdoor-sport-adventure-photo.jpg'
    },
    {
        title: 'Electric Bikes',
        href: '/shop/electric',
        items: [
            { name: 'Turbo Levo', price: 'From $5,000', image: "https://justbuycycles.com/cdn/shop/products/T04726_1.png?v=1663829546" },
            { name: 'Turbo Vado', price: 'From $3,500', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9kosXTzQyuibQ3S8xL-fHhWJN7FO0VkVb1A&s" },
            { name: 'Enduro', price: 'From $3,200', image: "https://justbuycycles.com/cdn/shop/files/1_497c3424-d767-4f02-8868-5d24fc7736ea.jpg?v=1728047417" },
        ],
        image: 'https://images.pexels.com/photos/15020753/pexels-photo-15020753.jpeg?cs=srgb&dl=pexels-team-evelo-413077137-15020753.jpg&fm=jpg'
    },
    {
        title: 'Road Bikes',
        href: '/shop/road',
        items: [
            { name: 'Tarmac', price: 'From $3,800', image: "https://justbuycycles.com/cdn/shop/products/T04726_1.png?v=1663829546" },
            { name: 'Aethos', price: 'From $4,200', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9kosXTzQyuibQ3S8xL-fHhWJN7FO0VkVb1A&s" },
            { name: 'Enduro', price: 'From $3,200', image: "https://justbuycycles.com/cdn/shop/files/1_497c3424-d767-4f02-8868-5d24fc7736ea.jpg?v=1728047417" },
        ],
        image: 'https://media.istockphoto.com/id/1048624316/photo/cyclist-legs-riding-mountain-bike-on-highway.jpg?s=1024x1024&w=is&k=20&c=AKZnoG8FU8Gk6RuhzEuGrU8DNeEJ-f5XsZouLLVkLF0='
    },
    {
        title: 'Hybrid Bikes',
        href: '/shop/hybrid',
        items: [
            { name: 'Tarmac', price: 'From $3,800', image: "https://justbuycycles.com/cdn/shop/products/T04726_1.png?v=1663829546" },
            { name: 'Aethos', price: 'From $4,200', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9kosXTzQyuibQ3S8xL-fHhWJN7FO0VkVb1A&s" },
            { name: 'Enduro', price: 'From $3,200', image: "https://justbuycycles.com/cdn/shop/files/1_497c3424-d767-4f02-8868-5d24fc7736ea.jpg?v=1728047417" },
        ],
        image: 'https://media.istockphoto.com/id/973722408/photo/silhouette-of-cyclist-on-the-background-of-beautiful-sunset.jpg?s=612x612&w=0&k=20&c=WiFWuNZkBHEY_7wdUMAxfTbonIFlR1z64QQhB5jZOQ8='
    }
];

export const ACCESSORIES_CATEGORIES = [
    {
        title: 'Gear',
        href: '/shop/gear',
        items: [
            { name: 'Helmets', price: 'From $50', image: "https://omobikes.com/cdn/shop/products/1655449384604.jpg?v=1751275251" },
            { name: 'Shoes', price: 'From $100', image: "https://m.media-amazon.com/images/I/61-OizRpLqL.jpg" },
            { name: 'Jerseys', price: 'From $60', image: "https://m.media-amazon.com/images/I/713LeAtX5HL.jpg" }
        ],
        image: 'https://st3.depositphotos.com/1177973/16298/i/450/depositphotos_162980976-stock-photo-bicycle-parts-and-tools-on.jpg'
    },
    {
        title: 'Components',
        href: '/shop/components',
        items: [
            { name: 'Tires', price: 'From $40', image: "https://omobikes.com/cdn/shop/collections/Bicycle_Tyre_and_Tube_collection_page.jpg?v=1756906520" },
            { name: 'Wheels', price: 'From $200', image: "https://m.media-amazon.com/images/I/51W3Pl8aKsL._AC_UF894,1000_QL80_.jpg" },
            { name: 'Handlebars', price: 'From $80', image: "https://www.shutterstock.com/image-illustration/bike-handle-bars-3d-illustration-600nw-1846414138.jpg" }
        ],
        image: 'https://www.shutterstock.com/image-photo/closeup-mountain-bike-brake-disc-600nw-2642830141.jpg'
    }
];

export const getDropdownContent = (category: string) => {
    if (category === 'Bikes') return BIKES_CATEGORIES;
    if (category === 'Accessories') return ACCESSORIES_CATEGORIES;
    return [];
};