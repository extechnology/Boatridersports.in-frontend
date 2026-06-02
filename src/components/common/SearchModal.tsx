'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { products } from '@/data/shop-data';



interface SearchModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}




// Category Data
const categories = [
    {
        id: 'electric',
        title: 'Shop Electric Bikes',
        image: 'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=400&h=300&fit=crop',
        href: '/shop?category=electric'
    },
    {
        id: 'road',
        title: 'Shop Road Bikes',
        image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&h=300&fit=crop',
        href: '/shop?category=road'
    },
    {
        id: 'mountain',
        title: 'Shop Mountain Bikes',
        image: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=400&h=300&fit=crop',
        href: '/shop?category=mountain'
    },
    {
        id: 'city',
        title: 'Shop City Bikes',
        image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400&h=300&fit=crop',
        href: '/shop?category=city'
    }
];




export default function SearchModal({ open, onOpenChange }: SearchModalProps) {


    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<typeof products>([]);


    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        const query = searchQuery.toLowerCase();
        const filtered = products.filter(
            (product) =>
                product.title.toLowerCase().includes(query) ||
                product.brand.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
        );
        setSearchResults(filtered);
    }, [searchQuery]);



    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
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

                        <div className="mx-4 bg-white rounded-3xl shadow-2xl overflow-hidden h-[85vh] flex flex-col">


                            {/* Search Header */}
                            <div className="p-6 md:p-8 md:pb-5 border-b border-gray-100">

                                <div className="flex items-center gap-4">

                                    <form onSubmit={handleSearch} className="flex-1">

                                        <div className="relative">

                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder="Search for bikes, brands, or categories..."
                                                autoFocus
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400 text-base"
                                            />

                                            {searchQuery && (
                                                <button
                                                    type="submit"
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                                                >
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </form>

                                    <button
                                        onClick={() => onOpenChange(false)}
                                        className="text-gray-600 hover:text-gray-900 font-semibold text-base transition-colors px-4"
                                    >
                                        Cancel
                                    </button>

                                </div>

                            </div>


                            {/* Content */}
                            <div className="overflow-y-auto p-6 md:p-8 md:pt-4 flex-1">

                                {/* Search Results */}
                                {searchQuery && searchResults.length > 0 && (

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="space-y-6"
                                    >

                                        <div className="flex items-center justify-between">

                                            <h2 className="text-2xl font-bold text-gray-900">
                                                Search Results
                                            </h2>

                                            <p className="text-gray-600 italic">
                                                {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
                                            </p>

                                        </div>


                                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4">

                                            {searchResults.map((product, index) => (

                                                <motion.div
                                                    key={product.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                >

                                                    <Link
                                                        href={`/product/${product.id}?type=${product.product_type}`}
                                                        onClick={() => onOpenChange(false)}
                                                        className="group block"
                                                    >

                                                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all">

                                                            {/* Product Image */}
                                                            <div className="relative aspect-square bg-gray-50 overflow-hidden">

                                                                <img
                                                                    src={product.image[0]}
                                                                    alt={product.title}
                                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                                />

                                                                {product.discountPercent && (
                                                                    <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-2xl text-xs font-bold">
                                                                        {product.discountPercent}% OFF
                                                                    </div>
                                                                )}

                                                            </div>


                                                            {/* Product Info */}
                                                            <div className="p-3">

                                                                <p className="text-xs text-gray-500 mb-1 font-medium">
                                                                    {product.brand}
                                                                </p>

                                                                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-xs leading-tight">
                                                                    {product.title}
                                                                </h3>


                                                                {/* Price */}
                                                                <div className="mb-2">

                                                                    <div className="flex items-center gap-2">

                                                                        <p className="text-base font-bold text-gray-900">
                                                                            ₹{product.price.toLocaleString()}
                                                                        </p>

                                                                        {product.originalPrice && (
                                                                            <p className="text-xs text-gray-400 line-through">
                                                                                ₹{product.originalPrice.toLocaleString()}
                                                                            </p>
                                                                        )}

                                                                    </div>

                                                                </div>


                                                                {/* Colors */}
                                                                {product.color && product.color.length > 0 && (

                                                                    <div className="flex items-center gap-1">

                                                                        {product.color.slice(0, 4).map((color, idx) => (

                                                                            <div
                                                                                key={idx}
                                                                                className="w-4 h-4 rounded-full border border-gray-300"
                                                                                style={{ backgroundColor: color.code }}
                                                                                title={color.name}
                                                                            />

                                                                        ))}

                                                                        {product.color.length > 4 && (

                                                                            <span className="text-xs text-gray-500">
                                                                                +{product.color.length - 4}
                                                                            </span>

                                                                        )}

                                                                    </div>

                                                                )}

                                                            </div>

                                                        </div>

                                                    </Link>

                                                </motion.div>

                                            ))}

                                        </div>

                                    </motion.div>

                                )}


                                {/* No Results */}
                                {searchQuery && searchResults.length === 0 && (

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center py-16"
                                    >

                                        <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />

                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            No results found
                                        </h3>

                                        <p className="text-gray-600">
                                            Try searching with different keywords
                                        </p>

                                    </motion.div>

                                )}



                                {/* Default View - Trending & Categories */}
                                {!searchQuery && (

                                    <div className="space-y-8">

                                        {/* Explore by Category */}
                                        <div>

                                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                                Explore by Category
                                            </h2>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

                                                {categories.map((category, index) => (

                                                    <motion.div
                                                        key={category.id}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.2 + index * 0.1 }}
                                                    >

                                                        <Link
                                                            href={category.href}
                                                            onClick={() => onOpenChange(false)}
                                                            className="group block"
                                                        >

                                                            <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-3">

                                                                <img
                                                                    src={category.image}
                                                                    alt={category.title}
                                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                                />

                                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

                                                            </div>

                                                            <h3 className="font-semibold text-gray-900 group-hover:text-gray-600 transition-colors text-sm md:text-base">
                                                                {category.title}
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
