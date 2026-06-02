"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import { ChevronLeft, ChevronRight, AlertTriangle, RefreshCcw } from "lucide-react";
import { useGetSuggestedProducts } from "@/service/product/useProduct";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/shop/ProductCard";




export function YouMayAlsoLike() {


    const swiperRef = useRef<any>(null);
    const handlePrev = () => swiperRef.current?.slidePrev();
    const handleNext = () => swiperRef.current?.slideNext();



    // Get Suggested Products
    const { data: suggestedProducts, isLoading, isError, refetch } = useGetSuggestedProducts();



    /* ---------------- Skeleton ---------------- */
    if (isLoading) {
        return (
            <div className="w-full space-y-6 pt-5 px-4 pb-6 border-t border-zinc-200 dark:border-zinc-800 mt-10">
                <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-8 w-56" />
                    <div className="flex gap-2">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-10 w-10 rounded-full" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton
                            key={i}
                            className="aspect-square rounded-xl"
                        />
                    ))}
                </div>
            </div>
        );
    }




    /* ---------------- Error ---------------- */
    if (isError) {
        return (
            <div className="w-full flex flex-col items-center justify-center py-16 border-t border-zinc-200 dark:border-zinc-800 mt-10 text-center space-y-4">
                <AlertTriangle className="w-10 h-10 text-red-500" />

                <p className="text-lg font-semibold text-zinc-900 dark:text-white">
                    Failed to load suggestions
                </p>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm">
                    Something went wrong while fetching recommended products.
                </p>

                <Button
                    variant="outline"
                    onClick={() => refetch()}
                    className="gap-2"
                >
                    <RefreshCcw className="w-4 h-4" />
                    Retry
                </Button>
            </div>
        );
    }




    /* ---------------- Data ---------------- */
    return (


        <div className="w-full space-y-6 pt-5 px-4 pb-6 relative group border-t border-zinc-200 dark:border-zinc-800 mt-10">


            {/* Header */}
            <div className="flex items-center justify-between mb-4">


                <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white">
                    You May Also Like
                </h2>


                <div className="flex gap-2">

                    <button
                        onClick={handlePrev}
                        className="p-3 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900
                       hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                        onClick={handleNext}
                        className="p-3 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900
                       hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                </div>

            </div>



            {/* Slider */}
            <div className="px-3 md:px-0">

                <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    modules={[Navigation, Autoplay]}
                    autoplay={{ delay: 6000, disableOnInteraction: false }}
                    spaceBetween={16}
                    slidesPerView={1.2}
                    breakpoints={{
                        480: { slidesPerView: 1.5 },
                        640: { slidesPerView: 2.2 },
                        850: { slidesPerView: 2.5 },
                        1024: { slidesPerView: 3.2 },
                        1280: { slidesPerView: 4 },
                    }}
                >

                    {suggestedProducts?.map((product) => (

                        <SwiperSlide key={product.id} className="h-auto flex">

                            <div className="w-full aspect-square flex">

                                <ProductCard
                                    product={product}
                                    hideAddToCart
                                    height="h-[520px] sm:h-[340px]"
                                    className="h-full w-full border border-zinc-200 dark:border-zinc-800
                             shadow-sm hover:shadow-xl transition-shadow"
                                />

                            </div>

                        </SwiperSlide>

                    ))}

                </Swiper>

            </div>

        </div>

    );

}
