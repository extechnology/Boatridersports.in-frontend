

// check login response
export interface User {
    id: number;
    username: string;
    email: string;
    phone: string;
    total_orders: number;
    address_count: number
    cart_count: number
    total_spend: number

}


// check login response
export interface AuthResponse {
    is_logged_in: boolean;
    user: User;
}