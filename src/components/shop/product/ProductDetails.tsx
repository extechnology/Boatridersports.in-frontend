"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { BikeProduct, AccessoryProduct } from "@/types/product";
import { ProductVideo } from "./ProductVideo";
import { ProductPosterSlider } from "./ProductPosterSlider";



// Props types
interface ProductDetailsProps {
    product: BikeProduct | AccessoryProduct;
    activeAccordion: string | null;
    toggleAccordion: (value: string) => void;
}




export function ProductDetails({ product, activeAccordion, toggleAccordion }: ProductDetailsProps) {


    const isBike = product?.product_type === "bike";


    const videoId = isBike ? product?.youtube_video_id : null;
    const posters = isBike ? product?.bike_posters : [];
    const specs = isBike ? product?.bike_spec_labels : [];
    const downloads = isBike ? product?.bike_downloads : [];



    return (


        <div className="flex flex-col gap-3 lg:gap-5">



            {/* 1. Detailed Description */}
            <div className="space-y-2 px-2 sm:px-5 pb-3">
                <h2 className="text-xl sm:text-3xl font-black text-zinc-900 dark:text-white">Overview</h2>
                <p className="text-sm sm:text-md text-zinc-600 dark:text-zinc-300 leading-relaxed text-justify">
                    {product?.description}
                </p>
            </div>



            {/* 2. Video Section (if available) */}
            {videoId && (
                <div>
                    <ProductVideo videoId={videoId} />
                </div>
            )}



            {/* 3. Product Posters Slider (if available) */}
            {posters?.length > 0 && (
                <div className="px-1 sm:px-2">
                    <ProductPosterSlider posters={posters?.map(p => ({ image: p?.poster, title: p?.title, description: p?.description }))} />
                </div>
            )}



            {/* 3. Specs Accordion */}
            <div className="space-y-1 px-3 sm:px-5">


                {/* Technical Specs */}
                {specs?.length > 0 && (

                    <div className="border-b border-zinc-200 dark:border-zinc-800">

                        <button
                            onClick={() => toggleAccordion("specs")}
                            className="w-full flex items-center justify-between py-6 text-left px-2 -mx-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors hover:cursor-pointer"
                        >

                            <span className="font-bold text-xl sm:text-2xl text-zinc-900 dark:text-white">
                                Technical Specifications
                            </span>

                            <ChevronDown
                                className={cn(
                                    "w-6 h-6 transition-transform duration-300",
                                    activeAccordion === "specs" && "rotate-180"
                                )}
                            />

                        </button>


                        <AnimatePresence initial={false}>

                            {activeAccordion === "specs" && (

                                <motion.div
                                    key="specs"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >

                                    <div className="pb-8 space-y-10">

                                        {specs?.map((spec) => (

                                            <div
                                                key={spec?.label}
                                                className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-12 border-b border-zinc-200 dark:border-zinc-800 pb-6"
                                            >

                                                {/* Spec Label */}
                                                <h4 className="font-bold text-lg text-zinc-900 dark:text-white">
                                                    {spec?.label}
                                                </h4>


                                                {/* Spec Values */}
                                                <div className="space-y-4">
                                                    {spec?.bike_spec_values?.map((item) => (
                                                        <div key={item?.name}>
                                                            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                                                                {item?.name}
                                                            </p>
                                                            <p className="text-base font-medium text-zinc-900 dark:text-zinc-200 leading-relaxed">
                                                                {item?.value}
                                                            </p>
                                                        </div>
                                                    ))}

                                                </div>

                                            </div>

                                        ))}

                                    </div>

                                </motion.div>

                            )}

                        </AnimatePresence>

                    </div>

                )}



                {/* Downloads */}
                {downloads?.length > 0 && (


                    <div className="border-b border-zinc-200 dark:border-zinc-800">


                        <button
                            onClick={() => toggleAccordion('downloads')}
                            className="w-full flex items-center justify-between py-6 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors px-2 -mx-2 rounded-lg hover:cursor-pointer"
                        >
                            <span className="font-bold text-xl sm:text-2xl text-zinc-900 dark:text-white">Manuals & Downloads</span>
                            <ChevronDown className={cn("w-6 h-6 transition-transform duration-300", activeAccordion === 'downloads' ? "rotate-180" : "")} />
                        </button>


                        <AnimatePresence>

                            {activeAccordion === 'downloads' && (

                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >

                                    <div className="pb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {downloads?.length > 0 ? downloads?.map((dl, idx) => (
                                            <a key={idx} download={dl?.file} href={dl?.file} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-white transition-colors group bg-white dark:bg-zinc-900">
                                                <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                                                    <Download className="w-5 h-5" />
                                                </div>
                                                <span className="text-sm font-bold text-zinc-900 dark:text-white line-clamp-2">{dl?.title}</span>
                                            </a>
                                        )) : (
                                            <p className="text-zinc-500 italic">No downloads available.</p>
                                        )}
                                    </div>

                                </motion.div>

                            )}

                        </AnimatePresence>

                    </div>

                )}


            </div>


        </div>

    );

}
