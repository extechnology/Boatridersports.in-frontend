'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AlertCircle,
    Bike,
    CalendarDays,
    CheckCircle,
    ChevronRight,
    Clock,
    CreditCard,
    BadgePercent,
    Loader2,
    Package,
    RefreshCw,
    ShoppingBag,
    ShieldCheck,
    Truck,
    XCircle,
} from 'lucide-react';
import Link from 'next/link';
import { useGetOrderDetails } from '@/service/cart/useCart';
import {
    type OrderStatusFilter,
    formatCurrency,
    formatOrderDate,
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
    getTrackingLabel,
    normalizeOrderStatus,
} from '@/lib/orderUtils';

const filterOptions: { id: OrderStatusFilter; label: string }[] = [
    { id: 'all', label: 'All Orders' },
    { id: 'pending', label: 'Pending' },
    { id: 'processing', label: 'Processing' },
    { id: 'shipped', label: 'Shipped' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'cancelled', label: 'Cancelled' },
    { id: 'failed', label: 'Failed' },
];

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

const OrdersSkeleton = () => (
    <div className="space-y-4">
        {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-gray-100 animate-pulse">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-3">
                            <div className="h-5 w-48 bg-gray-200 rounded" />
                            <div className="h-4 w-36 bg-gray-100 rounded" />
                        </div>
                        <div className="h-8 w-28 bg-gray-200 rounded" />
                    </div>
                </div>
                <div className="p-4 sm:p-6 space-y-3 animate-pulse">
                    <div className="h-16 bg-gray-100 rounded-xl" />
                    <div className="h-16 bg-gray-100 rounded-xl" />
                </div>
            </div>
        ))}
    </div>
);

export default function OrdersSection() {
    const [activeFilter, setActiveFilter] = useState<OrderStatusFilter>('all');
    const { data: orders = [], isLoading, isError, error, refetch, isFetching } = useGetOrderDetails();

    const filteredOrders = useMemo(() => {
        if (activeFilter === 'all') return orders;
        return orders.filter((order) => normalizeOrderStatus(order.status) === activeFilter);
    }, [activeFilter, orders]);

    const counts = useMemo(() => {
        return filterOptions.reduce<Record<OrderStatusFilter, number>>((acc, option) => {
            acc[option.id] = option.id === 'all'
                ? orders.length
                : orders.filter((order) => normalizeOrderStatus(order.status) === option.id).length;
            return acc;
        }, {
            all: 0,
            pending: 0,
            processing: 0,
            shipped: 0,
            delivered: 0,
            cancelled: 0,
            failed: 0,
        });
    }, [orders]);

    const errorMessage = typeof error === 'object' && error !== null && 'message' in error && typeof (error as { message?: unknown }).message === 'string'
        ? (error as { message: string }).message
        : 'Failed to load your orders. Please try again.';

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
                    <p className="text-gray-600 mt-1">Track your purchases, payments, and delivery updates</p>
                </div>

                <button
                    type="button"
                    onClick={() => refetch()}
                    disabled={isFetching}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-60"
                >
                    <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
                    Refresh
                </button>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {filterOptions.map((option) => (
                    <motion.button
                        key={option.id}
                        type="button"
                        onClick={() => setActiveFilter(option.id)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${activeFilter === option.id
                            ? 'bg-gray-900 text-white shadow-lg'
                            : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        {option.label}
                        <span className={`ml-2 text-xs ${activeFilter === option.id ? 'text-white/75' : 'text-gray-400'}`}>
                            {counts[option.id]}
                        </span>
                    </motion.button>
                ))}
            </div>

            {isLoading ? (
                <OrdersSkeleton />
            ) : isError ? (
                <div className="bg-white rounded-2xl border border-red-100 p-8 text-center">
                    <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Could not load orders</h3>
                    <p className="text-gray-600 mb-5">{errorMessage}</p>
                    <button
                        type="button"
                        onClick={() => refetch()}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 font-semibold text-white hover:bg-gray-800"
                    >
                        {isFetching && <Loader2 className="w-4 h-4 animate-spin" />}
                        Try Again
                    </button>
                </div>
            ) : (
                <AnimatePresence mode="wait">
                    {filteredOrders.length === 0 ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center py-16"
                        >
                            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
                            <p className="text-gray-600">You do not have any {activeFilter !== 'all' ? activeFilter : ''} orders yet.</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="orders"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-4"
                        >
                            {filteredOrders.map((order, index) => {
                                const orderNumber = orders.findIndex((item) => item.id === order.id) + 1 || index + 1;
                                const subtotal = getOrderItemsSubtotal(order);
                                const discount = getOrderDiscount(order);
                                const discountPercent = getOrderDiscountPercentage(order);
                                const accent = getOrderStatusAccent(order.status);

                                return (
                                    <motion.article
                                        key={order.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.04 }}
                                        className="relative bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-zinc-400 transition-all group"
                                    >
                                        <div className="p-4 sm:p-6 border-b border-gray-100 bg-gray-50/70">
                                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                                <div className="min-w-0">
                                                    <div className="flex items-start gap-3">
                                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${accent.icon}`}>
                                                            {getStatusIcon(order.status)}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="flex flex-wrap items-center gap-2">
                                                                <h3 className="text-lg font-bold text-gray-900">Order {orderNumber}</h3>
                                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border inline-flex items-center gap-1.5 ${getOrderStatusColor(order.status)}`}>
                                                                    {getStatusIcon(order.status)}
                                                                    {getOrderStatusLabel(order.status)}
                                                                </span>
                                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border inline-flex items-center gap-1.5 ${getPaymentStatusColor(order.payment_status)}`}>
                                                                    <CreditCard className="w-3.5 h-3.5" />
                                                                    {getPaymentStatusLabel(order.payment_status)}
                                                                </span>
                                                            </div>
                                                            <p className="text-sm text-gray-600 mt-1 break-all">
                                                                <span className="font-semibold text-gray-900">Order ID:</span> {order.unique_id}
                                                            </p>
                                                            <p className="text-sm text-gray-500 mt-1">
                                                                Placed on {formatOrderDate(order.created_at)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-80 xl:w-[22rem] rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm lg:text-right">
                                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                                        {order.payment_status ? 'Order Total' : 'Amount Due'}
                                                    </p>
                                                    <p className="mt-1 text-3xl font-bold text-gray-900">{formatCurrency(order.total_amount)}</p>
                                                    <div className="mt-1 flex flex-wrap items-center gap-2 lg:justify-end">
                                                        {discount > 0 && (
                                                            <span className="text-xs text-gray-400 line-through">{formatCurrency(subtotal)}</span>
                                                        )}
                                                        <span className="text-sm text-gray-600">{order.total_items} {order.total_items === 1 ? 'item' : 'items'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-4 sm:p-6 space-y-4">
                                            {order.all_products.map((item) => {
                                                const display = getOrderItemDisplay(item);

                                                return (
                                                    <div key={item.id} className="flex gap-3 sm:gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                                        <div className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center ring-1 ring-gray-100">
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
                                                                    <h4 className="font-semibold text-gray-900 mt-1 line-clamp-2">{display.name}</h4>
                                                                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-600 mt-1">
                                                                        {display.size && <span>Size: {display.size}</span>}
                                                                        {display.color && <span>Color: {display.color}</span>}
                                                                        <span>Qty: {display.quantity}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="sm:text-right shrink-0">
                                                                    <p className="text-sm font-semibold text-gray-900">{display.subtotal}</p>
                                                                    <p className="text-xs text-gray-500">{display.price} each</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                            {discount > 0 && (
                                                <div className="flex items-start gap-3 rounded-xl border border-green-300 bg-green-100 px-4 py-3 text-green-900">
                                                    <BadgePercent className="w-5 h-5 shrink-0 mt-0.5" />
                                                    <div>
                                                        <p className="font-semibold">You saved {formatCurrency(discount)} on this order</p>
                                                        <p className="text-sm text-green-800">{discountPercent}% discount applied at checkout</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="bg-gray-50 px-4 py-4 sm:px-6">
                                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                                    <div className={`flex items-start gap-3 rounded-xl border px-3 py-3 text-sm ${accent.panel}`}>
                                                        <Truck className={`w-5 h-5 mt-0.5 shrink-0 ${accent.text}`} />
                                                        <div>
                                                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Tracking ID</p>
                                                            <p className="font-semibold text-gray-900">{getTrackingLabel(order)}</p>
                                                            {getShippedVia(order) && (
                                                                <p className="text-xs text-gray-500 mt-0.5">via {getShippedVia(order)}</p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white px-3 py-3 text-sm">
                                                        <CalendarDays className="w-5 h-5 text-zinc-900 mt-0.5 shrink-0" />
                                                        <div>
                                                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Delivery</p>
                                                            <p className="font-semibold text-gray-900">{getDeliveryWindow(order)}</p>
                                                        </div>
                                                    </div>

                                                    <div className={`flex items-start gap-3 rounded-xl border px-3 py-3 text-sm ${order.payment_status ? 'border-green-300 bg-green-100' : 'border-amber-100 bg-amber-50'}`}>
                                                        <ShieldCheck className={`w-5 h-5 mt-0.5 shrink-0 ${order.payment_status ? 'text-green-800' : 'text-amber-700'}`} />
                                                        <div>
                                                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Payment</p>
                                                            <p className="font-semibold text-gray-900">{getDeliveryMessage(order)}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <Link href={`/account/orders/${order.id}`} className="w-full lg:w-auto">
                                                    <motion.button
                                                        type="button"
                                                        whileHover={{ scale: 1.03 }}
                                                        whileTap={{ scale: 0.97 }}
                                                        className="w-full lg:w-auto px-6 py-3 bg-zinc-950 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-black transition-colors shadow-sm border border-zinc-950"
                                                    >
                                                        View Details
                                                        <ChevronRight className="w-4 h-4" />
                                                    </motion.button>
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.article>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </div>
    );
}
