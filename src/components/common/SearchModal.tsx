'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BikeProduct, AccessoryProduct } from '@/types/product';
import { CommonApi } from '@/lib/CommonApi';
import { Skeleton } from '@/components/ui/skeleton';

interface SearchModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const quickCategories = [
    {
        id: 'bikes',
        title: 'Explore All Bikes',
        image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&h=300&fit=crop',
        href: '/shop/bike',
    },
    {
        id: 'accessories',
        title: 'Spares & Accessories',
        image: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=400&h=300&fit=crop',
        href: '/shop/accessories',
    },
    {
        id: 'events',
        title: 'Community Rides & Events',
        image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=400&h=300&fit=crop',
        href: '/events',
    },
    {
        id: 'about',
        title: 'About Boatrider Sports',
        image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400&h=300&fit=crop',
        href: '/about',
    },
];

function getProductImage(item: BikeProduct | AccessoryProduct): string {
    if (item.product_type === 'bike') {
        const bike = item as BikeProduct;
        return bike.featured_image || bike.bike_colors?.[0]?.bike_images?.[0] || '';
    }
    const acc = item as AccessoryProduct;
    if (Array.isArray(acc.accessory_images) && acc.accessory_images.length > 0) {
        const first = acc.accessory_images[0];
        return typeof first === 'string' ? first : first?.image || '';
    }
    return '';
}

export default function SearchModal({ open, onOpenChange }: SearchModalProps) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState<(BikeProduct | AccessoryProduct)[]>([]);

    // Debounce search query
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery.trim());
        }, 300);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    // Live search API query
    useEffect(() => {
        if (!debouncedQuery) {
            setSearchResults([]);
            setIsSearching(false);
            return;
        }

        let isMounted = true;
        setIsSearching(true);

        CommonApi('GET', `/product/products-filtered/?name=${encodeURIComponent(debouncedQuery)}`)
            .then((res: unknown) => {
                if (!isMounted) return;
                const data = res as { results?: (BikeProduct | AccessoryProduct)[] } | (BikeProduct | AccessoryProduct)[];
                const items = Array.isArray((data as { results?: (BikeProduct | AccessoryProduct)[] })?.results)
                    ? (data as { results: (BikeProduct | AccessoryProduct)[] }).results
                    : Array.isArray(data)
                    ? data
                    : [];
                setSearchResults(items);
            })
            .catch(() => {
                if (!isMounted) return;
                setSearchResults([]);
            })
            .finally(() => {
                if (isMounted) setIsSearching(false);
            });

        return () => {
            isMounted = false;
        };
    }, [debouncedQuery]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            onOpenChange(false);
            router.push(`/shop/bike?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => onOpenChange(false)}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-0 left-0 right-0 z-50 mx-auto max-w-7xl mt-4 md:mt-8"
                    >
                        <div className="mx-4 bg-white dark:bg-zinc-950 rounded-3xl shadow-2xl overflow-hidden h-[85vh] flex flex-col border border-zinc-200 dark:border-zinc-800">
                            {/* Search Header */}
                            <div className="p-6 md:p-8 md:pb-5 border-b border-gray-100 dark:border-zinc-800">
                                <div className="flex items-center gap-4">
                                    <form onSubmit={handleSearch} className="flex-1">
                                        <div className="relative">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder="Search bikes, brands, accessories or model..."
                                                autoFocus
                                                className="w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-gray-900 dark:text-white placeholder:text-gray-400 text-base"
                                            />
                                            {isSearching ? (
                                                <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 animate-spin text-gray-400" />
                                            ) : searchQuery ? (
                                                <button
                                                    type="submit"
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-zinc-200 transition-colors"
                                                    aria-label="Submit search"
                                                >
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            ) : null}
                                        </div>
                                    </form>

                                    <button
                                        type="button"
                                        onClick={() => onOpenChange(false)}
                                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-semibold text-base transition-colors px-4 cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="overflow-y-auto p-6 md:p-8 md:pt-4 flex-1 thin-scroll">
                                {/* Loading Skeleton */}
                                {isSearching && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <Skeleton className="h-6 w-36" />
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div key={i} className="rounded-xl border border-gray-200 dark:border-zinc-800 p-3 space-y-3">
                                                    <Skeleton className="aspect-square w-full rounded-lg" />
                                                    <Skeleton className="h-3 w-1/2" />
                                                    <Skeleton className="h-4 w-3/4" />
                                                    <Skeleton className="h-4 w-1/3" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Search Results */}
                                {!isSearching && debouncedQuery && searchResults.length > 0 && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                                                Search Results
                                            </h2>
                                            <p className="text-sm text-gray-500">
                                                {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                                            {searchResults.map((product, index) => {
                                                const imgUrl = getProductImage(product);
                                                const numericPrice = Number(
                                                    product.is_discount && Number(product.discount_price) > 0
                                                        ? product.discount_price
                                                        : product.price
                                                );
                                                const originalPrice =
                                                    product.is_discount && Number(product.discount_price) > 0
                                                        ? Number(product.price)
                                                        : null;

                                                return (
                                                    <motion.div
                                                        key={`${product.product_type}-${product.unique_id}`}
                                                        initial={{ opacity: 0, y: 16 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.04 }}
                                                    >
                                                        <Link
                                                            href={`/product/${product.unique_id}?type=${product.product_type}`}
                                                            onClick={() => onOpenChange(false)}
                                                            className="group block h-full"
                                                        >
                                                            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:shadow-lg hover:border-gray-300 dark:hover:border-zinc-700 transition-all flex flex-col h-full">
                                                                {/* Product Image */}
                                                                <div className="relative aspect-square bg-gray-50 dark:bg-zinc-800/50 overflow-hidden flex items-center justify-center p-3">
                                                                    {imgUrl ? (
                                                                        <img
                                                                            src={imgUrl}
                                                                            alt={product.name}
                                                                            loading="lazy"
                                                                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                                                        />
                                                                    ) : (
                                                                        <span className="text-xs text-gray-400">No Image</span>
                                                                    )}

                                                                    {product.is_discount && Number(product.discount_percentage) > 0 && (
                                                                        <div className="absolute top-2 right-2 bg-emerald-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                                                                            {product.discount_percentage}% OFF
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {/* Product Info */}
                                                                <div className="p-3 flex-1 flex flex-col justify-between">
                                                                    <div>
                                                                        <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold truncate mb-0.5">
                                                                            {product.brand}
                                                                        </p>
                                                                        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 text-xs leading-snug">
                                                                            {product.name}
                                                                        </h3>
                                                                    </div>

                                                                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                                                                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                                                                            ₹{numericPrice.toLocaleString('en-IN')}
                                                                        </span>
                                                                        {originalPrice && (
                                                                            <span className="text-xs text-gray-400 line-through">
                                                                                ₹{originalPrice.toLocaleString('en-IN')}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}

                                {/* No Results */}
                                {!isSearching && debouncedQuery && searchResults.length === 0 && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                                        <Search className="w-16 h-16 text-gray-300 dark:text-zinc-700 mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                            No products found
                                        </h3>
                                        <p className="text-gray-500 text-sm max-w-sm mx-auto">
                                            We couldn&apos;t find any products matching &ldquo;{debouncedQuery}&rdquo;. Try another term.
                                        </p>
                                    </motion.div>
                                )}

                                {/* Default View - Explore by Category */}
                                {!debouncedQuery && (
                                    <div className="space-y-8">
                                        <div>
                                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                                Explore Categories
                                            </h2>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                                                {quickCategories.map((cat, index) => (
                                                    <motion.div
                                                        key={cat.id}
                                                        initial={{ opacity: 0, y: 16 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.05 }}
                                                    >
                                                        <Link
                                                            href={cat.href}
                                                            onClick={() => onOpenChange(false)}
                                                            className="group block"
                                                        >
                                                            <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-3 bg-zinc-100 dark:bg-zinc-800">
                                                                <img
                                                                    src={cat.image}
                                                                    alt={cat.title}
                                                                    loading="lazy"
                                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                                />
                                                                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />
                                                            </div>

                                                            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-red-600 transition-colors text-sm md:text-base">
                                                                {cat.title}
                                                            </h3>
                                                        </Link>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
