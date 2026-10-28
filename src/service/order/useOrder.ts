import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    CreateRazorpayOrderApi,
    GetUserOrdersApi,
    VerifyRazorpayOrderApi,
} from "./OrderApi";
import {
    CreateOrderRequest,
    CreateOrderResponse,
    UserOrder,
    VerifyOrderRequest,
    VerifyOrderResponse,
} from "./types";

const extractErrorMessage = (error: unknown, fallback: string): string => {
    if (typeof error === "object" && error !== null) {
        const err = error as Record<string, unknown>;
        if (typeof err.message === "string" && err.message) return err.message;
        if (typeof err.error === "string" && err.error) return err.error;
        if (err.data && typeof err.data === "object") {
            const data = err.data as Record<string, unknown>;
            if (typeof data.message === "string") return data.message;
            if (typeof data.error === "string") return data.error;
        }
    }
    return fallback;
};

/**
 * Fetch all orders placed by the current authenticated user
 */
export const useUserOrders = () => {
    return useQuery<UserOrder[]>({
        queryKey: ["user-orders"],
        queryFn: async () => {
            return await GetUserOrdersApi();
        },
        staleTime: 30 * 1000,
    });
};

/**
 * Hook to find a single order by ID or unique_id
 */
export const useOrderDetail = (orderId?: string) => {
    const { data: orders = [], ...rest } = useUserOrders();
    const order = orders.find(
        (item) => String(item.id) === orderId || item.unique_id === orderId
    );
    return { order, orders, ...rest };
};

/**
 * Mutation to create Razorpay Order & generate razorpay_order_id
 */
export const useCreateRazorpayOrder = () => {
    return useMutation<CreateOrderResponse, unknown, CreateOrderRequest | FormData>({
        mutationFn: async (data) => {
            return await CreateRazorpayOrderApi(data);
        },
        onError: (error) => {
            toast.error(extractErrorMessage(error, "Failed to create order. Please try again."));
        },
    });
};

/**
 * Mutation to verify cryptographic Razorpay payment signature
 */
export const useVerifyRazorpayPayment = () => {
    const queryClient = useQueryClient();

    return useMutation<VerifyOrderResponse, unknown, VerifyOrderRequest | FormData>({
        mutationFn: async (data) => {
            return await VerifyRazorpayOrderApi(data);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["cart-list"] });
            queryClient.invalidateQueries({ queryKey: ["user-orders"] });
            toast.success(data?.message || "Payment verified successfully!");
        },
        onError: (error) => {
            toast.error(extractErrorMessage(error, "Payment verification failed."));
        },
    });
};
