"use client";


import { motion } from "framer-motion";
import { LogoCarousel } from "../ui/logo-carousel";


export default function OurBrands({ data }: { data: string[] }) {

    if (!data || data.length === 0) {
        return null;
    }

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

                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
                            The World&apos;s Best Cycling Brands
                        </h2>
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