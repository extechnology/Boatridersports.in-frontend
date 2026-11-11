"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import { ArrowUpRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";
import { getBadgeStyle } from "@/hooks/badge";
import { BikeProduct } from "@/types/product";
import { getBikePriceDisplay } from "@/lib/productPricing";

// Item animation matching CategorySlider
const item: Variants = {
    hidden: {
        opacity: 0,
        y: 60,
        scale: 0.95,
    },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.9,
            delay: i * 0.16,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

export default function FeaturedCollection({ data }: { data: BikeProduct[] }) {
    const swiperRef = useRef<SwiperType | null>(null);
    const sectionRef = useRef<HTMLElement | null>(null);
    const handlePrev = () => swiperRef.current?.slidePrev();
    const handleNext = () => swiperRef.current?.slideNext();
    const inView = useInView(sectionRef, { once: true, amount: 0.2 });

    if (!data || data.length === 0) {
        return null;
    }

    return (
        <section
            ref={sectionRef}
            className="w-full py-5 sm:py-8 bg-neutral-50 dark:bg-black border-b-2 border-dashed border-zinc-200 dark:border-zinc-800 overflow-hidden"
        >
            <div className="mx-auto px-2 md:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-6">
                    <div className="space-y-3">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-block px-3 py-1 text-xs font-bold tracking-widest text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-300 uppercase rounded-full"
                        >
                            Curated Selection
                        </motion.span>

                        <div className="flex items-center gap-4">
                            {/* Icon */}
                            <div className="relative">
                                <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-black to-zinc-800 dark:from-white dark:to-zinc-300 flex items-center justify-center shadow-xl">
                                    <svg
                                        className="w-6 h-6 text-white dark:text-black"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 3v4M19 3v4M3 7h18M6 11h12M9 15h6M11 19h2"
                                        />
                                    </svg>
                                </div>

                                {/* Glow */}
                                <div className="absolute inset-0 blur-xl bg-black/40 dark:bg-white/40 -z-10 rounded-full" />
                            </div>

                            {/* Text */}
                            <div>
                                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                                    Featured Masterpieces
                                </h2>

                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Discover our most premium bike collection
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Header Controls: View All + Prev/Next buttons */}
                    <div className="flex items-center gap-4 self-end md:self-auto w-full md:w-auto justify-between md:justify-end">
                        <Link
                            href="/shop"
                            className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        >
                            View All Collection
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Link>

                        <div className="hidden md:flex gap-3">
                            {[ChevronLeft, ChevronRight].map((Icon, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={i === 0 ? handlePrev : handleNext}
                                    aria-label={i === 0 ? "Previous slide" : "Next slide"}
                                    className="w-11 h-11 rounded-full border border-black/10 dark:border-white/10 backdrop-blur-md bg-white/60 dark:bg-black/50 hover:scale-110 hover:shadow-xl transition hover:cursor-pointer flex items-center justify-center text-neutral-800 dark:text-white"
                                >
                                    <Icon className="w-5 h-5 mx-auto" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Slider */}
                <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    modules={[Navigation, Autoplay]}
                    autoplay={{ delay: 4500, disableOnInteraction: false }}
                    spaceBetween={16}
                    slidesPerView={1}
                    breakpoints={{
                        360: { slidesPerView: 1 },
                        480: { slidesPerView: 1.15 },
                        640: { slidesPerView: 2.1 },
                        1024: { slidesPerView: 3.1 },
                        1280: { slidesPerView: 4 },
                    }}
                    className="w-full h-[550px]"
                >
                    {data.map((product, index) => {
                        const imageUrl =
                            product?.featured_image ||
                            product?.bike_colors?.[0]?.bike_images?.[0] ||
                            "";

                        const priceDisplay = getBikePriceDisplay(product);

                        return (
                            <SwiperSlide key={product?.unique_id || index} className="h-full">
                                <motion.div
                                    className="h-full"
                                    initial="hidden"
                                    animate={inView ? "show" : "hidden"}
                                    variants={item}
                                    custom={index}
                                >
                                    <div className="group relative h-full w-full overflow-hidden rounded-3xl bg-neutral-900 shadow-xl hover:shadow-2xl ring-1 ring-white/10 isolate transition-all duration-500">
                                        {/* Card Link Overlay */}
                                        <Link
                                            href={`/product/${product?.unique_id}/?type=${product?.product_type}`}
                                            className="absolute inset-0 z-10"
                                            aria-label={product?.name}
                                        />

                                        {/* Badge */}
                                        {product?.special_tag && (
                                            <div className="absolute top-3 left-3 z-20 pointer-events-none">
                                                <div
                                                    className={`relative overflow-hidden px-3 py-1.5 text-[10px] font-black tracking-wider rounded-full uppercase shadow-md ${getBadgeStyle(
                                                        product?.special_tag
                                                    )}`}
                                                >
                                                    <span className="relative z-10">{product?.special_tag}</span>

                                                    {/* Shimmer Effect */}
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

                                        {/* Image */}
                                        {imageUrl ? (
                                            <Image
                                                src={imageUrl}
                                                alt={product?.name || "Featured bike"}
                                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                                                width={600}
                                                height={600}
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-neutral-500">
                                                No Image Available
                                            </div>
                                        )}

                                        {/* Premium Gradient Overlay */}
                                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-500 pointer-events-none" />

                                        {/* Additional Bottom Glow */}
                                        <div className="absolute -bottom-20 left-0 right-0 h-1/2 bg-linear-to-t from-black to-transparent opacity-100 pointer-events-none" />

                                        {/* Content */}
                                        <div className="absolute bottom-0 left-0 w-full p-5 sm:p-6 text-white z-20 pointer-events-none">
                                            <div className="transform transition-transform duration-500 group-hover:-translate-y-1">
                                                {/* Category */}
                                                <div className="flex items-center gap-2 mb-2 opacity-80">
                                                    <div className="h-px w-6 bg-white/50" />
                                                    <p className="text-xs font-bold tracking-widest uppercase text-white/90">
                                                        {product?.category}
                                                    </p>
                                                </div>

                                                {/* Name and Rating */}
                                                <div className="flex justify-between items-start gap-2 mb-3">
                                                    <h3 className="text-lg sm:text-xl font-black leading-tight tracking-tight drop-shadow-lg line-clamp-2">
                                                        {product?.name}
                                                    </h3>
                                                    <div className="shrink-0 flex items-center bg-white/10 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
                                                        <div className="flex">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`w-2.5 h-2.5 ${
                                                                        i < 4
                                                                            ? "fill-yellow-400 text-yellow-400"
                                                                            : "fill-gray-500 text-gray-500"
                                                                    }`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="h-px w-full bg-white/20 mb-4" />

                                                {/* Price & Details Link */}
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400">
                                                        {priceDisplay.label}
                                                    </span>

                                                    <div className="pointer-events-auto">
                                                        <Link
                                                            href={`/product/${product?.unique_id}/?type=${product?.product_type}`}
                                                            className="group/btn relative overflow-hidden rounded-full bg-white px-5 py-2 transition-all hover:bg-neutral-200 block"
                                                        >
                                                            <span className="relative z-10 text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                                                                Details <ArrowUpRight className="w-3.5 h-3.5" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </section>
    );
}
