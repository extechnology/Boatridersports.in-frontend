import { CommonApi } from "@/lib/CommonApi";
import {
    CreateOrderRequest,
    CreateOrderResponse,
    UserOrder,
    VerifyOrderRequest,
    VerifyOrderResponse,
} from "./types";

/**
 * 1. Create Order & Initialize Razorpay
 * Tries the primary /api/order/razorpay/create-order/ route, with fallback to direct alias or /order/ routes.
 */
export const CreateRazorpayOrderApi = async (
    data: CreateOrderRequest | FormData
): Promise<CreateOrderResponse> => {
    // Attempt primary route
    try {
        return (await CommonApi("POST", `/api/order/razorpay/create-order/`, data)) as CreateOrderResponse;
    } catch (err: any) {
        // If 404, fallback to direct route without /api
        if (err?.status === 404) {
            try {
                return (await CommonApi("POST", `/order/razorpay/create-order/`, data)) as CreateOrderResponse;
            } catch (fallbackErr: any) {
                if (fallbackErr?.status === 404) {
                    // Fallback to alias route
                    return (await CommonApi("POST", `/api/order/razorpay-create-order/`, data)) as CreateOrderResponse;
                }
                throw fallbackErr;
            }
        }
        throw err;
    }
};

/**
 * 2. Verify Razorpay Payment Signature
 */
export const VerifyRazorpayOrderApi = async (
    data: VerifyOrderRequest | FormData
): Promise<VerifyOrderResponse> => {
    try {
        return (await CommonApi("POST", `/api/order/razorpay/verify-order/`, data)) as VerifyOrderResponse;
    } catch (err: any) {
        if (err?.status === 404) {
            try {
                return (await CommonApi("POST", `/order/razorpay/verify-order/`, data)) as VerifyOrderResponse;
            } catch (fallbackErr: any) {
                if (fallbackErr?.status === 404) {
                    return (await CommonApi("POST", `/api/order/razorpay-verify-order/`, data)) as VerifyOrderResponse;
                }
                throw fallbackErr;
            }
        }
        throw err;
    }
};

/**
 * 3. Fetch User Orders (Order History)
 */
export const GetUserOrdersApi = async (): Promise<UserOrder[]> => {
    try {
        return (await CommonApi("GET", `/api/order/user-orders/`)) as UserOrder[];
    } catch (err: any) {
        if (err?.status === 404) {
            return (await CommonApi("GET", `/order/user-orders/`)) as UserOrder[];
        }
        throw err;
    }
};
