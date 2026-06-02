"use client";


import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductPoster } from "@/data/shop-data";



interface ProductPosterSliderProps {
    posters: ProductPoster[];
}



export function ProductPosterSlider({ posters }: ProductPosterSliderProps) {


    const swiperRef = useRef<any>(null);

    if (!posters?.length) return null;



    return (


        <div className="relative w-full py-0 sm:py-4 overflow-hidden">


            {/* Slider */}
            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                modules={[Autoplay]}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                spaceBetween={10}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 1.6 },
                    1024: { slidesPerView: 3 },
                }}
                className="w-full overflow-visible!"
            >


                {posters.map((poster, i) => (


                    <SwiperSlide key={i}>


                        <div className="relative h-[570px] rounded-xl overflow-hidden">


                            {/* Image */}
                            <img
                                src={poster.image}
                                alt={poster.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />


                            <div className="absolute inset-0 bg-linear-to-b from-black via-black/30 to-transparent" />


                            {/* Text */}
                            <div className="relative z-10 p-4 flex flex-col h-full justify-start pt-5">
                                <h3 className="text-2xl font-black text-white leading-tight max-w-[90%]">
                                    {poster.title}
                                </h3>

                                <div className="w-14 h-[3px] bg-white/30 rounded-full my-4" />

                                <p className="text-zinc-300 text-sm leading-relaxed max-w-[90%]">
                                    {poster.description}
                                </p>
                            </div>

                        </div>

                    </SwiperSlide>

                ))}

            </Swiper>


            {/* Bottom Navigation (like image) */}
            <div className="absolute bottom-8 right-2 flex gap-3 z-20">

                <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>

            </div>


        </div>

    );

}
