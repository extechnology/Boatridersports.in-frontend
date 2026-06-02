'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

interface HeroSlide {
    image: string;
    title: string;
    subtitle: string;
    cta?: {
        text: string;
        action: () => void;
    };
}

interface HeroSliderProps {
    slides: HeroSlide[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
    return (
        <section className="relative h-screen overflow-hidden">
            <Swiper
                modules={[Autoplay, EffectFade, Pagination]}
                effect="fade"
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet !bg-white/50',
                    bulletActiveClass: 'swiper-pagination-bullet-active !bg-white',
                }}
                loop={true}
                speed={1000}
                className="h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative h-full">

                            {/* Top dark inset */}
                            <div className="absolute top-0 left-0 right-0 h-40 md:h-56 bg-linear-to-b from-black/55 via-black/30 to-transparent z-10" />

                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-br from-black/55 via-black/40 to-black/55" />
                            </div>

                            {/* Content */}
                            <div className="relative h-full flex items-center justify-center text-center px-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="max-w-4xl"
                                >
                                    <motion.h1
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-5xl md:text-7xl font-bold text-white mb-6"
                                    >
                                        {slide.title}
                                    </motion.h1>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="text-xl md:text-2xl text-gray-200 mb-8"
                                    >
                                        {slide.subtitle}
                                    </motion.p>
                                    {slide.cta && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8 }}
                                        >
                                            <button
                                                onClick={slide.cta.action}
                                                className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-xl"
                                            >
                                                {slide.cta.text}
                                            </button>
                                        </motion.div>
                                    )}
                                </motion.div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>


        </section>
    );
}
