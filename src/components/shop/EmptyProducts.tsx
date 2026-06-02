"use client";

import { motion } from "framer-motion";
import { RefreshCcw, PackageX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyProductsProps {
    onClearFilters: () => void;
}

export default function EmptyProducts({ onClearFilters }: EmptyProductsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative flex min-h-[250px] w-full flex-col items-center justify-center
                 rounded-3xl 
                 bg-white dark:bg-zinc-900 px-6 text-center"
        >
            {/* Icon */}
            <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-full
                   bg-zinc-100 dark:bg-zinc-800"
            >
                <PackageX className="h-7 w-7 text-zinc-700 dark:text-zinc-300" />
            </motion.div>

            {/* Text */}
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                No products found
            </h2>

            <p className="mt-2 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
                Try adjusting or clearing your filters to see more results.
            </p>

            {/* Action */}
            <Button
                onClick={onClearFilters}
                size="lg"
                className="mt-8 rounded-full px-8 gap-2"
            >
                <RefreshCcw className="h-4 w-4" />
                Clear filters
            </Button>

            {/* Subtle background */}
            <div className="pointer-events-none absolute inset-0 -z-10
                      bg-radial-gradient from-zinc-100/40 to-transparent
                      dark:from-zinc-800/30" />
        </motion.div>
    );
}
