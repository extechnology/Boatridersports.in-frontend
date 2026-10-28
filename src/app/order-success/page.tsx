'use client';

import { useEffect, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Loader2, ArrowRight, ShoppingBag, CheckCircle, Download, Package, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useGetOrderDetails } from '@/service/cart/useCart';
import { formatCurrency, formatOrderDate } from '@/lib/orderUtils';

function OrderSuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('order_id');

    // Fetch user orders to display real order details if matched
    const { data: orders = [] } = useGetOrderDetails();

    const order = useMemo(() => {
        if (!orderId) return null;
        return orders.find(
            (item) => String(item.id) === orderId || item.unique_id === orderId
        );
    }, [orderId, orders]);

    // Fire celebration confetti once upon mounting
    useEffect(() => {
        const duration = 2.5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: ReturnType<typeof setInterval> = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 45 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    if (!orderId) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center bg-white p-8 rounded-2xl shadow-sm max-w-md w-full">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Invalid Request</h2>
                    <p className="text-gray-500 mb-6">No order reference was found in the URL.</p>
                    <Link href="/">
                        <button className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors">
                            Return Home
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center py-20 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-2xl w-full border border-gray-100"
            >
                {/* Header Banner */}
                <div className="bg-linear-to-br from-emerald-500 to-green-600 p-8 text-center relative overflow-hidden text-white">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', bounce: 0.5, delay: 0.15 }}
                        className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg relative z-10"
                    >
                        <CheckCircle className="w-12 h-12 text-emerald-600" />
                    </motion.div>

                    <h1 className="text-3xl font-extrabold relative z-10">Payment Successful!</h1>
                    <p className="text-emerald-100 mt-2 relative z-10 text-sm sm:text-base">
                        Your order has been placed and is now being processed.
                    </p>

                    {/* Decorative Background Elements */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                        className="absolute -top-16 -right-16 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                        className="absolute -bottom-10 -left-10 w-36 h-36 bg-white opacity-10 rounded-full blur-xl"
                    />
                </div>

                {/* Details Body */}
                <div className="p-6 sm:p-8 space-y-6">
                    {/* Order Reference Box */}
                    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-3 mb-3">
                            <div>
                                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Order Reference</span>
                                <p className="text-base sm:text-lg font-bold text-gray-900 break-all">{orderId}</p>
                            </div>
                            <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                                Processing
                            </span>
                        </div>

                        {order && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm mt-3">
                                <div>
                                    <p className="text-gray-500 text-xs">Total Amount</p>
                                    <p className="font-bold text-gray-900 text-base">{formatCurrency(order.total_amount)}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Total Items</p>
                                    <p className="font-semibold text-gray-900">{order.total_items} items</p>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <p className="text-gray-500 text-xs">Date</p>
                                    <p className="font-semibold text-gray-900">{formatOrderDate(order.created_at)}</p>
                                </div>
                            </div>
                        )}

                        {order?.user_address && (
                            <div className="mt-3 pt-3 border-t border-gray-200 flex items-start gap-2 text-xs text-gray-600">
                                <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                                <span>
                                    Delivering to: <strong className="text-gray-900">{order.user_address.name}</strong>, {order.user_address.address}, {order.user_address.city} - {order.user_address.pincode}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Invoice Download (if ready) */}
                    {order?.invoice && (
                        <div className="flex items-center justify-between p-4 bg-purple-50 rounded-2xl border border-purple-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700">
                                    <Download className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-semibold text-purple-900 text-sm">Invoice is ready</p>
                                    <p className="text-xs text-purple-700">Download your GST tax invoice</p>
                                </div>
                            </div>
                            <a
                                href={order.invoice}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
                            >
                                <Download className="w-4 h-4" /> Download
                            </a>
                        </div>
                    )}

                    {/* Email confirmation note */}
                    <div className="flex items-center gap-3 rounded-2xl bg-amber-50 p-4 border border-amber-100 text-xs sm:text-sm text-amber-900">
                        <Package className="w-5 h-5 shrink-0 text-amber-700" />
                        <p>
                            A confirmation email and WhatsApp message will be sent with shipping details once your order is dispatched.
                        </p>
                    </div>

                    {/* Navigation Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <Link href="/account" className="flex-1">
                            <button
                                type="button"
                                className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
                            >
                                <ShoppingBag className="w-5 h-5" /> View My Orders
                            </button>
                        </Link>

                        <Link href="/shop/bike" className="flex-1">
                            <button
                                type="button"
                                className="w-full py-4 bg-gray-100 text-gray-900 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                            >
                                Continue Shopping <ArrowRight className="w-5 h-5" />
                            </button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function OrderSuccessPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <Loader2 className="w-12 h-12 text-gray-900 animate-spin" />
                </div>
            }
        >
            <OrderSuccessContent />
        </Suspense>
    );
}
