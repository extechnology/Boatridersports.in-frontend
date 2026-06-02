'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { XCircle, Loader2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useVerifyOrderPayment } from '@/service/cart/useCart';
import confetti from 'canvas-confetti';



function OrderSuccessContent() {


    const searchParams = useSearchParams();
    const orderId = searchParams.get('order_id');


    const { mutate: verifyOrder, isPending, isError,isSuccess } = useVerifyOrderPayment();
    const [hasVerified, setHasVerified] = useState(false);


    useEffect(() => {
        if (orderId && !hasVerified) {
            setHasVerified(true);
            const formData = new FormData();
            formData.append("order_id", orderId);
            verifyOrder(formData);
        }
    }, [orderId, hasVerified, verifyOrder]);

    useEffect(() => {
        if (isSuccess) {
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

            const interval: any = setInterval(function() {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            }, 250);
            
            return () => clearInterval(interval);
        }
    }, [isSuccess]);



    if (!orderId) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center bg-white p-8 rounded-2xl shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Invalid Request</h2>
                    <p className="text-gray-500 mb-6">No order ID was found in the URL.</p>
                    <Link href="/">
                        <button className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors">
                            Return Home
                        </button>
                    </Link>
                </div>
            </div>
        );
    }



    if (isPending || !hasVerified) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="inline-block mb-4"
                    >
                        <Loader2 className="w-12 h-12 text-gray-900" />
                    </motion.div>
                    <h2 className="text-xl font-bold text-gray-900">Verifying your payment...</h2>
                    <p className="text-gray-500 mt-2">Please do not close or refresh this page.</p>
                </div>
            </div>
        );
    }

    
    
    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-3xl shadow-xl p-8 max-w-xl w-full text-center"
                >
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <XCircle className="w-10 h-10 text-red-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Failed</h1>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        We were unable to verify your payment. Your order has not been placed. If money was deducted, it will be refunded automatically.
                    </p>
                    <div className="flex flex-col gap-3">
                        <Link href="/cart" className="w-full">
                            <button className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                Return to Cart
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }



    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-xl w-full"
            >
                <div className="bg-linear-to-br from-green-500 to-emerald-600 p-8 text-center relative overflow-hidden">
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                        className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg relative z-10"
                    >
                        <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-12 h-12 text-emerald-500"
                        >
                            <motion.path
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                                d="M20 6L9 17l-5-5"
                            />
                        </motion.svg>
                    </motion.div>
                    <h1 className="text-3xl font-bold text-white relative z-10">Order Placed!</h1>
                    <p className="text-green-50 mt-2 relative z-10">Thank you for your purchase.</p>
                    
                    {/* Decorative Background Elements */}
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                        className="absolute -top-20 -right-20 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl"
                    />
                    <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                        className="absolute -bottom-10 -left-10 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"
                    />
                </div>

                <div className="p-8">
                    <div className="bg-gray-50 rounded-2xl p-5 mb-8 border border-gray-100">
                        <p className="text-sm text-gray-500 mb-1">Order ID</p>
                        <p className="text-lg font-bold text-gray-900 tracking-wide break-all">
                            {orderId}
                        </p>
                        
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-600 text-center">
                                We've sent a confirmation email with your order details and tracking information.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Link href="/account" className="w-full">
                            <button className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                <ShoppingBag className="w-5 h-5" /> View My Orders
                            </button>
                        </Link>
                        
                        <Link href="/shop/bike" className="w-full">
                            <button className="w-full py-4 bg-gray-100 text-gray-900 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
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
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-gray-900 animate-spin" />
            </div>
        }>
            <OrderSuccessContent />
        </Suspense>
    );
}
