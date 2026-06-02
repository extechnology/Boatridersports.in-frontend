"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Play, ArrowUpRight, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { HomeSliderType } from "@/types/home";




export default function VideoShowcase({ data }: { data: HomeSliderType }) {



    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(textRef, { once: true, margin: "-20%" });



    // Parallax effect for the video
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });


    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);


    const words = data?.title?.split(" ") ?? [];



    return (


        <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black text-white">


            {/* Video Background */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 w-full h-[120%] -top-[10%]"
            >

                {/* Desktop Video */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-60 hidden sm:flex"
                >
                    <source src={data?.desktop_video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>


                {/* Mobile Video */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-60 sm:hidden"
                >
                    <source src={data?.mobile_video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>


            </motion.div>


            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/30" />


            {/* Content */}
            <div className="relative z-10 w-full h-full mx-auto px-4 sm:px-12 flex flex-col justify-center">


                <div ref={textRef} className="max-w-7xl space-y-8">


                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >

                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-px w-12 bg-white/60"></span>
                            <span className="text-sm font-medium tracking-[0.2em] uppercase text-white/80">{data?.sub_title}</span>
                        </div>

                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]">
                            {words[0]}{" "}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-gray-500">
                                {words[1]}
                            </span>{" "}
                            <br />
                            {words[2]}
                        </h2>


                    </motion.div>


                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed"
                    >
                        {data?.description}
                    </motion.p>


                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex items-center gap-6 pt-4"
                    >

                        <Link href="/shop/bike" className="group relative px-8 py-4 bg-white text-black rounded-full font-bold flex items-center gap-2 overflow-hidden transition-all hover:bg-gray-200 hover:cursor-pointer hover:scale-105">
                            <span className="relative z-10">Shop Now</span>
                            <ShoppingBasket className="w-4 h-4 fill-current relative z-10" />
                        </Link>


                        <Link href="/about" className="group flex items-center gap-2 text-white font-medium hover:text-gray-300 transition-colors">
                            <span>OUR STORY</span>
                            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>

                    </motion.div>


                </div>


            </div>


        </section>

    );

}
