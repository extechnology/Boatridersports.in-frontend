import { CreateRazorpayOrderApi, VerifyRazorpayOrderApi } from "./OrderApi";
import { CreateOrderResponse, VerifyOrderResponse } from "./types";
import { RazorpayOptions } from "@/types/razorpay";

let sdkLoadingPromise: Promise<boolean> | null = null;

/**
 * Loads the Razorpay checkout.js script asynchronously.
 * Caches the loading promise to prevent duplicate injection.
 */
export const loadRazorpaySdk = (): Promise<boolean> => {
    if (typeof window === "undefined") {
        return Promise.resolve(false);
    }

    if (window.Razorpay) {
        return Promise.resolve(true);
    }

    if (sdkLoadingPromise) {
        return sdkLoadingPromise;
    }

    sdkLoadingPromise = new Promise<boolean>((resolve) => {
        const existingScript = document.querySelector<HTMLScriptElement>(
            'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
        );

        if (existingScript) {
            existingScript.addEventListener("load", () => resolve(true));
            existingScript.addEventListener("error", () => resolve(false));
            return;
        }

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => {
            sdkLoadingPromise = null;
            resolve(false);
        };
        document.body.appendChild(script);
    });

    return sdkLoadingPromise;
};

export interface HandleRazorpayCheckoutParams {
    addressId: string;
    currency?: string;
    user?: {
        username?: string;
        email?: string;
        phone?: string;
        fullname?: string;
    };
    onSuccess: (orderId: string, verifyResult: VerifyOrderResponse) => void;
    onError: (errorMessage: string) => void;
    onDismiss?: () => void;
}

/**
 * Full Razorpay Checkout Flow:
 * 1. Ensures Razorpay SDK is loaded
 * 2. Calls backend create-order endpoint
 * 3. Launches official Razorpay payment modal with prefilled data
 * 4. Verifies cryptographic signature on backend upon payment success
 * 5. Invokes onSuccess callback
 */
export async function handleRazorpayCheckout({
    addressId,
    currency = "INR",
    user,
    onSuccess,
    onError,
    onDismiss,
}: HandleRazorpayCheckoutParams): Promise<void> {
    try {
        // Step 1: Ensure Razorpay SDK is loaded
        const isSdkReady = await loadRazorpaySdk();
        if (!isSdkReady || !window.Razorpay) {
            onError("Failed to load Razorpay payment gateway. Please check your connection.");
            return;
        }

        // Step 2: Create order on the backend
        const createRes: CreateOrderResponse = await CreateRazorpayOrderApi({
            address_id: addressId,
            currency,
        });

        const {
            order_id,
            razorpay_order_id,
            amount,
            currency: orderCurrency,
            razorpay_key_id,
            order,
        } = createRes;

        const effectiveKey =
            razorpay_key_id ||
            process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
            "rzp_test_TtCqSd6KQr6Z9c";

        if (!effectiveKey) {
            onError("Razorpay Key ID is missing.");
            return;
        }

        // Step 3: Configure Razorpay modal options
        const options: RazorpayOptions = {
            key: effectiveKey,
            amount: amount, // in paise
            currency: orderCurrency || currency || "INR",
            name: "BoatRider Sports",
            description: `Order #${order_id}`,
            order_id: razorpay_order_id,
            prefill: {
                name: order?.user_address?.name || user?.fullname || user?.username || "",
                email: user?.email || "",
                contact: order?.user_address?.phone_number || user?.phone || "",
            },
            theme: {
                color: "#111827", // modern slate-900 brand color
            },
            handler: async (response) => {
                // Step 4: Verify payment signature on the backend
                try {
                    const verifyRes = await VerifyRazorpayOrderApi({
                        order_id: order_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    });

                    if (verifyRes.status === "success") {
                        onSuccess(order_id, verifyRes);
                    } else {
                        onError(verifyRes.message || "Payment verification failed.");
                    }
                } catch (verifyErr: any) {
                    const errMsg =
                        verifyErr?.message ||
                        verifyErr?.data?.message ||
                        verifyErr?.data?.error ||
                        "Payment verification failed. Please contact support.";
                    onError(errMsg);
                }
            },
            modal: {
                ondismiss: () => {
                    if (onDismiss) {
                        onDismiss();
                    } else {
                        onError("Payment cancelled by user.");
                    }
                },
            },
        };

        // Step 5: Open Razorpay Popup
        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.on("payment.failed", (resp) => {
            onError(`Payment failed: ${resp.error.description || "Unknown error"}`);
        });
        razorpayInstance.open();
    } catch (err: any) {
        const errorMsg =
            err?.message ||
            err?.data?.error ||
            err?.data?.message ||
            "Unable to initiate order. Please try again.";
        onError(errorMsg);
    }
}
