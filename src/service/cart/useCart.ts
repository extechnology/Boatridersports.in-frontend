import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AddToCartApi, DeleteAllCartItemsApi, DeleteCartItemApi, GetCartListApi, UpdateCartItemApi, CartCheckoutApi, VerifyOrderPaymentApi, GetOrderDetailsApi } from "./CartApi";
import { CartResponse, UserOrder } from "./types";

const getErrorMessage = (error: unknown, fallback: string) => {
    if (typeof error === "object" && error !== null && "message" in error) {
        const message = (error as { message?: unknown }).message;
        if (typeof message === "string") return message;
    }

    return fallback;
};



// Get Cart List
export const useGetCartList = () => {
    return useQuery<CartResponse>({

        queryKey: ["cart-list"],

        queryFn: async () => {

            return await GetCartListApi() as CartResponse;

        },

        staleTime: 0,

    });

};




// Get User Orders
export const useGetOrderDetails = () => {

    return useQuery<UserOrder[]>({

        queryKey: ["user-orders"],

        queryFn: async () => {

            return await GetOrderDetailsApi() as UserOrder[];

        },

        staleTime: 0,

    });

};



// Add to Cart
export const useAddToCart = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async (data: FormData) => {

            return await AddToCartApi(data);

        },

        onSuccess: (data) => {

            queryClient.invalidateQueries({ queryKey: ["cart-list"] });

            toast.success(data?.message || "Added to cart successfully!");

        },

        onError: (error: unknown) => {

            toast.error(getErrorMessage(error, "Failed to add to cart"));

        }

    });

};




// Delete Cart Item
export const useDeleteCartItem = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async ({ cart_item_id, product_type }: { cart_item_id: string, product_type: string }) => {

            return await DeleteCartItemApi(cart_item_id, product_type);

        },

        onSuccess: (data) => {

            queryClient.invalidateQueries({ queryKey: ["cart-list"] });
            toast.success(data?.message || "Item removed from cart");

        },

        onError: (error: unknown) => {

            toast.error(getErrorMessage(error, "Failed to remove item"));

        }

    });

};




// Update Cart Item
export const useUpdateCartItem = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async (data: FormData) => {

            return await UpdateCartItemApi(data);

        },

        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ["cart-list"] });

        },

        onError: (error: unknown) => {

            toast.error(getErrorMessage(error, "Failed to update cart"));

        }

    });

};



// Delete All Cart Items
export const useDeleteAllCartItems = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async () => {

            return await DeleteAllCartItemsApi();

        },

        onSuccess: (data) => {

            queryClient.invalidateQueries({ queryKey: ["cart-list"] });
            toast.success(data?.message || "Cart cleared");

        },

        onError: (error: unknown) => {

            toast.error(getErrorMessage(error, "Failed to clear cart"));

        }

    });

};




// Cart Checkout
export const useCartCheckout = () => {



    return useMutation({

        mutationFn: async (data: FormData) => {

            return await CartCheckoutApi(data);

        },

        onError: (error: unknown) => {

            toast.error(getErrorMessage(error, "Failed to checkout"));

        }

    });

};



// Verify Order Payment
export const useVerifyOrderPayment = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async (data: FormData) => {

            return await VerifyOrderPaymentApi(data);

        },

        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ["cart-list"] });
            queryClient.invalidateQueries({ queryKey: ["user-orders"] });
            toast.success("Order placed successfully!");

        },

        onError: (error: unknown) => {

            toast.error(getErrorMessage(error, "Failed to verify payment"));

        }

    });

};
