"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight, ShoppingBag, Star } from "lucide-react";
import Link from "next/link";
import { getBadgeStyle, BadgeTag } from "@/hooks/badge";
import { BikeProduct } from "@/types/product";
import Image from "next/image";




export default function FeaturedCollection({ data }: { data: BikeProduct[] }) {



    // Framer Motion Variants
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 40, scale: 0.96 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };



    return (


        <section className="py-8 px-2 md:px-8 bg-neutral-50 dark:bg-black overflow-hidden">


            <div className="w-full mx-auto">


                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">


                    <div className="space-y-4">

                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-block px-3 py-1 text-xs font-bold tracking-widest text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-300 uppercase rounded-full"
                        >
                            Curated Selection
                        </motion.span>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="flex items-center gap-4"
                        >
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
                                <h2 className="text-4xl md:text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                                    Featured Masterpieces
                                </h2>

                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Discover our most premium bike collection
                                </p>
                            </div>

                        </motion.div>


                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link href="/shop" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                            View All Collection
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Link>

                    </motion.div>

                </div>


                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">


                    {data?.map((product) => (

                        <motion.div
                            key={product?.unique_id}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-80px" }}
                            variants={itemVariants}
                            className="group relative"
                        >


                            <div className="relative aspect-3/4 w-full overflow-hidden rounded-3xl bg-neutral-900 shadow-2xl ring-1 ring-white/10 isolate">

                                {/* Badge */}
                                {product?.special_tag && (
                                    <div className="absolute top-3 left-3 z-20">

                                        <div className={`relative overflow-hidden px-3 py-1.5 text-[10px] font-black tracking-wider rounded-full uppercase shadow-md ${getBadgeStyle(product?.special_tag)}`}>

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
                                                    repeatDelay: 1
                                                }}
                                            />

                                        </div>
                                    </div>
                                )}


                                {/* Image */}
                                <Image
                                    src={product?.featured_image ?? ""}
                                    alt={product?.name}
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                                    width={500}
                                    height={500}
                                />


                                {/* Premium Gradient Overlay - Bottom Inset */}
                                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-500" />


                                {/* Additional Bottom Glow for richness */}
                                <div className="absolute -bottom-20 left-0 right-0 h-1/2 bg-linear-to-t from-black to-transparent opacity-100" />



                                {/* Content */}
                                <div className="absolute bottom-0 left-0 w-full p-8 text-white z-20">


                                    <div className="transform transition-transform duration-500 group-hover:-translate-y-2">


                                        {/* Category */}
                                        <div className="flex items-center gap-2 mb-3 opacity-80">
                                            <div className="h-px w-6 bg-white/50" />
                                            <p className="text-xs font-bold tracking-widest uppercase text-white/90">{product?.category}</p>
                                        </div>


                                        {/* Name and Rating */}
                                        <div className="flex justify-between items-end mb-4">
                                            <h3 className="text-3xl font-black leading-tight tracking-tight drop-shadow-lg">{product?.name}</h3>
                                            <div className="flex flex-col items-center justify-center gap-0.5 bg-white/10 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10">
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`w-2.5 h-2.5 ${i < Math.floor(3.5) ? "fill-yellow-400 text-yellow-400" : "fill-gray-500 text-gray-500"}`} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>


                                        <div className="h-px w-full bg-white/20 mb-5" />



                                        <div className="flex items-center justify-between">


                                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400">
                                                ₹{Number(product?.is_discount ? product?.discount_price : product?.price).toLocaleString("en-IN")}
                                            </span>


                                            <Link href={`/product/${product?.unique_id}/?type=${product?.product_type}`} className="group/btn relative overflow-hidden rounded-full bg-white px-6 py-2 transition-all hover:w-32 hover:bg-neutral-200">
                                                <span className="relative z-10 text-xs font-black uppercase tracking-wider text-black flex items-center gap-2">
                                                    Details <ArrowUpRight className="w-3 h-3" />
                                                </span>
                                            </Link>

                                        </div>


                                    </div>


                                </div>


                            </div>


                        </motion.div>

                    ))}

                </div>

            </div>

        </section>

    );

}
