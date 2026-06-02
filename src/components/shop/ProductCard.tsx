"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Loader2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getBadgeStyle } from "@/hooks/badge";
import Link from "next/link";
import { BikeProduct, AccessoryProduct } from "@/types/product";
import { useCheckLogin } from "@/service/auth/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { useAddToCart } from "@/service/cart/useCart";
import { createProductEnquiryWhatsAppUrl } from "@/lib/whatsapp";



/* ---------------- Props ---------------- */
interface ProductCardProps {
    product: BikeProduct | AccessoryProduct;
    hideAddToCart?: boolean;
    height?: string;
    className?: string;
}




export default function ProductCard({ product, className, hideAddToCart, height, }: ProductCardProps) {



    /* ---------------- Variables ---------------- */
    const isBike = product?.product_type === "bike";
    const isOutOfStock = product?.is_out_of_stock || product?.stock <= 0;



    const [hovered, setHovered] = useState(false);

    const [selectedColorIndex, setSelectedColorIndex] = useState(0);


    // Get user login status
    const { data: user, isLoading } = useCheckLogin();


    // Router
    const router = useRouter();
    const pathname = usePathname();


    // Add to cart mutation
    const addToCartMutation = useAddToCart();



    /* ---------------- Event handlers ---------------- */
    const handleAddToCart = () => {

        if (isLoading) return;

        if (isOutOfStock) {
            toast.error("This product is currently out of stock");
            return;
        }

        if (!user?.is_logged_in) {

            toast.error("Please login to add items to your cart");

            router.push(`/account/login?redirect=${encodeURIComponent(pathname)}`);

            return;

        }


        // Form data for adding to cart
        const formData = new FormData();
        formData.append("product_type", product.product_type);
        formData.append("product_id", product.unique_id);
        formData.append("quantity", "1");


        if (isBike) {

            if (product.sizes?.length) {

                formData.append("size", product.sizes[0]);

            }

            if (product.bike_colors?.length) {

                formData.append("color", product.bike_colors[selectedColorIndex]?.color || product.bike_colors[0].color);

            }

        }

        addToCartMutation.mutate(formData);

    };



    /* ---------------- Derived values ---------------- */
    const images = isBike ? product?.bike_colors?.[selectedColorIndex]?.bike_images ?? [] : product?.accessory_images ?? [];

    const price = Number(product?.is_discount ? product?.discount_price : product?.price);

    const originalPrice = product?.is_discount ? Number(product?.price) : null;

    const discountPercent = product?.is_discount ? Number(product?.discount_percentage) : 0;
    const selectedColor = isBike ? product?.bike_colors?.[selectedColorIndex]?.color : undefined;
    const selectedSize = isBike ? product?.sizes?.[0] : undefined;
    const enquiryUrl = createProductEnquiryWhatsAppUrl({
        productName: product.name,
        quantity: 1,
        color: selectedColor,
        size: selectedSize,
    });



    return (


        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={cn(
                "group relative flex flex-col", // 🔑 flex column
                "bg-white dark:bg-black rounded-2xl overflow-hidden",
                "border border-zinc-200 dark:border-zinc-800",
                "hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
                "h-130", // 🔑 consistent height
                height,
                className
            )}
        >


            {/* ---------------- Special Tag ---------------- */}
            {product?.special_tag && (


                <div className="absolute top-3 left-3 z-20">


                    <div
                        className={cn(
                            "relative overflow-hidden px-2.5 py-1 text-[10px] font-black tracking-wider rounded-full uppercase shadow-md",
                            getBadgeStyle(product?.special_tag)
                        )}
                    >

                        <span className="relative z-10">
                            {product?.special_tag}
                        </span>

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



            {/* ---------------- Discount Badge ---------------- */}
            {isOutOfStock ? (
                <span className="absolute top-3 right-3 z-20 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow">
                    OUT OF STOCK
                </span>
            ) : discountPercent > 0 && (
                <span className="absolute top-3 right-3 z-20 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow">
                    {discountPercent}% OFF
                </span>
            )}



            {/* ---------------- Image ---------------- */}
            <div
                className="relative h-80 overflow-hidden"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <Link href={`/product/${product.unique_id}?type=${product.product_type}`} aria-label={product.name}>

                    <motion.img
                        key={hovered ? images?.[1] : images?.[0]}
                        src={hovered && images?.[1] ? images[1] : images[0]}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ opacity: 0.6, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                    />

                </Link>

            </div>



            {/* ---------------- CONTENT (GROWS) ---------------- */}
            <div className="relative z-10 flex flex-col flex-1 p-4 sm:p-5 gap-3">


                {/* Title */}
                <div>

                    <h3 className="font-semibold text-base sm:text-lg text-zinc-900 dark:text-white leading-snug line-clamp-2">
                        {product?.name}
                    </h3>

                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        {product?.brand}
                    </span>

                </div>


                <div className="flex items-start justify-between gap-4">

                    {/* Pricing */}
                    <div className="space-y-1">

                        <div className="flex items-center gap-2">

                            <span className="text-xl font-black text-zinc-900 dark:text-white">
                                ₹{price.toLocaleString()}
                            </span>

                            {discountPercent > 0 && (
                                <span className="text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                                    {discountPercent}% OFF
                                </span>
                            )}

                        </div>

                        {originalPrice && (
                            <span className="text-sm line-through text-zinc-400">
                                ₹{originalPrice.toLocaleString()}
                            </span>
                        )}

                    </div>


                    {/* Colors (Bike only) */}
                    {!hideAddToCart && isBike && (
                        <div className="flex items-center gap-2 pt-0.5 shrink-0">
                            {product?.bike_colors?.map((color, index) => {
                                const [topColor, bottomColor] = color.color_code;
                                const isSelected = index === selectedColorIndex;

                                return (
                                    <button
                                        key={color.color}
                                        type="button"
                                        onMouseEnter={() => setSelectedColorIndex(index)}
                                        className={cn(
                                            "w-6 h-6 rounded-full border transition",
                                            isSelected
                                                ? "ring-2 ring-black dark:ring-white"
                                                : "border-zinc-300 dark:border-zinc-700"
                                        )}
                                        style={{
                                            background: bottomColor
                                                ? `linear-gradient(to bottom, ${topColor} 50%, ${bottomColor} 50%)`
                                                : topColor,
                                        }}
                                    />
                                );
                            })}
                        </div>
                    )}

                </div>

            </div>


            {/* ---------------- CTA (ALWAYS BOTTOM) ---------------- */}
            {!hideAddToCart && (

                <div className="p-4 sm:p-5 pt-0 mt-auto">

                    {isOutOfStock ? (

                        <button
                            type="button"
                            disabled
                            className="w-full h-11 flex items-center justify-center gap-2 rounded-full bg-zinc-200 text-zinc-500 font-semibold text-sm cursor-not-allowed"
                        >
                            Out of Stock
                        </button>

                    ) : !product?.online_purchase_enabled ? (

                        <motion.a
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            href={enquiryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative w-full h-11 flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-white font-semibold text-sm shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] hover:bg-[#20bd5a] transition-all duration-300 overflow-hidden"
                        >
                            <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                            <span className="relative z-10 flex items-center gap-2">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                                </svg>
                                Enquire
                            </span>
                        </motion.a>

                    ) : (

                        <motion.button
                            onClick={handleAddToCart}
                            disabled={addToCartMutation?.isPending || isOutOfStock}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative w-full h-11 flex items-center justify-center gap-2 rounded-full bg-black text-white dark:bg-white dark:text-black font-semibold text-sm shadow-[0_4px_14px_0_rgba(0,0,0,0.39)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] dark:shadow-[0_4px_14px_0_rgba(255,255,255,0.39)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                        >
                            <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                            <span className="relative z-10 flex items-center gap-2">
                                {addToCartMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingBag className="w-4 h-4" />}
                                {addToCartMutation.isPending ? "Adding to Cart..." : "Add to Cart"}
                            </span>
                        </motion.button>

                    )}

                </div>

            )}



        </motion.div>

    );

}
