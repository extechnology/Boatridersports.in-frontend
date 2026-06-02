'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Loader2, AlertCircle } from 'lucide-react';
import AuthProtectedRoute from '@/components/common/AuthProtectedRoute';
import { useGetCartList, useUpdateCartItem, useDeleteCartItem, useDeleteAllCartItems } from '@/service/cart/useCart';
import { CartProduct } from '@/service/cart/types';
import ProductLoading from '../loading';




export default function CartPage() {


    // Get cart data from API
    const { data: cartData, isLoading, isError } = useGetCartList();


    // Update cart item from API
    const updateMutation = useUpdateCartItem();
    const deleteMutation = useDeleteCartItem();
    const clearMutation = useDeleteAllCartItems();


    // Update cart item from API
    const updateCartItem = (item: CartProduct, newQuantity?: number, newColorId?: string, newSizeId?: string) => {

        const qty = newQuantity !== undefined ? newQuantity : item.quantity;

        if (qty < 1) return;

        const formData = new FormData();
        formData.append("cart_item_id", item?.id?.toString());
        const product_type = item?.bike ? "bike" : "accessories";
        formData.append("product_type", product_type);
        formData.append("quantity", qty.toString());

        if (item.bike) {

            const colorId = newColorId !== undefined ? newColorId : item?.color?.color;
            const sizeId = newSizeId !== undefined ? newSizeId : item?.size?.size;
            if (colorId) formData.append("product_color", colorId);
            if (sizeId) formData.append("product_size", sizeId);

        }


        updateMutation?.mutate(formData);
    };



    // Remove cart item from API
    const removeItem = (item: CartProduct) => {
        const product_type = item?.bike ? "bike" : "accessories";
        deleteMutation.mutate({ cart_item_id: item?.id?.toString(), product_type });
    };



    // Clear cart from API
    const clearCart = () => {
        clearMutation.mutate();
    };



    // Total cart items
    const allProducts = cartData?.all_products || [];


    // Calculate totals based on UI logic
    const originalTotal = cartData?.orginal_amount || 0;
    const totalDiscount = cartData?.total_discount || 0;
    const subtotal = cartData?.total_amount || 0;
    const shipping = cartData?.shipping_charge || 0;
    const total = subtotal + shipping;


    const hasBikes = (cartData?.total_bikes || 0) > 0;
    const hasAccessories = (cartData?.total_accessories || 0) > 0;
    const freeShippingThreshold = hasBikes ? 10000 : (hasAccessories ? 1000 : 0);
    const remainingForFreeShipping = freeShippingThreshold - subtotal;



    // Error Ui
    if (isError) {

        return (

            <div className="flex justify-center py-64 px-4">
                <div className="flex flex-col justify-center items-center gap-3 bg-white px-5 py-4">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
                        <AlertCircle className="h-10 w-10 text-red-500" />
                    </div>

                    <div className="text-center">
                        <p className="text-md font-semibold text-slate-900">
                            Something went wrong !
                        </p>
                        <p className="text-sm text-slate-500">
                            Failed to load your cart. Please try again later
                        </p>
                    </div>
                </div>
            </div>

        )

    }



    // loading state
    if (isLoading) {
        return (
            <ProductLoading />
        );
    }


    // No cart items
    if (allProducts?.length === 0) {

        return (

            <AuthProtectedRoute>

                <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 pt-20 pb-8">

                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center"
                        >
                            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                                <ShoppingBag className="w-12 h-12 text-gray-400" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
                            <p className="text-gray-600 mb-8">Add some bikes to get started!</p>
                            <Link href="/shop/bike">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
                                >
                                    Continue Shopping
                                    <ArrowRight className="w-5 h-5" />
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </AuthProtectedRoute>
        );
    }





    return (


        <AuthProtectedRoute>

            <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 pt-14 pb-8">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">

                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
                            <p className="text-gray-600">{allProducts?.length} {allProducts?.length === 1 ? 'item' : 'items'} in your cart</p>
                        </motion.div>

                        <button
                            onClick={clearCart}
                            disabled={clearMutation?.isPending}
                            className="text-sm font-semibold text-red-600 hover:text-red-700 disabled:opacity-50"
                        >
                            {clearMutation?.isPending ? "Clearing..." : "Clear Cart"}
                        </button>
                    </div>



                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">


                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">

                            <AnimatePresence mode="popLayout">


                                {allProducts?.map((item, index) => {

                                    const product = item?.bike || item?.accessory;

                                    if (!product) return null;

                                    const price = product?.is_discount ? Number(product?.discount_price) : Number(product?.price);
                                    const originalPrice = Number(product?.price);

                                    let imageUrl = product?.featured_image;

                                    if (item?.bike && item?.color?.bike_images?.[0]) {
                                        imageUrl = item.color.bike_images[0];

                                    } else if (item?.accessory && item?.accessory?.accessory_images?.[0]) {
                                        imageUrl = item.accessory.accessory_images[0];
                                    }


                                    return (

                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6 hover:shadow-lg transition-shadow"
                                        >

                                            <div className="flex gap-4 md:gap-6">

                                                {/* Product Image */}
                                                <Link href={`/product/${product?.id}?type=${product?.product_type}`} className="shrink-0">

                                                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-gray-50 overflow-hidden group flex items-center justify-center">

                                                        {imageUrl ? (

                                                            <img
                                                                src={imageUrl}
                                                                alt={product?.name}
                                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                            />

                                                        ) : (

                                                            <ShoppingBag className="w-8 h-8 text-gray-300" />

                                                        )}

                                                    </div>

                                                </Link>

                                                {/* Product Details */}
                                                <div className="flex-1 min-w-0">

                                                    <div className="flex justify-between gap-4 mb-2">

                                                        <div className="flex-1 min-w-0">

                                                            <div className="text-xs text-gray-500 mb-1 uppercase font-semibold tracking-wider">
                                                                {product?.product_type === 'bike' ? 'Bike' : 'Accessory'} • {product?.brand}
                                                            </div>

                                                            <Link href={`/product/${product?.id}?type=${product?.product_type}`}>
                                                                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-sm md:text-base">
                                                                    {product?.name}
                                                                </h3>
                                                            </Link>

                                                            {/* Price with Discount */}
                                                            <div className="mb-3">
                                                                <div className="flex items-center gap-2 flex-wrap">
                                                                    <p className="text-lg md:text-xl font-bold text-gray-900">
                                                                        ₹{price?.toLocaleString()}
                                                                    </p>
                                                                    {product?.is_discount && (
                                                                        <>
                                                                            <p className="text-sm text-gray-400 line-through">
                                                                                ₹{originalPrice?.toLocaleString()}
                                                                            </p>
                                                                            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-md text-xs font-bold">
                                                                                {Number(product?.discount_percentage)}% OFF
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </div>



                                                            {/* Selected Options */}
                                                            <div className="flex flex-wrap gap-2 mb-2">

                                                                {item?.bike && (

                                                                    <div className="flex gap-2 items-center flex-wrap">


                                                                        {/* Size */}
                                                                        <select
                                                                            value={item?.size?.size || ''}
                                                                            onChange={(e) => updateCartItem(item, undefined, undefined, e.target.value)}
                                                                            disabled={updateMutation?.isPending}
                                                                            className="px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-gray-900 cursor-pointer disabled:opacity-50"
                                                                        >

                                                                            <option value="" disabled>Size</option>

                                                                            {item.size && <option value={item.size.size}>{item.size.size || `Size ${item.size.id}`}</option>}

                                                                            {item.bike.sizes?.map((sizeObj: any) => {
                                                                                const sizeId = typeof sizeObj === 'object' ? sizeObj.id : sizeObj;
                                                                                const sizeStr = typeof sizeObj === 'object' ? (sizeObj.size || sizeObj.name) : sizeObj.toString();
                                                                                const sizeValue = sizeStr.startsWith('S') || typeof sizeObj === 'object' ? sizeStr : `S${sizeStr}`;
                                                                                const sizeLabel = typeof sizeObj === 'object' ? (sizeObj.size || sizeObj.name) : `Size ${sizeValue}`;
                                                                                if (sizeValue === item?.size?.size) return null;
                                                                                return <option key={sizeId} value={sizeValue}>{sizeLabel}</option>;
                                                                            })}

                                                                        </select>


                                                                        {/* Color  */}
                                                                        <select
                                                                            value={item?.color?.color || ''}
                                                                            onChange={(e) => updateCartItem(item, undefined, e.target.value, undefined)}
                                                                            disabled={updateMutation?.isPending}
                                                                            className="px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-gray-900 cursor-pointer disabled:opacity-50"
                                                                        >

                                                                            <option value="" disabled>Color</option>

                                                                            {item.color && <option value={item.color.color}>{item.color.color || `Color ${item.color.id}`}</option>}

                                                                            {item.bike.bike_colors?.map((colorObj: any) => {
                                                                                const colorId = typeof colorObj === 'object' ? colorObj.id : colorObj;
                                                                                const colorValue = typeof colorObj === 'object' ? (colorObj.color || colorObj.name) : colorObj.toString();
                                                                                const colorLabel = typeof colorObj === 'object' ? (colorObj.color || colorObj.name) : `Color ${colorObj}`;
                                                                                if (colorValue === item?.color?.color) return null;
                                                                                return <option key={colorId} value={colorValue}>{colorLabel}</option>;
                                                                            })}

                                                                        </select>

                                                                    </div>
                                                                )}


                                                                {item?.accessory && item?.size && (
                                                                    <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-700 font-medium">
                                                                        Size: {item?.size?.size}
                                                                    </span>
                                                                )}

                                                            </div>

                                                        </div>

                                                        {/* Remove Button - Desktop */}
                                                        <button
                                                            onClick={() => removeItem(item)}
                                                            disabled={deleteMutation?.isPending}
                                                            className="hidden md:block p-2 h-fit text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>

                                                    {/* Quantity and Total */}
                                                    <div className="flex items-center justify-between gap-4 pt-3 border-t border-gray-100">
                                                        {/* Quantity Controls */}
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex items-center border border-gray-200 rounded-lg">
                                                                <button
                                                                    onClick={() => updateCartItem(item, item?.quantity - 1)}
                                                                    disabled={updateMutation?.isPending}
                                                                    className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-50"
                                                                >
                                                                    <Minus className="w-4 h-4" />
                                                                </button>
                                                                <span className="px-4 py-2 font-semibold text-gray-900 min-w-12 text-center">
                                                                    {item?.quantity}
                                                                </span>
                                                                <button
                                                                    onClick={() => updateCartItem(item, item?.quantity + 1)}
                                                                    disabled={updateMutation?.isPending}
                                                                    className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-50"
                                                                >
                                                                    <Plus className="w-4 h-4" />
                                                                </button>
                                                            </div>

                                                            {/* Remove Button - Mobile */}
                                                            <button
                                                                onClick={() => removeItem(item)}
                                                                disabled={deleteMutation?.isPending}
                                                                className="md:hidden p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                                            >
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        </div>

                                                        {/* Item Total */}
                                                        <div className="text-right">
                                                            <p className="text-lg md:text-xl font-bold text-gray-900">
                                                                ₹{(price * item?.quantity).toLocaleString()}
                                                            </p>
                                                            {item?.quantity > 1 && (
                                                                <p className="text-xs text-gray-500">
                                                                    ₹{price?.toLocaleString()} each
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>

                            {/* Continue Shopping */}
                            <Link href="/shop/bike">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all"
                                >
                                    Continue Shopping
                                </motion.button>
                            </Link>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24"
                            >
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                                {/* Price Breakdown */}
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Original Price</span>
                                        <span className="font-semibold line-through">₹{originalTotal?.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-green-600">
                                        <span>Total Discount</span>
                                        <span className="font-semibold">-₹{totalDiscount?.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-semibold">₹{subtotal?.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span className="flex items-center gap-2">
                                            <Truck className="w-4 h-4" />
                                            Shipping
                                        </span>
                                        <span className="font-semibold">
                                            {shipping === 0 ? (
                                                <span className="text-green-600">Free</span>
                                            ) : (
                                                `₹${shipping?.toLocaleString()}`
                                            )}
                                        </span>
                                    </div>
                                    {shipping > 0 && remainingForFreeShipping > 0 && (
                                        <div className="text-xs text-gray-500 bg-green-100 p-3 rounded-lg">
                                            Add ₹{remainingForFreeShipping?.toLocaleString()} more for free shipping!
                                        </div>
                                    )}
                                    <div className="pt-4 border-t border-gray-200">
                                        <div className="flex justify-between">
                                            <span className="text-lg font-bold text-gray-900">Total Payable</span>
                                            <span className="text-2xl font-bold text-gray-900">₹{total?.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <Link href="/checkout" className="block w-full">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                                    >
                                        Proceed to Checkout
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.button>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthProtectedRoute>
    );
}
