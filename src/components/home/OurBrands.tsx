"use client";


import { motion } from "framer-motion";
import { LogoCarousel } from "../ui/logo-carousel";


export default function OurBrands({ data }: { data: string[] }) {


    return (

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
        >
            <div className="py-16 bg-white dark:bg-black">

                <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center space-y-10 px-4">

                    {/* Heading */}
                    <div className="space-y-3">
                        <p className="text-sm uppercase tracking-[0.3em] font-semibold text-zinc-500 dark:text-zinc-400">
                            Trusted By Top Brands
                        </p>

                        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white">
                            The Best Are Already Here
                        </h1>

                        <a
                            href="https://www.newcult.co"
                            target="_blank"
                            className="inline-flex items-center justify-center mt-4"
                        >
                            <span className="relative text-4xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-zinc-900 via-zinc-600 to-zinc-900 dark:from-white dark:via-zinc-400 dark:to-white hover:opacity-80 transition">
                                Join New Cult
                            </span>
                        </a>
                    </div>

                    {/* Logo Carousel */}
                    <div className="w-full mt-2">
                        <LogoCarousel data={data} columnCount={6} />
                    </div>

                </div>
            </div>

        </motion.div>

    );


} 