export interface UserAddress {
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
