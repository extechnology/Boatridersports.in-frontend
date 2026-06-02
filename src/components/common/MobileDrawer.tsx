'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, ChevronRight, User, Search, ShoppingBag, Badge } from 'lucide-react';
import { useGetNavbarData } from '@/service/product/useProduct';
import { MENU_ITEMS } from '@/data/headerData';


interface MobileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onSearchOpen: () => void;
}



export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {


    // Get Navbar Data from API
    const { data: navbarData } = useGetNavbarData();



    // Helper function to get dropdown content based on category name
    const getDropdownContent = (categoryName: string) => {
    
    
        if (!navbarData) return [];

        if (categoryName === 'Bikes') {
            return navbarData.bikes?.map((cat) => ({
                title: cat.title,
                href: `/shop/bike?category=${encodeURIComponent(cat.title)}`,
            })) || [];
        }

        if (categoryName === 'Accessories') {
            return navbarData.accessories?.map((cat) => ({
                title: cat.title,
                href: `/shop/accessories?category=${encodeURIComponent(cat.title)}`,
            })) || [];
        }

        return [];
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-60 lg:hidden"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-70 lg:hidden shadow-2xl flex flex-col"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <span className="text-xl font-bold">Menu</span>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-5 py-2 bg-white">
                            <nav className="space-y-5">
                                {MENU_ITEMS.map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.04 }}
                                        className="group rounded-2xl bg-white/70 backdrop-blur-md border border-gray-100 shadow-sm hover:shadow-lg transition-all"
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={onClose}
                                            className="flex items-center justify-between p-5"
                                        >
                                            <span className="text-[22px] font-semibold tracking-tight text-gray-900">
                                                {item.name}
                                            </span>
                                            {item.hasDropdown && (
                                                <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-black transition">
                                                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition" />
                                                </span>
                                            )}
                                        </Link>

                                        <AnimatePresence>
                                            {item.hasDropdown && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                                    className="overflow-hidden border-t border-gray-100"
                                                >
                                                    <div className="px-5 py-4 grid grid-cols-2 gap-3">
                                                        {getDropdownContent(item.name).map((cat) => (
                                                            <Link
                                                                key={cat.title}
                                                                href={cat.href}
                                                                onClick={onClose}
                                                                className="block rounded-xl bg-gray-50 hover:bg-black hover:text-white p-4 text-sm font-medium text-gray-700 transition-all shadow-sm"
                                                            >
                                                                {cat.title}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </nav>
                        </div>

                        <div className="p-6 border-t border-gray-100 bg-gray-50">
                           
                            <div className="flex items-center justify-around">
                                
                                <Link href="/account" className="flex flex-col items-center gap-1 text-gray-600">
                                    <User className="w-6 h-6" />
                                    <span className="text-xs">Account</span>
                                </Link>

                                {/* <button
                                    onClick={() => {
                                        onSearchOpen();
                                        onClose();
                                    }}
                                    className="flex flex-col items-center gap-1 text-gray-600"
                                >
                                    <Search className="w-6 h-6" />
                                    <span className="text-xs">Search</span>
                                </button> */}

                                <Link href="/cart" className="flex flex-col items-center gap-1 text-gray-600">
                                    <ShoppingBag className="w-6 h-6" />
                                    <span className="text-xs">Cart</span>
                                </Link>

                            </div>

                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
