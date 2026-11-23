'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useGetNavbarData } from '@/service/product/useProduct';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, RefreshCcw, PackageSearch, Ghost } from 'lucide-react';
import { cn } from '@/lib/utils';



// Props Interface
interface MegaMenuProps {
    activeDropdown: string | null;
    setActiveDropdown: (value: string | null) => void;
    isDark?: boolean;
}




// SubCategory Interface
interface SubCategory {
    title: string;
    href: string;
    image: string;
    items: {
        unique_id: string;
        product_type: "bike" | "accessories";
        name: string;
        image: string | null;
        price: number;
        brand: string | null;
        is_discound: boolean;
        discount_price: number;
        discount_percentage: number;
    }[];
}




export default function MegaMenu({ activeDropdown, setActiveDropdown, isDark = false }: MegaMenuProps) {


    const [selectedTitle, setSelectedTitle] = useState<string | null>(null);



    // Get Navbar Data
    const { data: navbarData, isLoading, isError, refetch } = useGetNavbarData();




    // Helper to process data based on activeDropdown
    const currentCategories = useMemo<SubCategory[]>(() => {
        if (!navbarData || !activeDropdown) return [];

        const categoryData = activeDropdown === 'Bikes' ? navbarData?.bikes : navbarData?.accessories;

        if (!categoryData) return [];

        return categoryData.map((cat) => ({
            title: cat?.title,
            href: `/shop/${activeDropdown.toLowerCase()}?category=${encodeURIComponent(cat?.title)}`,
            image: cat?.image || '',
            items: cat?.items || [],
        }));
    }, [navbarData, activeDropdown]);

    const selectedSubCategory =
        currentCategories.find((c) => c.title === selectedTitle) ||
        currentCategories[0] ||
        null;



    return (


        <AnimatePresence>


            {activeDropdown && (


                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setActiveDropdown(activeDropdown)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className={cn(
                        "max-w-7xl h-[82vh] max-h-[720px] min-h-[500px] mx-auto absolute top-16 left-0 right-0 border rounded-2xl shadow-2xl hidden lg:block overflow-hidden",
                        isDark
                            ? "bg-black border-zinc-800 backdrop-blur-xl"
                            : "bg-white border-gray-100"
                    )}
                >


                    <div className="w-full h-full mx-auto px-6 py-6 xl:px-8 xl:py-8 overflow-hidden">


                        <div className="flex gap-6 xl:gap-8 h-full min-h-0">


                            {isLoading ? (
                                <>

                                    <div className={cn(
                                        "w-72 xl:w-80 shrink-0 border-r pr-4 h-full flex flex-col min-h-0",
                                        isDark ? "border-zinc-800" : "border-gray-100"
                                    )}>

                                        <div className="flex items-center justify-between mb-4">
                                            <Skeleton className="h-4 w-32 opacity-50" />
                                            <Skeleton className="h-4 w-6 rounded-full opacity-50" />
                                        </div>

                                        <div className="space-y-2">
                                            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                                                <Skeleton key={i} className="h-10 w-full rounded-xl" />
                                            ))}
                                        </div>

                                    </div>

                                    <div className="flex-1 min-w-0 space-y-6">

                                        <Skeleton className="w-full h-44 xl:h-48 rounded-2xl" />

                                        <div className="grid grid-cols-3 xl:grid-cols-4 gap-4">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div key={i} className="space-y-3">
                                                    <Skeleton className="aspect-4/3 w-full rounded-xl" />
                                                    <Skeleton className="h-4 w-3/4 rounded-full" />
                                                    <Skeleton className="h-3 w-1/2 rounded-full opacity-60" />
                                                </div>
                                            ))}
                                        </div>

                                    </div>

                                </>

                            ) : isError ? (

                                <div className="flex-1 flex flex-col items-center justify-center h-full py-16 px-4">

                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className={cn(
                                            "relative p-8 rounded-3xl border flex flex-col items-center text-center max-w-md w-full",
                                            isDark ? "bg-zinc-900/50 border-zinc-800" : "bg-gray-50/50 border-gray-100"
                                        )}
                                    >

                                        <div className={cn(
                                            "mb-6 p-4 rounded-2xl",
                                            isDark ? "bg-red-500/10 text-red-400" : "bg-red-50 text-red-500"
                                        )}>
                                            <AlertCircle className="w-10 h-10" />
                                        </div>

                                        <h3 className={cn("text-xl font-bold mb-2", isDark ? "text-white" : "text-gray-900")}>
                                            Connection Lost
                                        </h3>

                                        <p className={cn("text-sm mb-8", isDark ? "text-zinc-500" : "text-gray-500")}>
                                            We&apos;re having trouble reaching our servers. Please check your connection and try again.
                                        </p>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => refetch()}
                                            className="group flex items-center justify-center gap-2 w-full py-4 bg-red-600 text-white font-semibold rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
                                        >
                                            <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                                            Re-establish Connection
                                        </motion.button>

                                    </motion.div>

                                </div>

                            ) : (

                                <>

                                    {/* ================= LEFT : CATEGORY LIST ================= */}
                                    <div className={cn(
                                        "w-72 xl:w-80 shrink-0 border-r pr-4 h-full flex flex-col min-h-0",
                                        isDark ? "border-zinc-800" : "border-gray-100"
                                    )}>


                                        <div className="flex items-center justify-between mb-4 shrink-0 px-1">
                                            <h3 className={cn(
                                                "text-xs font-bold uppercase tracking-wider",
                                                isDark ? "text-zinc-500" : "text-gray-400"
                                            )}>
                                                {activeDropdown} Categories
                                            </h3>
                                            <span className={cn(
                                                "text-[11px] font-semibold px-2 py-0.5 rounded-full",
                                                isDark ? "bg-zinc-800 text-zinc-400" : "bg-gray-100 text-gray-600"
                                            )}>
                                                {currentCategories.length}
                                            </span>
                                        </div>


                                        <ul className="space-y-1 overflow-y-auto flex-1 pr-1.5 thin-scroll min-h-0">

                                            {currentCategories?.map((cat) => {
                                                const isSelected = selectedSubCategory?.title === cat?.title;
                                                return (

                                                    <li
                                                        key={cat?.title}
                                                        onMouseEnter={() => setSelectedTitle(cat?.title)}
                                                        className="cursor-pointer"
                                                    >

                                                        <div
                                                            className={cn(
                                                                "group flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200",
                                                                isSelected
                                                                    ? (isDark ? "bg-zinc-800/80 text-white font-semibold shadow-xs" : "bg-red-50 text-red-600 font-semibold shadow-xs")
                                                                    : (isDark ? "text-zinc-400 hover:bg-zinc-900 hover:text-white" : "text-gray-800 hover:bg-gray-50 hover:text-gray-950")
                                                            )}
                                                        >

                                                            <span className="text-sm font-medium tracking-tight truncate" title={cat?.title}>
                                                                {cat?.title}
                                                            </span>

                                                            <ChevronRight className={cn(
                                                                "w-4 h-4 shrink-0 transition-all duration-200",
                                                                isSelected
                                                                    ? (isDark ? "text-white opacity-100 translate-x-0.5" : "text-red-600 opacity-100 translate-x-0.5")
                                                                    : "opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 text-gray-400"
                                                            )} />

                                                        </div>

                                                    </li>

                                                );
                                            })}

                                        </ul>

                                    </div>



                                    {/* ================= RIGHT : CONTENT ================= */}
                                    <div className="flex-1 min-w-0 h-full overflow-y-auto overflow-x-hidden pr-2 thin-scroll min-h-0">


                                        <AnimatePresence mode="wait">


                                            {selectedSubCategory && (


                                                <motion.div
                                                    layout="position"
                                                    key={selectedSubCategory?.title}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="space-y-6 min-h-full"
                                                >


                                                    {/* ===== HERO ===== */}
                                                    <div className="relative w-full h-44 xl:h-48 rounded-2xl overflow-hidden shadow-sm shrink-0">


                                                        <img
                                                            src={selectedSubCategory?.image}
                                                            alt={selectedSubCategory?.title}
                                                            loading="lazy"
                                                            className="absolute inset-0 w-full h-full object-cover"
                                                        />


                                                        <div className="absolute inset-0 bg-black/40" />


                                                        <div className="absolute bottom-5 left-6 text-white">


                                                            <h2 className="text-2xl xl:text-3xl font-bold">
                                                                {selectedSubCategory?.title}
                                                            </h2>


                                                            <Link
                                                                href={selectedSubCategory?.href}
                                                                className={cn(
                                                                    "text-xs xl:text-sm font-medium underline decoration-1 underline-offset-4 transition-colors mt-1.5 inline-block",
                                                                    isDark ? "hover:text-zinc-300" : "hover:text-red-400"
                                                                )}
                                                                onClick={() => setActiveDropdown(null)}
                                                            >
                                                                View All {selectedSubCategory?.title}
                                                            </Link>


                                                        </div>


                                                    </div>



                                                    {/* ===== MEGA MENU PRODUCT GRID ===== */}
                                                    <div className="grid grid-cols-3 xl:grid-cols-4 gap-4">


                                                        {selectedSubCategory?.items?.length > 0 ? (


                                                            selectedSubCategory?.items?.map((item, idx) => (


                                                                <motion.div
                                                                    key={item?.unique_id}
                                                                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                    transition={{
                                                                        delay: idx * 0.04,
                                                                        duration: 0.35,
                                                                        ease: 'easeOut',
                                                                    }}
                                                                    whileHover="hover"
                                                                    className="group relative cursor-pointer"
                                                                >


                                                                    <Link href={`/product/${item?.unique_id}?type=${item?.product_type}`} onClick={() => setActiveDropdown(null)}>


                                                                        <div className={cn(
                                                                            "relative overflow-hidden rounded-xl backdrop-blur-md border transition-all duration-300",
                                                                            isDark
                                                                                ? "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
                                                                                : "bg-white/80 border-gray-100 hover:border-gray-200 hover:shadow-md"
                                                                        )}>


                                                                            <motion.div
                                                                                variants={{ hover: { scale: 1.05 } }}
                                                                                transition={{ duration: 0.4, ease: 'easeOut' }}
                                                                                className="relative aspect-4/3 overflow-hidden bg-zinc-50 dark:bg-zinc-900/60"
                                                                            >


                                                                                {item?.image ? (


                                                                                    <img
                                                                                        src={Array.isArray(item?.image) ? item?.image[0] : item?.image}
                                                                                        alt={item?.name}
                                                                                        loading="lazy"
                                                                                        className="h-full w-full object-contain p-2"
                                                                                    />


                                                                                ) : (


                                                                                    <div className="flex h-full w-full items-center justify-center text-gray-400 text-xs">
                                                                                        No Image
                                                                                    </div>


                                                                                )}


                                                                            </motion.div>



                                                                            <div className="p-3.5">

                                                                                <h4 className={cn(
                                                                                    "text-xs xl:text-sm font-semibold tracking-tight transition line-clamp-1",
                                                                                    isDark
                                                                                        ? "text-zinc-200 group-hover:text-white"
                                                                                        : "text-gray-900 group-hover:text-black"
                                                                                )}>
                                                                                    {item?.name}
                                                                                </h4>


                                                                                {item?.price && (
                                                                                    <p className={cn(
                                                                                        "mt-1 text-xs xl:text-sm font-bold",
                                                                                        isDark ? "text-zinc-400" : "text-gray-900"
                                                                                    )}>
                                                                                        ₹{item?.is_discound ? item?.discount_price?.toLocaleString() : item?.price?.toLocaleString()}
                                                                                    </p>
                                                                                )}

                                                                            </div>

                                                                        </div>

                                                                    </Link>

                                                                </motion.div>

                                                            ))


                                                        ) : (

                                                            <div className="col-span-3 xl:col-span-4 flex flex-col items-center justify-center py-16 px-4">
                                                                <motion.div
                                                                    initial={{ y: 16, opacity: 0 }}
                                                                    animate={{ y: 0, opacity: 1 }}
                                                                    className="flex flex-col items-center text-center max-w-xs"
                                                                >
                                                                    <div className={cn(
                                                                        "mb-4 relative",
                                                                        isDark ? "text-zinc-800" : "text-gray-100"
                                                                    )}>
                                                                        <PackageSearch className="w-20 h-20 stroke-[1.5]" />
                                                                        <motion.div
                                                                            animate={{
                                                                                y: [0, -6, 0],
                                                                                opacity: [0.5, 1, 0.5]
                                                                            }}
                                                                            transition={{
                                                                                duration: 3,
                                                                                repeat: Infinity,
                                                                                ease: "easeInOut"
                                                                            }}
                                                                            className="absolute -top-2 -right-2"
                                                                        >
                                                                            <Ghost className="w-8 h-8 text-red-500/30" />
                                                                        </motion.div>
                                                                    </div>
                                                                    <h3 className={cn("text-base font-semibold mb-1", isDark ? "text-zinc-300" : "text-gray-700")}>
                                                                        Empty Category
                                                                    </h3>
                                                                    <p className={cn("text-xs leading-relaxed", isDark ? "text-zinc-500" : "text-gray-400")}>
                                                                        We haven&apos;t added any products to {selectedSubCategory?.title} yet. Check back soon!
                                                                    </p>
                                                                </motion.div>
                                                            </div>

                                                        )}

                                                    </div>

                                                </motion.div>

                                            )}

                                        </AnimatePresence>

                                    </div>

                                </>
                            )}
                        </div>

                    </div>

                </motion.div>

            )}

        </AnimatePresence>

    );


}
