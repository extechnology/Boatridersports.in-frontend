"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";


export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {


    useEffect(() => {
        console.error("Shop Page Error:", error);
    }, [error]);



    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-linear-to-b from-zinc-100 to-white dark:from-zinc-950 dark:to-black px-4">

            {/* Ambient glow */}
            <motion.div
                animate={{ y: [0, -30, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/3 left-1/2 -translate-x-1/2 w-130 h-130 rounded-full bg-zinc-300/30 dark:bg-zinc-800/20 blur-3xl"
            />

            <motion.div
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 max-w-xl w-full text-center"
            >
                {/* Bicycle + road */}
                <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="relative flex justify-center mb-12"
                >
                    {/* Road */}
                    <div className="absolute bottom-0 w-[320px] h-6 overflow-hidden">
                        <motion.div
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                            className="flex w-160 gap-6"
                        >
                            {Array.from({ length: 20 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="w-6 h-0.75 rounded-full bg-zinc-400/60 dark:bg-zinc-600/60"
                                />
                            ))}
                        </motion.div>
                    </div>

                    {/* Bike SVG */}
                    <svg
                        width="240"
                        height="120"
                        viewBox="0 0 240 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-zinc-900 dark:text-zinc-200"
                    >
                        {/* Rear wheel */}
                        <motion.circle
                            cx="55"
                            cy="80"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            animate={{ rotate: 360 }}
                            transform-origin="55px 80px"
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        />

                        {/* Front wheel */}
                        <motion.circle
                            cx="185"
                            cy="80"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            animate={{ rotate: 360 }}
                            transform-origin="185px 80px"
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        />

                        {/* Frame */}
                        <path
                            d="M55 80 L95 40 L135 80 L95 80 Z"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {/* Handle + seat */}
                        <path
                            d="M135 80 L165 45 M90 40 L65 40"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />
                    </svg>
                </motion.div>

                {/* Text */}
                <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                    Ride Interrupted !
                </h1>

                <p className="text-zinc-600 dark:text-zinc-400 max-w-md mx-auto mb-10">
                    Oops! Something went wrong while loading this shop page. Let's get you back on track.
                </p>


                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        onClick={reset}
                        className="rounded-full px-7 bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black"
                    >
                        <RefreshCcw className="w-4 h-4 mr-2" />
                        Retry Now
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => window.location.reload()}
                        className="rounded-full px-7"
                    >
                        Reload Page
                    </Button>
                </div>

                <p className="mt-10 text-xs text-zinc-500 dark:text-zinc-600">
                    Error code: {error.digest ?? "UNKNOWN"}
                </p>
            </motion.div>
        </div>
    );
}
