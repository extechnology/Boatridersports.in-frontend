"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";



/* ------------------ SLIDES ------------------ */
const slides = [
    {
        id: 1,
        image:
            "https://images.unsplash.com/photo-1541625602330-2277a4c46182?fm=jpg&q=60&w=3000",
        mobileimage:
            "https://images.unsplash.com/photo-1541625602330-2277a4c46182?fm=jpg&q=60&w=3000",
        title: "Shaping Dreams",
        desc: "Into Living Spaces",
        sub: "Set the tone of your space with tiles that go beyond function.",
    },
    {
        id: 2,
        image:
            "https://plus.unsplash.com/premium_photo-1671100502325-8870ff9ba5c9?fm=jpg&q=60&w=3000",
        mobileimage:
            "https://plus.unsplash.com/premium_photo-1671100502325-8870ff9ba5c9?fm=jpg&q=60&w=3000",
        title: "Ride Like Remco",
        desc: "Performance Meets Passion",
        sub: "Engineered for speed, built for champions.",
    },
];



export default function HeroSlider() {


    const [activeIndex, setActiveIndex] = useState(0);


    return (


        <div className="w-full h-screen relative overflow-hidden">

            <Swiper
                modules={[Autoplay, EffectFade]}
                slidesPerView={1}
                effect="slide"
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop
                className="w-full h-full"
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >

                {slides.map((slide) => (

                    <SwiperSlide key={`slide-${slide.id}`}>

                        <div className="relative w-full h-full">

                            {/* -------- IMAGE ZOOM CONTAINER -------- */}
                            <div className="absolute inset-0 overflow-hidden">

                                {/* Desktop */}
                                <motion.img
                                    key={`desktop-${slide.id}-${activeIndex}`}
                                    src={slide.image}
                                    alt="Slide"
                                    initial={{ scale: 1.25 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 8, ease: "easeOut" }}
                                    className="hidden sm:block w-full h-full object-cover will-change-transform"
                                />

                                {/* Mobile */}
                                <motion.img
                                    key={`mobile-${slide.id}-${activeIndex}`}
                                    src={slide.mobileimage}
                                    alt="Slide"
                                    initial={{ scale: 1.25 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 8, ease: "easeOut" }}
                                    className="block sm:hidden w-full h-full object-cover will-change-transform"
                                />
                            </div>


                            {/* -------- OVERLAY -------- */}
                            <div className="absolute inset-0 bg-black/30" />
                            <div className="absolute top-0 inset-x-0 h-[40%] bg-linear-to-b from-black/60 to-transparent" />


                            {/* -------- LEFT ALIGNED CAMPAIGN TEXT -------- */}
                            <motion.div
                                key={`text-${slide.id}-${activeIndex}`}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.1, ease: "easeOut" }}
                                className="absolute inset-0 z-20 flex items-center"
                            >
                                <div className="max-w-3xl px-6 sm:px-10 md:px-10">

                                    <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight">
                                        {slide.title}
                                    </h1>

                                    <h2 className="mt-3 text-white/90 text-2xl sm:text-3xl md:text-4xl font-light">
                                        {slide.desc}
                                    </h2>

                                    <p className="mt-6 text-white/80 max-w-xl text-sm sm:text-base md:text-lg">
                                        {slide.sub}
                                    </p>

                                    <Link href="/products">
                                        <button className="mt-8 inline-flex items-center gap-4 rounded-full bg-white px-8 py-3 text-black font-medium tracking-wide shadow-lg hover:scale-105 hover:bg-gray-100 transition-all duration-300 hover:cursor-pointer">
                                            Shop Now
                                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
                                                <ChevronRight className="h-5 w-5" />
                                            </span>
                                        </button>
                                    </Link>

                                </div>
                            </motion.div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
