"use client";

import { Minus, Plus, Check, ArrowRight, Star, Loader2 } from "lucide-react";
import { BikeProduct, AccessoryProduct } from "@/types/product";
import { getBadgeStyle } from "@/hooks/badge";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useCheckLogin } from "@/service/auth/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { useAddToCart } from "@/service/cart/useCart";
import { createProductEnquiryWhatsAppUrl } from "@/lib/whatsapp";
import ProductEnquiryModal from "./ProductEnquiryModal";
import {
    getBikeVariantPricing,
    getInitialSelectedBikeSize,
    isVariantOutOfStock,
} from "@/lib/productPricing";



// Props type
interface ProductInfoProps {
    product: BikeProduct | AccessoryProduct;
    quantity: number;
    setQuantity: (q: number) => void;
    selectedColorIndex: number;
    setSelectedColorIndex: (index: number) => void;
    selectedSize?: string;
    setSelectedSize?: (size: string) => void;
}




export function ProductInfo({
    product,
    quantity,
    setQuantity,
    selectedColorIndex,
    setSelectedColorIndex,
    selectedSize: controlledSize,
    setSelectedSize: setControlledSize,
}: ProductInfoProps) {


    const isbike = product.product_type === "bike";
    const colors = isbike ? product.bike_colors : [];
    const isTrek = product.brand?.trim().toLowerCase() === "trek" || product.name?.toLowerCase().includes("trek");

    // Size options with variant metadata (falls back cleanly to `sizes` array)
    const sizeOptions = isbike
        ? (product.bike_sizes && product.bike_sizes.length > 0
            ? product.bike_sizes
            : (product.sizes || []).map((size) => ({
                  size,
                  stock: product.stock,
                  is_out_of_stock: product.is_out_of_stock,
                  is_available: product.is_available,
              })))
        : [];

    // State for selected size (synced with parent when controlled)
    const [showEnquiryModal, setShowEnquiryModal] = useState(false);
    const [internalSize, setInternalSize] = useState(() =>
        isbike ? getInitialSelectedBikeSize(product) : ""
    );
    const selectedSize = controlledSize !== undefined ? controlledSize : internalSize;
    const setSelectedSize = setControlledSize ?? setInternalSize;

    // Derived size-specific pricing & stock values
    const pricing = isbike
        ? getBikeVariantPricing(product, selectedSize)
        : {
              currentPrice: Number(product.is_discount && Number(product.discount_price) > 0 ? product.discount_price : product.price) || 0,
              originalPrice: product.is_discount && Number(product.discount_price) > 0 ? Number(product.price) : null,
              hasDiscount: Boolean(product.is_discount) && Number(product.discount_price) > 0,
              discountPercent: product.is_discount ? Number(product.discount_percentage) || 0 : 0,
              isOutOfStock: Boolean(product.is_out_of_stock) || Number(product.stock ?? 0) <= 0,
              stockCount: Number(product.stock ?? 0),
              hasAnyStockAcrossSizes: !Boolean(product.is_out_of_stock) && Number(product.stock ?? 0) > 0,
          };

    const { currentPrice: price, originalPrice, discountPercent, isOutOfStock, stockCount, hasAnyStockAcrossSizes } = pricing;
    const isComingSoon = isTrek && !hasAnyStockAcrossSizes;
    const maxQuantity = product.online_purchase_enabled && !isOutOfStock && stockCount > 0 ? stockCount : undefined;

    const handleSelectSize = (size: string) => {
        setSelectedSize(size);
        if (isbike && product.online_purchase_enabled) {
            const nextPricing = getBikeVariantPricing(product, size);
            if (!nextPricing.isOutOfStock && nextPricing.stockCount > 0 && quantity > nextPricing.stockCount) {
                setQuantity(nextPricing.stockCount);
            }
        }
    };

    const selectedColor = isbike ? colors?.[selectedColorIndex]?.color : undefined;
    const enquiryUrl = createProductEnquiryWhatsAppUrl({
        productName: product.name,
        quantity,
        color: selectedColor,
        size: selectedSize,
        price,
    });


    // User and path
    const { data: user, isLoading } = useCheckLogin();
    const router = useRouter();
    const pathname = usePathname();


    // Add to cart mutation
    const addToCartMutation = useAddToCart();



    // Handle buy or cart action
    const handleAction = (action: 'buy' | 'cart') => {

        // Loading guard
        if (isLoading) return;

        if (isOutOfStock) {
            toast.error(
                isComingSoon
                    ? "This product is coming soon"
                    : isbike && selectedSize
                        ? `Size ${selectedSize} is currently out of stock`
                        : "This product is currently out of stock"
            );
            return;
        }


        // Login check
        if (!user?.is_logged_in) {
            toast.error(`Please login to ${action === 'buy' ? 'purchase' : 'add items to your cart'}`);
            router.push(`/account/login?redirect=${encodeURIComponent(pathname)}`);
            return;
        }


        // Form data
        const formData = new FormData();
        formData.append("product_type", product.product_type);
        formData.append("product_id", product.unique_id);
        formData.append("quantity", quantity.toString());


        // Bike attributes
        if (isbike) {

            formData.append("size", selectedSize);
            if (selectedColor) {
                formData.append("color", selectedColor);
            }

        }


        // If buy action, redirect to cart on success
        if (action === 'buy') {

            addToCartMutation.mutate(formData, {

                onSuccess: () => {
                    router.push('/cart');
                }

            });

        } else {

            addToCartMutation.mutate(formData);

        }

    };


    return (
        <div className="space-y-4 px-3 sm:px-4 sm:py-0">
            {/* Title & Price */}
            <div className="space-y-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-6">
                        <div className="min-w-0 space-y-1">
                            {/* Title + Tag */}
                            <div className="flex items-start gap-3 w-full">
                                {/* Title */}
                                <h1
                                    className="flex-1 min-w-0 text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight leading-tight wrap-break-word     line-clamp-2    sm:line-clamp-none"
                                >
                                    {product.name}
                                </h1>

                                {/* Badge */}
                                {product.special_tag && (
                                    <div className="shrink-0">
                                        <div
                                            className={`relative overflow-hidden px-2.5 py-1 text-[10px] font-black tracking-wider rounded-full uppercase shadow-md ${getBadgeStyle(
                                                product.special_tag
                                            )}`}
                                        >
                                            <span className="relative z-10">{product.special_tag}</span>

                                            {/* Shimmer */}
                                            <motion.div
                                                className="absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/40 to-transparent"
                                                initial={{ x: "-100%" }}
                                                animate={{ x: "200%" }}
                                                transition={{
                                                    repeat: Infinity,
                                                    duration: 2,
                                                    ease: "easeInOut",
                                                    repeatDelay: 1,
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Brand */}
                            <span className="text-sm font-bold uppercase tracking-wider text-zinc-500">
                                {product.brand}
                            </span>
                        </div>

                        {/* Reviews */}
                        <div className="flex items-center gap-1 shrink-0 pt-1">
                            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                            <span className="text-sm font-bold text-zinc-900 dark:text-white">
                                {"4.8"}
                            </span>
                            <span className="text-xs text-zinc-500">
                                (124)
                            </span>
                        </div>
                    </div>
                </div>

                {/* Price & Stock Availability */}
                <div className="space-y-2.5">
                    <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-semibold text-zinc-900 dark:text-white">
                                ₹{price.toLocaleString("en-IN")}
                            </span>
                            {originalPrice && (
                                <span className="text-lg text-zinc-400 line-through font-medium">
                                    ₹{originalPrice.toLocaleString("en-IN")}
                                </span>
                            )}
                        </div>

                        {/* Discount Badge */}
                        {discountPercent > 0 && (
                            <span className="bg-emerald-500 text-white px-2.5 py-0.5 rounded-full text-xs font-bold">
                                -{discountPercent}%
                            </span>
                        )}
                    </div>

                    {/* Stock Availability Badge */}
                    <div>
                        {isOutOfStock ? (
                            isComingSoon ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-full">
                                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                    Coming Soon
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-full">
                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    {isbike && selectedSize ? `Out of Stock for Size ${selectedSize}` : "Out of Stock"}
                                </span>
                            )
                        ) : stockCount <= 3 ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-full">
                                <span className="w-2 h-2 rounded-full bg-amber-500" />
                                {isbike && selectedSize
                                    ? `Only ${stockCount} left in size ${selectedSize} — order soon!`
                                    : `Only ${stockCount} left in stock — order soon!`}
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 rounded-full">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                In Stock
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

            {/* Options: Color & Size */}
            <div className="space-y-6">
                {/* Color Selector */}
                {colors?.length > 0 && (
                    <div className="space-y-4">
                        <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                            Color:
                            <span className="ml-2 font-normal text-zinc-500">
                                {colors[selectedColorIndex].color}
                            </span>
                        </span>

                        <div className="flex flex-wrap gap-3 mt-2">
                            {colors.map((color, index) => {
                                const isActive = selectedColorIndex === index;
                                const [topColor, bottomColor] = color.color_code;

                                return (
                                    <button
                                        key={color.color}
                                        onClick={() => setSelectedColorIndex(index)}
                                        className={cn(
                                            "relative w-12 h-12 rounded-full transition-all duration-300 hover:cursor-pointer",
                                            "border-2 dark:border-zinc-700",
                                            isActive
                                                ? "border-black dark:border-white ring-2 ring-black dark:ring-white"
                                                : "border-zinc-200 hover:scale-110 hover:ring-1 hover:ring-zinc-300 dark:hover:ring-zinc-600"
                                        )}
                                    >
                                        {/* Color bubble */}
                                        <span
                                            className="absolute inset-1 rounded-full"
                                            style={{
                                                background: bottomColor
                                                    ? `linear-gradient(to bottom, ${topColor} 50%, ${bottomColor} 50%)`
                                                    : topColor,
                                            }}
                                        />

                                        {/* Check Icon */}
                                        <AnimatePresence>
                                            {isActive && (
                                                <motion.span
                                                    initial={{ scale: 0.5, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    exit={{ scale: 0.5, opacity: 0 }}
                                                    className="absolute inset-0 flex items-center justify-center"
                                                >
                                                    <Check
                                                        className={cn(
                                                            "w-5 h-5",
                                                            color.color === "White" || color.color === "Yellow"
                                                                ? "text-black"
                                                                : "text-white"
                                                        )}
                                                        strokeWidth={3}
                                                    />
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Frame Size */}
                {sizeOptions.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                                Size : {selectedSize}
                            </span>

                            <button className="text-xs font-medium underline text-zinc-500 hover:text-black dark:hover:text-white transition hover:cursor-pointer">
                                Size Guide
                            </button>
                        </div>

                        <div className="grid grid-cols-4 gap-3">
                            {sizeOptions.map((item) => {
                                const isActive = selectedSize === item.size;
                                const itemOutOfStock = isVariantOutOfStock(item);

                                return (
                                    <button
                                        key={item.size}
                                        type="button"
                                        onClick={() => handleSelectSize(item.size)}
                                        className={cn(
                                            "h-11 rounded-xl border text-sm font-medium transition-all duration-300 hover:cursor-pointer",
                                            "flex items-center justify-center",
                                            isActive
                                                ? itemOutOfStock
                                                    ? "border-red-500 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 shadow-sm scale-105 line-through"
                                                    : "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black shadow-md scale-105"
                                                : itemOutOfStock
                                                    ? "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 text-zinc-400 dark:text-zinc-600 line-through hover:border-zinc-300 dark:hover:border-zinc-700"
                                                    : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white hover:scale-105"
                                        )}
                                    >
                                        {item.size}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-zinc-900 dark:text-white">Quantity</span>

                    <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-inner">
                        {/* Minus */}
                        <motion.button
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="relative w-6 h-6 flex items-center justify-center rounded-full bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 shadow-md hover:shadow-lg hover:ring-2 hover:ring-black/10 dark:hover:ring-white/10 transition-all hover:cursor-pointer"
                        >
                            <Minus className="w-4 h-4" />
                            <span className="absolute inset-0 rounded-full bg-black/5 dark:bg-white/5 opacity-0 hover:opacity-100 transition" />
                        </motion.button>

                        {/* Count */}
                        <span className="w-10 text-center text-sm font-semibold text-zinc-900 dark:text-white">
                            {quantity}
                        </span>

                        {/* Plus */}
                        <motion.button
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            disabled={isOutOfStock || (maxQuantity !== undefined && quantity >= maxQuantity)}
                            onClick={() => setQuantity(maxQuantity ? Math.min(maxQuantity, quantity + 1) : quantity + 1)}
                            className="relative w-6 h-6 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black shadow-lg hover:shadow-xl hover:ring-2 hover:ring-black/20 dark:hover:ring-white/20 transition-all hover:cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <Plus className="w-4 h-4" />
                            <span className="absolute inset-0 rounded-full bg-white/10 dark:bg-black/10 opacity-0 hover:opacity-100 transition" />
                        </motion.button>
                    </div>
                </div>

                {/* Actions */}
                {isOutOfStock ? (

                    <div className="grid grid-cols-1">
                        <button
                            disabled
                            className="h-14 rounded-full bg-zinc-300 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 font-semibold text-base cursor-not-allowed">
                            {isComingSoon ? "Coming Soon" : "Out of Stock"}
                        </button>
                    </div>

                ) : !product?.online_purchase_enabled ? (

                    <div className="grid grid-cols-1 gap-4">

                        <motion.button
                            type="button"
                            onClick={() => setShowEnquiryModal(true)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative h-14 w-full flex items-center justify-center rounded-full bg-linear-to-r from-[#25D366] to-[#128C7E] hover:from-[#20bd5a] hover:to-[#0f7a6e] hover:cursor-pointer text-white font-bold text-base sm:text-lg shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.6)] transition-all duration-300 overflow-hidden"
                        >
                            <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-700" />
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                <svg className="w-6 h-6 fill-current drop-shadow-sm shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                                </svg>
                                Enquire on WhatsApp / Call
                            </span>
                        </motion.button>

                        <ProductEnquiryModal
                            isOpen={showEnquiryModal}
                            onClose={() => setShowEnquiryModal(false)}
                            productName={product.name}
                            enquiryUrl={enquiryUrl}
                            productDetails={
                                [
                                    selectedColor ? `Color: ${selectedColor}` : null,
                                    selectedSize ? `Size: ${selectedSize}` : null,
                                    price > 0 ? `₹${price.toLocaleString("en-IN")}` : null,
                                    `Qty: ${quantity}`,
                                ].filter(Boolean).join(" • ")
                            }
                        />

                    </div>

                ) : (

                    <div className="grid grid-cols-1 gap-4">

                        {/* Buy Now */}
                        <motion.button
                            onClick={() => handleAction('buy')}
                            disabled={addToCartMutation.isPending || isOutOfStock}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative h-14 rounded-full bg-linear-to-r from-zinc-800 to-black dark:from-white dark:to-zinc-200 hover:from-black hover:to-black dark:hover:from-zinc-200 dark:hover:to-zinc-300 hover:cursor-pointer text-white dark:text-black font-bold text-lg shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)] dark:shadow-[0_10px_30px_rgba(255,255,255,0.3)] dark:hover:shadow-[0_15px_40px_rgba(255,255,255,0.4)] transition-all duration-300 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed">
                            <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 dark:via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-700" />
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                Buy Now {addToCartMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
                            </span>
                        </motion.button>

                    </div>
                )}

            </div>
        </div>
    );
}
