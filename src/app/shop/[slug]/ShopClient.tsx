"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import FilterSidebar from "@/components/shop/FilterSidebar";
import ProductGrid from "@/components/shop/ProductGrid";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { AccessoryProduct, BikeProduct } from "@/types/product";
import { useGetFliterSidebar } from "@/service/product/useProduct";
import FilterSidebarSkeleton from "@/components/loaders/FilterSidebarSkelton";
import FilterSidebarError from "@/components/loaders/FilterSidebarError";
import FilterGlobalLoader from "@/components/loaders/FilterGlobalLoader";
import { cn } from "@/lib/utils";
import EmptyProducts from "@/components/shop/EmptyProducts";




// ------------------ Props ------------------ //
interface ShopClientProps {
    products: (BikeProduct | AccessoryProduct)[];
    type: "bike" | "accessories";
    totalCount: number;
    currentPage: number;
    totalpages: number;
}




export default function ShopClient({ products, type, totalCount, currentPage, totalpages }: ShopClientProps) {


    // Navigation
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();



    // State variables
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [isPending, startTransition] = useTransition();



    // Get Filter Sidebar
    const { data: filterData, isLoading, isError, refetch } = useGetFliterSidebar(type);



    // Sort By
    const sortBy = searchParams.get("special_tag") || "All";



    /** ---------- URL HELPERS ---------- */
    const updateURL = (params: URLSearchParams, scroll = false) => {
        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`, { scroll });
        });
    };



    // Toggle Param
    const toggleParam = (key: string, value: string) => {


        const params = new URLSearchParams(searchParams.toString());


        const current = params.get(key)?.split(",").filter(Boolean) ?? [];


        params.delete("page");


        const set = new Set(current);
        set.has(value) ? set.delete(value) : set.add(value);


        if (set.size === 0) {
            params.delete(key);
        } else {
            params.set(key, Array.from(set).join(","));
        }

        updateURL(params);

    };




    // Set price range
    const setRange = (minKey: string, maxKey: string, min: number, max: number) => {

        const params = new URLSearchParams(searchParams.toString());

        params.set(minKey, String(min));

        params.set(maxKey, String(max));

        params.delete("page");

        updateURL(params);

    };




    // Handle sort change
    const handleSortChange = (value: string) => {

        const params = new URLSearchParams(searchParams.toString());

        if (value === "All") {
            params.delete("special_tag");
        } else {
            params.set("special_tag", value);
        }

        updateURL(params);

    };



    // Clear all filters
    const clearAllFilters = () => {

        router.push(pathname);

    };



    // Handle page change
    const handlePageChange = (page: number) => {

        if (page < 1 || page > totalpages) return;

        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());

        updateURL(params, true);

    };



    /** ---------- PAGINATION LOGIC ---------- */
    const getPageNumbers = () => {

        const pages = [];
        const showMax = 5; // Max buttons to show

        if (totalpages <= showMax) {

            for (let i = 1; i <= totalpages; i++) pages.push(i);

        } else {

            // Always show first
            pages.push(1);

            if (currentPage > 3) pages.push("ellipsis-1");

            // middle range
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalpages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                if (!pages.includes(i)) pages.push(i);
            }

            if (currentPage < totalpages - 2) pages.push("ellipsis-2");

            // Always show last
            if (!pages.includes(totalpages)) pages.push(totalpages);

        }

        return pages;

    };





    return (


        <div className="min-h-screen bg-white dark:bg-black font-sans text-zinc-900 dark:text-zinc-100">


            <div className="container mx-auto px-4 py-16">


                <div className="flex flex-col lg:flex-row gap-4 relative">


                    {/* Mobile Actions Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 lg:hidden sticky top-4 z-40 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl ring-1 ring-black/5">


                        <Button
                            variant="default"
                            size="lg"
                            onClick={() => setIsMobileFilterOpen(true)}
                            className="gap-2 bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black rounded-full"
                        >

                            <SlidersHorizontal className="w-4 h-4" />
                            Filters

                        </Button>


                        <div className="flex items-center gap-3">

                            <Select value={sortBy} onValueChange={handleSortChange}>

                                <SelectTrigger className="w-40 h-11 rounded-full border-zinc-200 bg-transparent">

                                    <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide">
                                        <ArrowUpDown className="w-3 h-3" />
                                        Sort
                                    </span>

                                </SelectTrigger>

                                <SelectContent>

                                    <SelectItem value="All">All</SelectItem>
                                    {filterData?.special_tags?.map(option => (
                                        <SelectItem key={option} value={option}>
                                            {option}
                                        </SelectItem>
                                    ))}

                                </SelectContent>

                            </Select>

                        </div>

                    </div>


                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-80 shrink-0 sticky top-16 h-[calc(100vh-6rem)]">

                        <div className="flex h-full flex-col bg-white dark:bg-zinc-900">

                            <div className="flex items-center justify-between px-4 py-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
                                <h2 className="text-lg font-bold flex items-center gap-2 tracking-tight">
                                    <Filter className="w-5 h-5" /> Filters
                                </h2>
                                <span className="text-xs font-bold bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md text-zinc-500">
                                    {totalCount} Items
                                </span>
                            </div>

                            <div className="flex-1 overflow-y-auto">

                                {isLoading && <FilterSidebarSkeleton className="w-full lg:w-[320px]" />}

                                {isError && (
                                    <FilterSidebarError onRetry={() => refetch()} />
                                )}

                                {filterData && (

                                    <FilterSidebar
                                        className="p-2"
                                        categoriesData={filterData}
                                        searchParams={searchParams}
                                        onToggle={toggleParam}
                                        onSetRange={setRange}
                                        onClearAll={clearAllFilters}
                                    />

                                )}

                            </div>

                        </div>

                    </aside>



                    {/* Mobile Filter Drawer */}
                    <AnimatePresence>

                        {isMobileFilterOpen && (

                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setIsMobileFilterOpen(false)}
                                    className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 lg:hidden"
                                />

                                <motion.div
                                    initial={{ x: "100%" }}
                                    animate={{ x: 0 }}
                                    exit={{ x: "100%" }}
                                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                    className="fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-zinc-900 shadow-2xl z-50 lg:hidden overflow-hidden"
                                >

                                    {isLoading && <FilterSidebarSkeleton className="w-full lg:w-[320px]" />}

                                    {isError && (
                                        <FilterSidebarError onRetry={() => refetch()} />
                                    )}

                                    {filterData && (

                                        <FilterSidebar
                                            className="p-2"
                                            categoriesData={filterData}
                                            searchParams={searchParams}
                                            onToggle={toggleParam}
                                            onSetRange={setRange}
                                            onClearAll={clearAllFilters}
                                        />

                                    )}

                                </motion.div>

                            </>

                        )}

                    </AnimatePresence>




                    {/* Main Content */}
                    <main className="flex-1 mt-4">


                        {/* Desktop Sort */}
                        <div className="hidden lg:flex items-center justify-between mb-5">
                            <p className="text-sm font-medium text-zinc-500">
                                Showing <span className="text-black dark:text-white font-bold">{products.length}</span> results
                            </p>
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-zinc-500">Sort by:</span>
                                <Select value={sortBy} onValueChange={handleSortChange} >
                                    <SelectTrigger className="w-45 bg-transparent border-zinc-200 dark:border-zinc-800 rounded-full">
                                        <SelectValue placeholder="Featured" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="All">All</SelectItem>
                                        {filterData?.special_tags?.map(option => (
                                            <SelectItem key={option} value={option}>
                                                {option}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>


                        {/* Product Grid */}
                        <ProductGrid products={products} />


                        {/* Pagination */}
                        {totalCount > 0 && totalpages > 1 && (

                            <div className="mt-12 flex flex-col items-center gap-6">

                                <Pagination>

                                    <PaginationContent className="gap-2 sm:gap-3">

                                        <PaginationItem>
                                            <PaginationPrevious
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                className={cn(
                                                    "h-10 w-10 sm:w-auto sm:px-4 rounded-xl border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all",
                                                    currentPage === 1 ? "pointer-events-none opacity-40" : "cursor-pointer"
                                                )}
                                            />
                                        </PaginationItem>

                                        {getPageNumbers().map((page, idx) => (
                                            <PaginationItem key={idx}>
                                                {page === "ellipsis-1" || page === "ellipsis-2" ? (
                                                    <PaginationEllipsis className="text-zinc-400" />
                                                ) : (
                                                    <PaginationLink
                                                        onClick={() => handlePageChange(page as number)}
                                                        isActive={currentPage === page}
                                                        className={cn(
                                                            "h-10 w-10 rounded-xl transition-all cursor-pointer font-bold",
                                                            currentPage === page
                                                                ? "bg-black text-white dark:bg-white dark:text-black shadow-lg shadow-black/10 dark:shadow-white/10 hover:bg-zinc-800 dark:hover:bg-zinc-200"
                                                                : "border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                                                        )}
                                                    >
                                                        {page}
                                                    </PaginationLink>
                                                )}
                                            </PaginationItem>
                                        ))}

                                        <PaginationItem>
                                            <PaginationNext
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                className={cn(
                                                    "h-10 w-10 sm:w-auto sm:px-4 rounded-xl border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all",
                                                    currentPage === totalpages ? "pointer-events-none opacity-40" : "cursor-pointer"
                                                )}
                                            />
                                        </PaginationItem>

                                    </PaginationContent>

                                </Pagination>

                                <div className="text-xs font-bold uppercase tracking-widest text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50 px-4 py-2 rounded-full border border-zinc-100 dark:border-zinc-800">
                                    Page {currentPage} of {totalpages}
                                </div>

                            </div>

                        )}



                        {products.length === 0 && (
                            <div className="mt-20">
                                <EmptyProducts onClearFilters={clearAllFilters} />
                            </div>
                        )}


                    </main>
                </div>
            </div>


            {/* Global Loading Overlay */}
            {isPending && <FilterGlobalLoader text="Applying Filters…" />}


        </div>
    );
}
