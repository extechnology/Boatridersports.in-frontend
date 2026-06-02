import type { OrderProduct, UserOrder } from "@/service/cart/types";

export type OrderStatusFilter =
    | "all"
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "failed";

const activeStatuses: Exclude<OrderStatusFilter, "all">[] = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
    "failed",
];

export const normalizeOrderStatus = (status?: string): Exclude<OrderStatusFilter, "all"> => {
    const normalized = status?.toLowerCase();
    return activeStatuses.includes(normalized as Exclude<OrderStatusFilter, "all">)
        ? normalized as Exclude<OrderStatusFilter, "all">
        : "pending";
};

export const getOrderStatusLabel = (status?: string) => {
    const normalized = normalizeOrderStatus(status);
    return normalized.charAt(0).toUpperCase() + normalized.slice(1);
};

export const getOrderStatusColor = (status?: string) => {
    switch (normalizeOrderStatus(status)) {
        case "pending":
            return "bg-amber-50 text-amber-700 border-amber-200";
        case "processing":
            return "bg-orange-50 text-orange-700 border-orange-200";
        case "shipped":
            return "bg-violet-50 text-violet-700 border-violet-200";
        case "delivered":
            return "bg-green-100 text-green-800 border-green-300";
        case "cancelled":
            return "bg-rose-50 text-rose-700 border-rose-200";
        case "failed":
            return "bg-red-50 text-red-700 border-red-200";
        default:
            return "bg-gray-100 text-gray-700 border-gray-200";
    }
};

export const getOrderStatusAccent = (status?: string) => {
    switch (normalizeOrderStatus(status)) {
        case "pending":
            return {
                rail: "bg-amber-500",
                icon: "bg-amber-100 text-amber-700",
                panel: "bg-amber-50 border-amber-100",
                text: "text-amber-700",
            };
        case "processing":
            return {
                rail: "bg-orange-500",
                icon: "bg-orange-100 text-orange-700",
                panel: "bg-orange-50 border-orange-200",
                text: "text-orange-700",
            };
        case "shipped":
            return {
                rail: "bg-violet-500",
                icon: "bg-violet-100 text-violet-700",
                panel: "bg-violet-50 border-violet-200",
                text: "text-violet-700",
            };
        case "delivered":
            return {
                rail: "bg-green-500",
                icon: "bg-green-100 text-green-800",
                panel: "bg-green-100 border-green-300",
                text: "text-green-800",
            };
        case "cancelled":
            return {
                rail: "bg-rose-500",
                icon: "bg-rose-100 text-rose-700",
                panel: "bg-rose-50 border-rose-100",
                text: "text-rose-700",
            };
        case "failed":
            return {
                rail: "bg-red-500",
                icon: "bg-red-100 text-red-700",
                panel: "bg-red-50 border-red-100",
                text: "text-red-700",
            };
        default:
            return {
                rail: "bg-gray-400",
                icon: "bg-gray-100 text-gray-700",
                panel: "bg-gray-50 border-gray-100",
                text: "text-gray-700",
            };
    }
};

export const getPaymentStatusColor = (paymentStatus: boolean) => {
    return paymentStatus
        ? "bg-green-100 text-green-800 border-green-300"
        : "bg-amber-50 text-amber-700 border-amber-200";
};

export const getPaymentStatusLabel = (paymentStatus: boolean) => {
    return paymentStatus ? "Paid" : "Payment pending";
};

export const formatCurrency = (value?: string | number | null) => {
    const amount = Number(value ?? 0);
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    }).format(Number.isNaN(amount) ? 0 : amount);
};

export const formatOrderDate = (value?: string | null, options?: Intl.DateTimeFormatOptions) => {
    if (!value) return "Not available";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Not available";

    return date.toLocaleDateString("en-IN", options ?? {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

const addDays = (value: string, days: number) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;

    date.setDate(date.getDate() + days);
    return date;
};

export const getDeliveryWindow = (order: UserOrder) => {
    const status = normalizeOrderStatus(order.status);

    if (status === "cancelled" || status === "failed") {
        return "Delivery not available for this order";
    }

    if (status === "delivered") {
        return order.estimated_delivery
            ? formatOrderDate(order.estimated_delivery, { day: "numeric", month: "short", year: "numeric" })
            : "Delivered";
    }

    if (!order.payment_status) {
        return "Delivery window will appear after payment succeeds";
    }

    if (order.estimated_delivery) {
        return formatOrderDate(order.estimated_delivery, {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    }

    const startDate = addDays(order.created_at, 7);
    const endDate = addDays(order.created_at, 14);

    if (!startDate || !endDate) {
        return "Delivery usually takes 7-14 days after payment";
    }

    return `${formatOrderDate(startDate.toISOString(), { day: "numeric", month: "short" })} - ${formatOrderDate(endDate.toISOString(), { day: "numeric", month: "short", year: "numeric" })}`;
};

export const getDeliveryMessage = (order: UserOrder) => {
    const status = normalizeOrderStatus(order.status);

    if (status === "cancelled") return "This order was cancelled, so delivery is not scheduled.";
    if (status === "failed") return "This order failed, so delivery is not scheduled.";
    if (status === "delivered") return "Order delivered successfully.";
    if (!order.payment_status) return "Complete payment to start delivery updates for this order.";

    return "Payment successful. Delivery usually takes 7-14 days.";
};

export const getTrackingId = (order: UserOrder) => {
    return order.tracking_id ?? null;
};

export const getTrackingLabel = (order: UserOrder) => {
    const trackingId = getTrackingId(order);
    if (trackingId) return trackingId;

    const status = normalizeOrderStatus(order.status);
    if (status === "shipped" || status === "delivered") return "Tracking ID is being updated";
    if (status === "cancelled" || status === "failed") return "Not available";

    return "Will be shared after shipment";
};

export const getShippedVia = (order: UserOrder) => {
    return order.shipped_via ?? null;
};

export const getDeliveredAt = (order: UserOrder) => {
    // Field is intentionally named `deliverd_at` on the backend
    return order.deliverd_at ? formatOrderDate(order.deliverd_at) : null;
};

export const getOrderItemDisplay = (item: OrderProduct) => {
    const product = item.bike ?? item.accessory;
    const bikeImage = item.color?.bike_images?.[0] ?? item.bike?.featured_image ?? item.bike?.bike_colors?.[0]?.bike_images?.[0];
    const accessoryImage = item.accessory?.accessory_images?.[0];

    return {
        name: product?.name ?? "Product unavailable",
        image: bikeImage ?? accessoryImage ?? null,
        type: item.bike ? "Bike" : "Accessory",
        color: item.color?.color,
        size: item.size?.size,
        price: formatCurrency(item.price),
        subtotal: formatCurrency(item.subtotal),
        quantity: item.quantity,
    };
};

export const getOrderItemsSubtotal = (order: UserOrder) => {
    return order.all_products.reduce((total, item) => total + Number(item.subtotal || 0), 0);
};

export const getOrderDiscount = (order: UserOrder) => {
    const subtotal = getOrderItemsSubtotal(order);
    const total = Number(order.total_amount || 0);
    return Math.max(subtotal - total, 0);
};

export const getOrderDiscountPercentage = (order: UserOrder) => {
    const subtotal = getOrderItemsSubtotal(order);
    const discount = getOrderDiscount(order);

    if (subtotal <= 0 || discount <= 0) return 0;

    return Math.round((discount / subtotal) * 100);
};
