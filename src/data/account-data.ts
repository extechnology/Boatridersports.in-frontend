// Account Data Types and Dummy Data

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    joinedDate: string;
}

export interface OrderItem {
    id: string;
    productId: string;
    productName: string;
    productImage: string;
    quantity: number;
    price: number;
    size?: string;
    color?: string;
}

export interface Order {
    id: string;
    orderNumber: string;
    date: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    items: OrderItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    shippingAddress: Address;
    estimatedDelivery?: string;
    trackingNumber?: string;
}

export interface Address {
    id: string;
    type: 'home' | 'work' | 'other';
    name: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    isDefault: boolean;
}

export interface AccountStats {
    totalOrders: number;
    savedAddresses: number;
    wishlistItems: number;
    totalSpent: number;
}

// Dummy User Data
export const currentUser: User = {
    id: 'user_001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    joinedDate: '2024-03-15'
};

// Dummy Orders Data
export const orders: Order[] = [
    {
        id: 'ord_001',
        orderNumber: 'ORD-2026-001234',
        date: '2026-01-10',
        status: 'delivered',
        items: [
            {
                id: 'item_001',
                productId: '1',
                productName: 'Trek Marlin 7',
                productImage: 'https://cradiac.com/cdn/shop/files/ft.jpg?v=1742208888',
                quantity: 1,
                price: 65000,
                size: 'S3',
                color: 'Red'
            }
        ],
        subtotal: 65000,
        shipping: 0,
        tax: 11700,
        total: 76700,
        shippingAddress: {
            id: 'addr_001',
            type: 'home',
            name: 'John Doe',
            phone: '+91 98765 43210',
            addressLine1: '123, MG Road',
            addressLine2: 'Near City Mall',
            city: 'Bangalore',
            state: 'Karnataka',
            pincode: '560001',
            isDefault: true
        },
        trackingNumber: 'TRK123456789IN'
    },
    {
        id: 'ord_002',
        orderNumber: 'ORD-2026-001189',
        date: '2026-01-05',
        status: 'shipped',
        items: [
            {
                id: 'item_002',
                productId: '4',
                productName: 'Java Siluro 3',
                productImage: 'https://cdn.shopify.com/s/files/1/0628/5547/9548/files/ZeetaPlus27ICMBlk_533x.jpg?v=1714986541',
                quantity: 1,
                price: 85000,
                size: 'S4',
                color: 'Black'
            }
        ],
        subtotal: 85000,
        shipping: 500,
        tax: 15390,
        total: 100890,
        shippingAddress: {
            id: 'addr_002',
            type: 'work',
            name: 'John Doe',
            phone: '+91 98765 43210',
            addressLine1: 'Tech Park, Block A',
            addressLine2: 'Whitefield',
            city: 'Bangalore',
            state: 'Karnataka',
            pincode: '560066',
            isDefault: false
        },
        estimatedDelivery: '2026-01-20',
        trackingNumber: 'TRK987654321IN'
    },
    {
        id: 'ord_003',
        orderNumber: 'ORD-2025-009876',
        date: '2025-12-20',
        status: 'processing',
        items: [
            {
                id: 'item_003',
                productId: '7',
                productName: 'Fuji Absolute',
                productImage: 'https://cradiac.com/cdn/shop/files/ft.jpg?v=1742208888',
                quantity: 1,
                price: 45000,
                size: 'S3',
                color: 'Grey'
            }
        ],
        subtotal: 45000,
        shipping: 0,
        tax: 8100,
        total: 53100,
        shippingAddress: {
            id: 'addr_001',
            type: 'home',
            name: 'John Doe',
            phone: '+91 98765 43210',
            addressLine1: '123, MG Road',
            addressLine2: 'Near City Mall',
            city: 'Bangalore',
            state: 'Karnataka',
            pincode: '560001',
            isDefault: true
        },
        estimatedDelivery: '2026-01-18'
    },
    {
        id: 'ord_004',
        orderNumber: 'ORD-2025-009654',
        date: '2025-11-15',
        status: 'cancelled',
        items: [
            {
                id: 'item_004',
                productId: '5',
                productName: 'Marin Bobcat Trail',
                productImage: 'https://cradiac.com/cdn/shop/files/ft.jpg?v=1742208888',
                quantity: 1,
                price: 55000,
                size: 'S2',
                color: 'Blue'
            }
        ],
        subtotal: 55000,
        shipping: 0,
        tax: 9900,
        total: 64900,
        shippingAddress: {
            id: 'addr_001',
            type: 'home',
            name: 'John Doe',
            phone: '+91 98765 43210',
            addressLine1: '123, MG Road',
            addressLine2: 'Near City Mall',
            city: 'Bangalore',
            state: 'Karnataka',
            pincode: '560001',
            isDefault: true
        }
    }
];

// Dummy Addresses Data
export const addresses: Address[] = [
    {
        id: 'addr_001',
        type: 'home',
        name: 'John Doe',
        phone: '+91 98765 43210',
        addressLine1: '123, MG Road',
        addressLine2: 'Near City Mall',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560001',
        isDefault: true
    },
    {
        id: 'addr_002',
        type: 'work',
        name: 'John Doe',
        phone: '+91 98765 43210',
        addressLine1: 'Tech Park, Block A',
        addressLine2: 'Whitefield',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560066',
        isDefault: false
    },
    {
        id: 'addr_003',
        type: 'other',
        name: 'John Doe',
        phone: '+91 98765 43210',
        addressLine1: '456, Koramangala',
        addressLine2: '5th Block',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560095',
        isDefault: false
    }
];

// Account Statistics
export const accountStats: AccountStats = {
    totalOrders: orders.length,
    savedAddresses: addresses.length,
    wishlistItems: 12,
    totalSpent: orders.reduce((sum, order) => order.status !== 'cancelled' ? sum + order.total : sum, 0)
};

// Helper function to get order status color
export const getOrderStatusColor = (status: Order['status']) => {
    switch (status) {
        case 'pending':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'processing':
            return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'shipped':
            return 'bg-purple-100 text-purple-800 border-purple-200';
        case 'delivered':
            return 'bg-green-100 text-green-800 border-green-200';
        case 'cancelled':
            return 'bg-red-100 text-red-800 border-red-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

// Helper function to get order status label
export const getOrderStatusLabel = (status: Order['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
};