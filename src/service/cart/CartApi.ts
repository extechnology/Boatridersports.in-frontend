import { CommonApi } from "@/lib/CommonApi";




// Get Cart List
export const GetCartListApi = async () => {
    // If not logged in, return empty cart immediately without firing unnecessary 401 requests
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("access_token");
        const isLoggedIn = localStorage.getItem("is_logged_in") === "true";
        if (!token && !isLoggedIn) {
            return { cart_items: [], total_price: 0, count: 0 };
        }
    }

    try {
        return await CommonApi("GET", `/cart/user-cart/`);
    } catch (error: any) {
        if (error?.status === 401 || error?.response?.status === 401) {
            return { cart_items: [], total_price: 0, count: 0 };
        }
        throw error;
    }
}



// Add to Cart
export const AddToCartApi = async (data: FormData) => {

    return await CommonApi("POST", `/cart/add-user-cart-items/`, data);

}



// Delete Cart Item
export const DeleteCartItemApi = async (cart_item_id: string, product_type: string) => {

    const params = new URLSearchParams({ cart_item_id, product_type }).toString();

    return await CommonApi("DELETE", `/cart/delete-user-cart-items/?${params}`);

}



// Update Cart Item
export const UpdateCartItemApi = async (data: FormData) => {

    return await CommonApi("PATCH", `/cart/update-cart-item/`, data);

}



// Delete All Cart Items
export const DeleteAllCartItemsApi = async () => {

    return await CommonApi("DELETE", `/cart/delete-all-cart-items/`);

}



import { CreateRazorpayOrderApi, VerifyRazorpayOrderApi, GetUserOrdersApi } from "@/service/order/OrderApi";
import { CreateOrderRequest, VerifyOrderRequest } from "@/service/order/types";

// Cart checkout Api (Razorpay)
export const CartCheckoutApi = async (data: CreateOrderRequest | FormData) => {
    return await CreateRazorpayOrderApi(data);
};

// Verify Order Payment (Razorpay)
export const VerifyOrderPaymentApi = async (data: VerifyOrderRequest | FormData) => {
    return await VerifyRazorpayOrderApi(data);
};

// Get Order Details
export const GetOrderDetailsApi = async () => {
    return await GetUserOrdersApi();
};
