import { CommonApi } from "@/lib/CommonApi";




// Get Cart List
export const GetCartListApi = async () => {

    return await CommonApi("GET", `/cart/user-cart/`);

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



//Cart checkout Api
export const CartCheckoutApi = async (data: FormData) => {

    return await CommonApi("POST", `/order/create-order/`, data);

}



// Verify Order Payment
export const VerifyOrderPaymentApi = async (data: FormData) => {

    return await CommonApi("POST", `/order/verify-order/`, data);

}


// Get Order Details
export const GetOrderDetailsApi = async () => {
    return await CommonApi("GET", `/order/user-orders/`);
}
