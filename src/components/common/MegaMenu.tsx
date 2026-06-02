'use client';

import { useState, useEffect } from 'react';
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


    const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);



    // Get Navbar Data
    const { data: navbarData, isLoading, isError, refetch } = useGetNavbarData();




    // Helper to process data based on activeDropdown
    const getDropdownData = (category: string): SubCategory[] => {

        if (!navbarData) return [];

        const categoryData = category === 'Bikes' ? navbarData?.bikes : navbarData?.accessories;

        if (!categoryData) return [];

        return categoryData?.map((cat) => ({
            title: cat?.title,
            href: `/shop/${category?.toLowerCase()}?category=${encodeURIComponent(cat?.title)}`,
            image: cat?.image || '',
            items: cat?.items || [],
        }));

    };



    // Get current categories based on activeDropdown
    const currentCategories = activeDropdown ? getDropdownData(activeDropdown) : [];



    // Reset selected subcategory when main dropdown changes
    useEffect(() => {
        if (activeDropdown && currentCategories.length > 0) {
            setSelectedSubCategory(currentCategories[0]);
        } else {
            setSelectedSubCategory(null);
        }
    }, [activeDropdown]);



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
                        "max-w-7xl h-[88vh] mx-auto absolute top-16 left-0 right-0 border rounded-xl shadow-xl hidden lg:block overflow-hidden overflow-x-hidden",
                        isDark
                            ? "bg-black border-zinc-800 backdrop-blur-xl"
                            : "bg-white border-gray-100"
                    )}
                >


                    <div className="w-full h-full mx-auto px-8 py-8 overflow-hidden">


                        <div className="grid grid-cols-4 gap-8 h-full">


                            {isLoading ? (
                                <>

                                    <div className={cn(
                                        "col-span-1 border-r pr-6 h-full flex flex-col",
                                        isDark ? "border-zinc-800" : "border-gray-200"
                                    )}>

                                        <Skeleton className="h-4 w-32 mb-8 opacity-50" />

                                        <div className="space-y-3">
                                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <Skeleton className="h-10 w-full rounded-xl" />
                                                </div>
                                            ))}
                                        </div>

                                    </div>

                                    <div className="col-span-3 space-y-8">

                                        <div className="relative">
                                            <Skeleton className="w-full h-50 rounded-2xl" />
                                            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent rounded-2xl" />
                                        </div>

                                        <div className="grid grid-cols-4 gap-5">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div key={i} className="space-y-3">
                                                    <Skeleton className="aspect-4/3 w-full rounded-2xl" />
                                                    <Skeleton className="h-4 w-3/4 rounded-full" />
                                                    <Skeleton className="h-3 w-1/2 rounded-full opacity-60" />
                                                </div>
                                            ))}
                                        </div>

                                    </div>

                                </>

                            ) : isError ? (

                                <div className="col-span-4 flex flex-col items-center justify-center h-full py-16 px-4">

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
                                            We're having trouble reaching our servers. Please check your connection and try again.
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
                                        "col-span-1 border-r pr-6 h-full flex flex-col",
                                        isDark ? "border-zinc-800" : "border-gray-200"
                                    )}>


                                        <h3 className={cn(
                                            "text-sm font-semibold uppercase tracking-wider mb-6 shrink-0",
                                            isDark ? "text-zinc-500" : "text-gray-400"
                                        )}>
                                            {activeDropdown} Categories
                                        </h3>


                                        <ul className="space-y-2 overflow-y-auto flex-1 pr-2 thin-scroll">

                                            {currentCategories?.map((cat) => (

                                                <li
                                                    key={cat?.title}
                                                    onMouseEnter={() => setSelectedSubCategory(cat)}
                                                    className="cursor-pointer"
                                                >

                                                    <div
                                                        className={cn(
                                                            "flex items-center justify-between p-3 rounded-lg transition-all duration-200",
                                                            selectedSubCategory?.title === cat?.title
                                                                ? (isDark ? "bg-zinc-900 text-white pl-5" : "bg-gray-50 text-red-600 pl-5")
                                                                : (isDark ? "text-zinc-400 hover:bg-zinc-900 hover:text-white hover:pl-4" : "text-gray-900 hover:bg-gray-50 hover:pl-4")
                                                        )}
                                                    >

                                                        <span className="text-lg font-medium">{cat?.title}</span>

                                                        {selectedSubCategory?.title === cat?.title && (
                                                            <ChevronRight className={cn("w-4 h-4", isDark ? "text-white" : "text-red-600")} />
                                                        )}

                                                    </div>

                                                </li>

                                            ))}

                                        </ul>

                                    </div>



                                    {/* ================= RIGHT : CONTENT ================= */}
                                    <div className="col-span-3 h-full overflow-y-auto overflow-x-hidden pr-4 thin-scroll">


                                        <AnimatePresence mode="wait">


                                            {selectedSubCategory && (


                                                <motion.div
                                                    layout="position"
                                                    key={selectedSubCategory?.title}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="space-y-8 min-h-full"
                                                >


                                                    {/* ===== HERO ===== */}
                                                    <div className="relative w-full h-50 rounded-2xl overflow-hidden shadow-sm">


                                                        <img
                                                            src={selectedSubCategory?.image}
                                                            alt={selectedSubCategory?.title}
                                                            loading="lazy"
                                                            className="absolute inset-0 w-full h-full object-cover"
                                                        />


                                                        <div className="absolute inset-0 bg-black/40" />


                                                        <div className="absolute bottom-6 left-8 text-white">


                                                            <h2 className="text-3xl font-bold">
                                                                {selectedSubCategory?.title}
                                                            </h2>


                                                            <Link
                                                                href={selectedSubCategory?.href}
                                                                className={cn(
                                                                    "text-sm font-medium underline decoration-1 underline-offset-4 transition-colors mt-2 inline-block",
                                                                    isDark ? "hover:text-zinc-300" : "hover:text-red-400"
                                                                )}
                                                                onClick={() => setActiveDropdown(null)}
                                                            >
                                                                View All {selectedSubCategory?.title}
                                                            </Link>


                                                        </div>


                                                    </div>



                                                    {/* ===== MEGA MENU PRODUCT GRID ===== */}
                                                    <div className="grid grid-cols-4 gap-5">


                                                        {selectedSubCategory?.items?.length > 0 ? (


                                                            selectedSubCategory?.items?.map((item, idx) => (


                                                                <motion.div
                                                                    key={item?.unique_id}
                                                                    initial={{ opacity: 0, y: 24, scale: 0.96 }}
                                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                    transition={{
                                                                        delay: idx * 0.05,
                                                                        duration: 0.5,
                                                                        ease: 'easeOut',
                                                                    }}
                                                                    whileHover="hover"
                                                                    className="group relative cursor-pointer"
                                                                >


                                                                    <Link href={`/product/${item?.unique_id}?type=${item?.product_type}`} onClick={() => setActiveDropdown(null)}>


                                                                        <div className={cn(
                                                                            "relative overflow-hidden rounded-2xl backdrop-blur-md border",
                                                                            isDark
                                                                                ? "bg-zinc-900/50 border-zinc-800"
                                                                                : "bg-white/60 border-gray-200"
                                                                        )}>


                                                                            <div className="absolute inset-0 bg-linear-to-br from-black/5 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition duration-500" />


                                                                            <motion.div
                                                                                variants={{ hover: { scale: 1.08 } }}
                                                                                transition={{ duration: 1.2, ease: 'easeOut' }}
                                                                                className="relative aspect-4/3 overflow-hidden"
                                                                            >


                                                                                {item?.image ? (


                                                                                    <img
                                                                                        src={Array.isArray(item?.image) ? item?.image[0] : item?.image}
                                                                                        alt={item?.name}
                                                                                        loading="lazy"
                                                                                        className="h-full w-full object-cover"
                                                                                    />


                                                                                ) : (


                                                                                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                                                                                        No Image
                                                                                    </div>


                                                                                )}


                                                                            </motion.div>



                                                                            <div className="p-4">


                                                                                <h4 className={cn(
                                                                                    "text-sm font-medium tracking-tight transition line-clamp-1",
                                                                                    isDark
                                                                                        ? "text-zinc-200 group-hover:text-white"
                                                                                        : "text-gray-900 group-hover:text-black"
                                                                                )}>
                                                                                    {item?.name}
                                                                                </h4>


                                                                                {item?.price && (
                                                                                    <p className={cn(
                                                                                        "mt-1 text-sm",
                                                                                        isDark ? "text-zinc-500" : "text-gray-500"
                                                                                    )}>
                                                                                        ₹{item?.is_discound ? item?.discount_price?.toLocaleString() : item?.price?.toLocaleString()}
                                                                                    </p>
                                                                                )}

                                                                                <div className={cn(
                                                                                    "mt-3 h-px w-6 transition-all duration-500",
                                                                                    isDark ? "bg-zinc-700 group-hover:w-28 group-hover:bg-white" : "bg-gray-300 group-hover:w-28"
                                                                                )} />

                                                                            </div>

                                                                        </div>

                                                                    </Link>

                                                                </motion.div>

                                                            ))


                                                        ) : (

                                                            <div className="col-span-4 flex flex-col items-center justify-center py-20 px-4">
                                                                <motion.div
                                                                    initial={{ y: 20, opacity: 0 }}
                                                                    animate={{ y: 0, opacity: 1 }}
                                                                    className="flex flex-col items-center text-center max-w-xs"
                                                                >
                                                                    <div className={cn(
                                                                        "mb-6 relative",
                                                                        isDark ? "text-zinc-800" : "text-gray-100"
                                                                    )}>
                                                                        <PackageSearch className="w-24 h-24 stroke-[1.5]" />
                                                                        <motion.div
                                                                            animate={{
                                                                                y: [0, -8, 0],
                                                                                opacity: [0.5, 1, 0.5]
                                                                            }}
                                                                            transition={{
                                                                                duration: 3,
                                                                                repeat: Infinity,
                                                                                ease: "easeInOut"
                                                                            }}
                                                                            className="absolute -top-2 -right-2"
                                                                        >
                                                                            <Ghost className="w-10 h-10 text-red-500/30" />
                                                                        </motion.div>
                                                                    </div>
                                                                    <h3 className={cn("text-lg font-semibold mb-2", isDark ? "text-zinc-300" : "text-gray-600")}>
                                                                        Empty Category
                                                                    </h3>
                                                                    <p className={cn("text-sm leading-relaxed", isDark ? "text-zinc-500" : "text-gray-400")}>
                                                                        We haven't added any products to {selectedSubCategory.title} yet. Check back soon!
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
