"use client";

import { useState, useTransition, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, SlidersHorizontal, ArrowUpDown, Search, X } from "lucide-react";
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
import {
    ACCESSORY_FILTER_ARRAY_KEYS,
    BIKE_FILTER_ARRAY_KEYS,
    FILTER_PARAM_LABELS,
    formatFilterPrice,
    getParamValues,
} from "@/lib/accessoriesFilter";




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



    // Accessory search & Sort state
    const isAccessories = type === "accessories";
    const sortBy = searchParams.get("special_tag") || "All";
    const urlSearchName = searchParams.get("name") || "";
    const [searchInputState, setSearchInputState] = useState({
        syncedName: urlSearchName,
        text: urlSearchName,
        immediate: false,
    });
    const searchValue =
        searchInputState.syncedName === urlSearchName
            ? searchInputState.text
            : urlSearchName;



    /** ---------- URL HELPERS ---------- */
    const updateURL = (params: URLSearchParams, scroll = false) => {
        const qs = params.toString();
        startTransition(() => {
            router.push(qs ? `${pathname}?${qs}` : pathname, { scroll });
        });
    };



    const applySearch = (rawQuery: string) => {
        const trimmed = rawQuery.trim();
        setSearchInputState({ syncedName: urlSearchName, text: trimmed, immediate: true });
        const params = new URLSearchParams(searchParams.toString());
        params.delete("page");
        if (trimmed) {
            params.set("name", trimmed);
        } else {
            params.delete("name");
        }
        updateURL(params);
    };

    const handleSearchInputChange = (nextValue: string) => {
        setSearchInputState({ syncedName: urlSearchName, text: nextValue, immediate: false });
    };

    useEffect(() => {
        if (!isAccessories || searchInputState.immediate) return;
        if (searchInputState.syncedName !== urlSearchName) return;

        const trimmed = searchInputState.text.trim();
        if (trimmed === urlSearchName.trim()) return;

        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            params.delete("page");
            if (trimmed) {
                params.set("name", trimmed);
            } else {
                params.delete("name");
            }
            const qs = params.toString();
            startTransition(() => {
                router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
            });
        }, 450);

        return () => clearTimeout(timer);
    }, [isAccessories, searchInputState, urlSearchName, searchParams, pathname, router]);



    // Toggle Param (writes repeating query params & resets pagination to page 1)
    const toggleParam = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const current = getParamValues(searchParams, key);

        params.delete("page");

        const set = new Set(current);
        if (set.has(value)) {
            set.delete(value);
        } else {
            set.add(value);
        }

        params.delete(key);
        set.forEach((v) => params.append(key, v));

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

    const clearPriceRange = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("min_price");
        params.delete("max_price");
        params.delete("page");
        updateURL(params);
    };




    // Handle sort change
    const handleSortChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("page");

        if (value === "All") {
            params.delete("special_tag");
        } else {
            params.set("special_tag", value);
        }

        updateURL(params);
    };



    // Clear all filters
    const clearAllFilters = () => {
        setSearchInputState({ syncedName: "", text: "", immediate: true });
        startTransition(() => {
            router.push(pathname);
        });
    };



    // Build active filter pills for display above the grid
    const activeKeys = isAccessories ? ACCESSORY_FILTER_ARRAY_KEYS : BIKE_FILTER_ARRAY_KEYS;
    const activeFilterPills: Array<{
        id: string;
        label: string;
        value: string;
        onRemove: () => void;
    }> = [];

    if (urlSearchName.trim()) {
        activeFilterPills.push({
            id: "search-name",
            label: "Search",
            value: urlSearchName.trim(),
            onRemove: () => applySearch(""),
        });
    }

    for (const key of activeKeys) {
        for (const val of getParamValues(searchParams, key)) {
            activeFilterPills.push({
                id: `${key}:${val}`,
                label: FILTER_PARAM_LABELS[key] || key,
                value: val,
                onRemove: () => toggleParam(key, val),
            });
        }
    }

    if (searchParams.has("min_price") || searchParams.has("max_price")) {
        const fallbackMin = filterData?.mrp_range?.min_price ?? 0;
        const fallbackMax =
            filterData?.mrp_range?.max_price ?? (isAccessories ? 50000 : 600000);
        const minVal =
            searchParams.get("min_price") !== null
                ? Number(searchParams.get("min_price"))
                : fallbackMin;
        const maxVal =
            searchParams.get("max_price") !== null
                ? Number(searchParams.get("max_price"))
                : fallbackMax;

        activeFilterPills.push({
            id: "price-range",
            label: "Price",
            value: `${formatFilterPrice(minVal)} - ${formatFilterPrice(maxVal)}`,
            onRemove: clearPriceRange,
        });
    }



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
                            {activeFilterPills.length > 0 && (
                                <span className="ml-1 inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-[11px] font-bold bg-white text-black dark:bg-black dark:text-white">
                                    {activeFilterPills.length}
                                </span>
                            )}

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
                                            onClose={() => setIsMobileFilterOpen(false)}
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


                        {/* Accessory Search + Sort Toolbar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
                                {isAccessories && (
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            applySearch(searchValue);
                                        }}
                                        className="relative w-full sm:max-w-md"
                                    >
                                        <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        <input
                                            type="text"
                                            value={searchValue}
                                            onChange={(e) => handleSearchInputChange(e.target.value)}
                                            placeholder="Search spares, model name or model no..."
                                            aria-label="Search accessories"
                                            className="w-full h-10 pl-10 pr-9 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/15 dark:focus:ring-white/20 transition"
                                        />
                                        {searchValue && (
                                            <button
                                                type="button"
                                                onClick={() => applySearch("")}
                                                aria-label="Clear search"
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </form>
                                )}

                                <p className="text-sm font-medium text-zinc-500 whitespace-nowrap">
                                    Showing <span className="text-black dark:text-white font-bold">{products.length}</span>
                                    {totalCount > products.length && (
                                        <> of <span className="text-black dark:text-white font-bold">{totalCount}</span></>
                                    )}{" "}
                                    results
                                </p>
                            </div>

                            <div className="hidden lg:flex items-center gap-3 shrink-0">
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


                        {/* Active Filter Tags */}
                        {activeFilterPills.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2 mb-5 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800">
                                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 mr-1">
                                    Active:
                                </span>

                                {activeFilterPills.map((pill) => (
                                    <button
                                        key={pill.id}
                                        type="button"
                                        onClick={pill.onRemove}
                                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:border-red-400 dark:hover:border-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
                                    >
                                        <span className="text-zinc-400">{pill.label}:</span>
                                        <span className="font-semibold">{pill.value}</span>
                                        <X className="w-3.5 h-3.5 ml-0.5" />
                                    </button>
                                ))}

                                <button
                                    type="button"
                                    onClick={clearAllFilters}
                                    className="ml-auto text-xs font-bold text-red-600 dark:text-red-400 hover:underline px-2 py-1 cursor-pointer"
                                >
                                    Clear All
                                </button>
                            </div>
                        )}


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
