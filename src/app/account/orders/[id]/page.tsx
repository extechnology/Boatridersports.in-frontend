'use client';

import { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    AlertCircle,
    ArrowLeft,
    BadgePercent,
    Bike,
    CalendarDays,
    CheckCircle,
    CreditCard,
    Download,
    Loader2,
    Mail,
    MapPin,
    Package,
    Phone,
    RefreshCw,
    ShoppingBag,
    Truck,
    XCircle,
    Clock,
} from 'lucide-react';
import AuthProtectedRoute from '@/components/common/AuthProtectedRoute';
import { useGetOrderDetails } from '@/service/cart/useCart';
import {
    formatCurrency,
    formatOrderDate,
    getDeliveredAt,
    getDeliveryMessage,
    getDeliveryWindow,
    getOrderDiscount,
    getOrderDiscountPercentage,
    getOrderItemDisplay,
    getOrderItemsSubtotal,
    getOrderStatusAccent,
    getOrderStatusColor,
    getOrderStatusLabel,
    getPaymentStatusColor,
    getPaymentStatusLabel,
    getShippedVia,
    getTrackingId,
    getTrackingLabel,
    normalizeOrderStatus,
} from '@/lib/orderUtils';

const getStatusIcon = (status: string) => {
    switch (normalizeOrderStatus(status)) {
        case 'pending':
            return <Clock className="w-4 h-4" />;
        case 'processing':
            return <Package className="w-4 h-4" />;
        case 'shipped':
            return <Truck className="w-4 h-4" />;
        case 'delivered':
            return <CheckCircle className="w-4 h-4" />;
        case 'cancelled':
            return <XCircle className="w-4 h-4" />;
        case 'failed':
            return <AlertCircle className="w-4 h-4" />;
    }
};

function OrderDetailsContent() {
    const params = useParams();
    const router = useRouter();
    const orderId = params.id as string;
    const { data: orders = [], isLoading, isError, error, refetch, isFetching } = useGetOrderDetails();

    const order = useMemo(() => {
        return orders.find((item) => String(item.id) === orderId || item.unique_id === orderId);
    }, [orderId, orders]);

    const summary = useMemo(() => {
        if (!order) return null;

        return {
            subtotal: getOrderItemsSubtotal(order),
            discount: getOrderDiscount(order),
            trackingId: getTrackingId(order),
        };
    }, [order]);

    const errorMessage = typeof error === 'object' && error !== null && 'message' in error && typeof (error as { message?: unknown }).message === 'string'
        ? (error as { message: string }).message
        : 'Failed to load this order. Please try again.';

    if (isLoading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 pt-20 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-2xl border border-gray-200 p-10 flex items-center justify-center gap-3 text-gray-600">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Loading order details
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 pt-20 pb-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-2xl border border-red-100 p-10 text-center">
                        <AlertCircle className="w-14 h-14 text-red-400 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Could not load order</h1>
                        <p className="text-gray-600 mb-6">{errorMessage}</p>
                        <button
                            type="button"
                            onClick={() => refetch()}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white hover:bg-gray-800"
                        >
                            <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!order || !summary) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 pt-20 pb-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center py-16">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h1>
                        <p className="text-gray-600 mb-6">The order you are looking for does not exist.</p>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const address = order.user_address;
    const canTrack = Boolean(summary.trackingId);
    const orderNumber = orders.findIndex((item) => item.id === order.id) + 1 || 1;
    const accent = getOrderStatusAccent(order.status);
    const discountPercent = getOrderDiscountPercentage(order);

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 pt-20 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.button
                    type="button"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-semibold"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Orders
                </motion.button>

                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden bg-white rounded-2xl border border-gray-200 shadow-sm mb-6"
                >
                    <div className="p-4 sm:p-6 bg-gray-50/70 border-b border-gray-100">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                            <div className="flex items-start gap-4 min-w-0">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${accent.icon}`}>
                                    {getStatusIcon(order.status)}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-gray-500">Order {orderNumber}</p>
                                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                                        {getOrderStatusLabel(order.status)} Order
                                    </h1>
                                    <p className="text-sm text-gray-600 break-all mt-2">
                                        <span className="font-semibold text-gray-900">Order ID:</span> {order.unique_id}
                                    </p>
                                </div>
                            </div>

                            <div className="w-full lg:w-96 xl:w-[28rem] rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm lg:text-right">
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                    {order.payment_status ? 'Order Total' : 'Amount Due'}
                                </p>
                                <p className="text-4xl font-bold text-gray-900 mt-1">{formatCurrency(order.total_amount)}</p>
                                {summary.discount > 0 && (
                                    <div className="mt-2 flex flex-wrap items-center gap-2 lg:justify-end">
                                        <span className="text-sm text-gray-400 line-through">{formatCurrency(summary.subtotal)}</span>
                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-900">
                                            <BadgePercent className="w-3.5 h-3.5" />
                                            Saved {formatCurrency(summary.discount)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-5">
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold border inline-flex items-center gap-1.5 ${getOrderStatusColor(order.status)}`}>
                                {getStatusIcon(order.status)}
                                {getOrderStatusLabel(order.status)}
                            </span>
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold border inline-flex items-center gap-1.5 ${getPaymentStatusColor(order.payment_status)}`}>
                                <CreditCard className="w-4 h-4" />
                                {getPaymentStatusLabel(order.payment_status)}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 p-4 sm:p-6">
                        <div className="rounded-xl border border-gray-100 bg-white px-4 py-3">
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Order Date</p>
                            <p className="font-semibold text-gray-900">{formatOrderDate(order.created_at)}</p>
                        </div>
                        <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
                            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-700 mb-1">Delivery Window</p>
                            <p className="font-semibold text-gray-900">{getDeliveryWindow(order)}</p>
                        </div>
                        <div className={`rounded-xl border px-4 py-3 ${accent.panel}`}>
                            <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${accent.text}`}>Tracking ID</p>
                            <p className="font-semibold text-gray-900 break-all">{getTrackingLabel(order)}</p>
                        </div>
                        <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
                            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-700 mb-1">Shipped Via</p>
                            <p className="font-semibold text-gray-900">{getShippedVia(order) ?? '—'}</p>
                        </div>
                        <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
                            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-700 mb-1">Delivered On</p>
                            <p className="font-semibold text-gray-900">{getDeliveredAt(order) ?? '—'}</p>
                        </div>
                        <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
                            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-700 mb-1">Total Items</p>
                            <p className="font-semibold text-gray-900">{order.total_items}</p>
                        </div>
                    </div>

                    <div className="mx-4 mb-4 sm:mx-6 sm:mb-6 rounded-xl border border-green-300 bg-green-100 px-4 py-3 text-sm font-medium text-green-900">
                        {getDeliveryMessage(order)}
                    </div>
                </motion.section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center">
                                    <Package className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Order Items</h2>
                                    <p className="text-sm text-gray-500">{order.all_products.length} product {order.all_products.length === 1 ? 'line' : 'lines'}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {order.all_products.map((item) => {
                                    const display = getOrderItemDisplay(item);

                                    return (
                                        <div key={item.id} className="flex gap-3 sm:gap-4 rounded-xl border border-gray-100 bg-gray-50 p-3 sm:p-4">
                                            <div className="w-20 h-20 rounded-xl bg-white overflow-hidden shrink-0 flex items-center justify-center ring-1 ring-gray-100">
                                                {display.image ? (
                                                    <img src={display.image} alt={display.name} className="w-full h-full object-cover" />
                                                ) : display.type === 'Bike' ? (
                                                    <Bike className="w-8 h-8 text-gray-300" />
                                                ) : (
                                                    <ShoppingBag className="w-8 h-8 text-gray-300" />
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                                    <div className="min-w-0">
                                                        <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-800">
                                                            {display.type}
                                                        </span>
                                                        <h3 className="font-semibold text-gray-900 mt-1">{display.name}</h3>
                                                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-600 mt-1">
                                                            {display.size && <span>Size: {display.size}</span>}
                                                            {display.color && <span>Color: {display.color}</span>}
                                                            <span>Qty: {display.quantity}</span>
                                                        </div>
                                                    </div>
                                                    <div className="sm:text-right shrink-0">
                                                        <p className="text-lg font-bold text-gray-900">{display.subtotal}</p>
                                                        <p className="text-xs text-gray-500">{display.price} each</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.section>

                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-green-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Shipping Address</h2>
                            </div>

                            <div className="space-y-2 text-gray-600">
                                <p className="font-semibold text-gray-900">{address.name}</p>
                                <p>{address.address_type}</p>
                                <p>{address.address}</p>
                                <p>{address.city}, {address.state} - {address.pincode}</p>
                                <div className="flex items-center gap-2 pt-2">
                                    <Phone className="w-4 h-4" />
                                    <span>{address.phone_number}</span>
                                </div>
                            </div>
                        </motion.section>
                    </div>

                    <aside className="space-y-6">
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                                    <CreditCard className="w-5 h-5 text-purple-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                            </div>

                            {summary.discount > 0 && (
                                <div className="mb-5 flex items-start gap-3 rounded-xl border border-green-300 bg-green-100 px-4 py-3 text-green-900">
                                    <BadgePercent className="w-5 h-5 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold">You saved {formatCurrency(summary.discount)}</p>
                                        <p className="text-sm text-green-800">{discountPercent}% discount applied</p>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-3">
                                <div className="flex justify-between gap-4 text-gray-600">
                                    <span>Items subtotal</span>
                                    <span>{formatCurrency(summary.subtotal)}</span>
                                </div>

                                {summary.discount > 0 && (
                                    <div className="flex justify-between gap-4 text-green-800">
                                        <span>Discount</span>
                                        <span>-{formatCurrency(summary.discount)}</span>
                                    </div>
                                )}

                                <div className="flex justify-between gap-4 text-gray-600">
                                    <span>Payment</span>
                                    <span>{getPaymentStatusLabel(order.payment_status)}</span>
                                </div>

                                <div className="pt-3 border-t border-gray-200">
                                    <div className="flex justify-between gap-4">
                                        <span className="text-lg font-bold text-gray-900">Total</span>
                                        <span className="text-2xl font-bold text-gray-900">{formatCurrency(order.total_amount)}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-3"
                        >
                            <button
                                type="button"
                                disabled={!canTrack}
                                className="w-full px-6 py-3 bg-zinc-950 text-white rounded-xl font-semibold hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-sm border border-zinc-950 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed disabled:shadow-none disabled:border-gray-200"
                            >
                                <Truck className="w-5 h-5" />
                                Track Order
                            </button>

                            {order.invoice ? (
                                <a
                                    href={order.invoice}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Download className="w-5 h-5" />
                                    Download Invoice
                                </a>
                            ) : (
                                <button
                                    type="button"
                                    disabled
                                    className="w-full px-6 py-3 bg-gray-100 text-gray-400 rounded-xl font-semibold flex items-center justify-center gap-2 cursor-not-allowed"
                                >
                                    <Download className="w-5 h-5" />
                                    Invoice Not Ready
                                </button>
                            )}

                            <a
                                href={`mailto:boatridersportsclt@gmail.com?subject=Order%20Support%20-%20${encodeURIComponent(order.unique_id)}`}
                                className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                            >
                                <Mail className="w-5 h-5" />
                                Contact Support
                            </a>
                        </motion.section>

                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6"
                        >
                            <div className="flex items-start gap-3">
                                <CalendarDays className="w-5 h-5 text-gray-500 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">Delivery Update</h3>
                                    <p className="text-sm text-gray-600 mt-1">{getDeliveryMessage(order)}</p>
                                    <p className="text-sm font-semibold text-gray-900 mt-2">{getDeliveryWindow(order)}</p>
                                </div>
                            </div>
                        </motion.section>
                    </aside>
                </div>
            </div>
        </div>
    );
}

export default function OrderDetailsPage() {
    return (
        <AuthProtectedRoute>
            <OrderDetailsContent />
        </AuthProtectedRoute>
    );
}
