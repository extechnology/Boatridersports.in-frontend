"use client";

import { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";
import { ShopBuyType } from "@/types/home";
import Image from "next/image";



// 🔥 Item animation
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



export default function CategorySlider({ data }: { data: ShopBuyType[] }) {


    const swiperRef = useRef<any>(null);
    const sectionRef = useRef<any>(null);
    const handlePrev = () => swiperRef.current?.slidePrev();
    const handleNext = () => swiperRef.current?.slideNext();
    const inView = useInView(sectionRef, { once: true, amount: 0.3 });


    return (


        <section ref={sectionRef} className="w-full py-5 sm:py-8 bg-white dark:bg-black border-b-2 border-dashed border-zinc-200 dark:border-zinc-800">


            <div className="mx-auto px-2 md:px-8">


                {/* Header */}
                <motion.div
                    variants={item}
                    className="flex items-center justify-between mb-5"
                >

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
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M19 3v4M3 7h18M6 11h12M9 15h6M11 19h2" />
                                </svg>
                            </div>

                            {/* Glow */}
                            <div className="absolute inset-0 blur-xl bg-black/40 dark:bg-white/40 -z-10 rounded-full" />
                        </div>


                        {/* Text */}
                        <div>
                            <h2 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-black to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
                                Shop By
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Browse premium cycling categories
                            </p>
                        </div>

                    </div>


                    <div className="hidden md:flex gap-3">

                        {[ChevronLeft, ChevronRight].map((Icon, i) => (

                            <button
                                key={i}
                                onClick={i === 0 ? handlePrev : handleNext}
                                className="w-11 h-11 rounded-full border border-black/10 dark:border-white/10 backdrop-blur-md bg-white/60 dark:bg-black/50 hover:scale-110 hover:shadow-xl transition hover:cursor-pointer"
                            >
                                <Icon className="mx-auto" />
                            </button>

                        ))}

                    </div>

                </motion.div>



                {/* Slider */}
                <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    modules={[Navigation, Autoplay]}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    spaceBetween={16}
                    slidesPerView={1}
                    breakpoints={{
                        360: { slidesPerView: 1 },
                        480: { slidesPerView: 1 },
                        640: { slidesPerView: 2.1 },
                        1024: { slidesPerView: 3.1 },
                        1280: { slidesPerView: 4 },
                    }}
                    className="w-full h-[550px]"
                >


                    {data?.map((cat, index) => (


                        <SwiperSlide key={cat?.title} className="h-full">


                            <motion.div
                                className="h-full"
                                initial="hidden"
                                animate={inView ? "show" : "hidden"}
                                variants={item}
                                custom={index}
                            >


                                <Link
                                    href={`/shop/${cat?.type}/?category=${cat?.title}`}
                                    className="group relative block h-full rounded-3xl overflow-hidden bg-black shadow-xl hover:shadow-2xl transition-all duration-700"
                                >

                                    {/* Image */}
                                    <Image
                                        src={cat?.image}
                                        alt={cat?.title}
                                        loading="lazy"
                                        width={100}
                                        height={100}
                                        className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-1200ms ease-out"
                                    />


                                    {/* Premium gradient */}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />


                                    {/* Glass shine */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/10 backdrop-blur-[2px] transition" />


                                    {/* Content */}
                                    <div className="absolute bottom-0 p-7 w-full flex justify-between items-center">


                                        <div>
                                            <h3 className="text-white text-2xl font-semibold tracking-tight">
                                                {cat?.title}
                                            </h3>
                                            <p className="text-white/60 text-sm mt-1">
                                                Explore Collection
                                            </p>
                                        </div>


                                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-500 scale-75 group-hover:scale-100">
                                            <ArrowRight />
                                        </div>


                                    </div>

                                </Link>

                            </motion.div>

                        </SwiperSlide>

                    ))}

                </Swiper>

            </div>

        </section>

    );

}
