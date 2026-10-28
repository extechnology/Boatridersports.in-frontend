export type OrderStatus =
    | "Pending"
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Cancelled"
    | "Failed";

export interface OrderAddress {
    id?: number;
    unique_id?: string;
    name: string;
    phone_number: string;
    address_type?: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string | null;
    alternate_phone_number?: string | null;
    is_default?: boolean;
    created?: string;
    updated?: string;
    user?: number;
}

export type OrderImageItem = string | { image: string };

export interface OrderBikeColorDetail {
    color_name?: string;
    id?: number;
}

export interface OrderBikeColor {
    id?: number;
    created?: string;
    updated?: string;
    bike?: number;
    color?: string | OrderBikeColorDetail;
    bike_images?: OrderImageItem[];
}

export interface OrderBikeSize {
    id?: number;
    size: string;
    created?: string;
    updated?: string;
}

export interface OrderBike {
    id?: number;
    unique_id: string;
    name: string;
    description?: string;
    product_type?: "bike" | string;
    price: string;
    stock?: number;
    is_available?: boolean;
    is_out_of_stock?: boolean;
    is_discount?: boolean;
    discount_price?: string;
    discount_percentage?: string;
    featured_image?: string | null;
    bike_colors?: OrderBikeColor[];
    shipping_charge?: string;
}

export interface OrderAccessory {
    id?: number;
    unique_id: string;
    name: string;
    description?: string;
    product_type?: "accessories" | string;
    price: string;
    stock?: number;
    is_available?: boolean;
    is_out_of_stock?: boolean;
    is_discount?: boolean;
    discount_price?: string;
    discount_percentage?: string;
    accessory_images?: OrderImageItem[];
    shipping_charge?: string;
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
    created_at?: string;
    updated_at?: string;
    order?: number;
}

export interface UserOrder {
    id: number;
    unique_id: string;
    user?: number;
    status: OrderStatus;
    payment_status: boolean;
    payment_gateway?: string;
    razorpay_order_id?: string | null;
    razorpay_payment_id?: string | null;
    razorpay_signature?: string | null;
    total_amount: string;
    total_items: number;
    invoice: string | null;
    deliverd_at?: string | null;
    estimated_delivery?: string | null;
    tracking_id?: string | null;
    shipped_via?: string | null;
    user_address: OrderAddress;
    all_products: OrderProduct[];
    created_at: string;
    updated_at: string;
}

export interface CreateOrderRequest {
    address_id: string;
    currency?: string;
}

export interface CreateOrderResponse {
    order_id: string;
    razorpay_order_id: string;
    amount: number; // in paise
    currency: string;
    razorpay_key_id: string;
    order: UserOrder;
}

export interface VerifyOrderRequest {
    order_id: string;
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

export interface VerifyOrderResponse {
    status: "success" | "failed";
    message: string;
    order_status?: OrderStatus;
}
