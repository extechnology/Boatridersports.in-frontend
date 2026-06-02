export interface CartItemBike {
    id: number;
    unique_id: string;
    name: string;
    description: string;
    product_type: "bike";
    price: string;
    stock: number;
    is_available: boolean;
    is_out_of_stock: boolean;
    is_discount: boolean;
    discount_price: string;
    discount_percentage: string;
    featured_image: string | null;
    brand: string;
    category?: string;
    sizes?: unknown[];
    bike_colors?: CartItemColor[];
}

export interface CartItemAccessory {
    id: number;
    unique_id: string;
    name: string;
    description: string;
    product_type: "accessories";
    price: string;
    stock: number;
    is_available: boolean;
    is_out_of_stock: boolean;
    is_discount: boolean;
    discount_price: string;
    discount_percentage: string;
    featured_image: string | null;
    brand: string;
    accessory_images?: string[];
}

export interface CartItemSize {
    id: number;
    size: string;
}

export interface CartItemColor {
    id: number;
    color: string;
    bike_images?: string[];
    bike?: number;
}

export interface CartProduct {
    id: number;
    bike?: CartItemBike;
    accessory?: CartItemAccessory;
    size?: CartItemSize;
    color?: CartItemColor;
    quantity: number;
    user_cart: number;
}


export interface CartResponse {
    id: number;
    total_products: number;
    total_amount: number;
    orginal_amount: number;
    total_discount: number;
    total_bikes: number;
    total_accessories: number;
    all_products: CartProduct[];
    shipping_charge: number;
    unique_id: string;
    user: number;
}

export type OrderStatus =
    | "Pending"
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Cancelled"
    | "Failed";

export interface OrderAddress {
    id: number;
    unique_id: string;
    name: string;
    phone_number: string;
    address_type: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    is_default: boolean;
    created: string;
    updated: string;
    user: number;
}

export interface OrderBikeColor {
    id: number;
    created: string;
    updated: string;
    bike: number;
    color: string;
    bike_images: string[];
}

export interface OrderBikeSize {
    id: number;
    size: string;
    created: string;
    updated: string;
}

export interface OrderBike {
    id: number;
    bike_colors: OrderBikeColor[];
    unique_id: string;
    name: string;
    description: string;
    product_type: "bike";
    price: string;
    stock: number;
    is_available: boolean;
    is_out_of_stock: boolean;
    is_discount: boolean;
    discount_price: string;
    discount_percentage: string;
    background_color: string | null;
    text_color: string | null;
    is_dark: boolean;
    is_featured: boolean;
    featured_image: string | null;
    youtube_link: string | null;
    online_purchase_enabled: boolean;
    shipping_charge: string;
    created: string;
    updated: string;
    special_tag: number | null;
    brand: number | null;
    category: number | null;
    wheel_size: number[];
    sizes: number[];
    material: number[];
    suspension: number[];
    rear_suspension_travel: number[];
}

export interface OrderAccessory {
    id: number;
    accessory_images: string[];
    unique_id: string;
    name: string;
    description: string;
    product_type: "accessories";
    is_dark: boolean;
    price: string;
    stock: number;
    is_available: boolean;
    is_out_of_stock: boolean;
    is_discount: boolean;
    discount_price: string;
    discount_percentage: string;
    created: string;
    updated: string;
    online_purchase_enabled: boolean;
    shipping_charge: string;
    special_tag: number | null;
    sub_category: number | null;
    brand: number | null;
}

export interface OrderProduct {
    id: number;
    bike?: OrderBike;
    accessory?: OrderAccessory;
    color?: OrderBikeColor;
    size?: OrderBikeSize;
    quantity: number;
    price: string;
    subtotal: string;
    created_at: string;
    updated_at: string;
    order: number;
}


export interface UserOrder {
    id: number;
    user_address: OrderAddress;
    all_products: OrderProduct[];
    unique_id: string;
    status: OrderStatus;
    total_amount: string;
    total_items: number;
    payment_status: boolean;
    invoice: string | null;
    tracking_id?: string | null;
    shipped_via?: string | null;
    deliverd_at?: string | null;
    estimated_delivery?: string | null;
    created_at: string;
    updated_at: string;
    user: number;
}
