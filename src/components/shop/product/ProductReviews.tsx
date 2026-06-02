"use client";

import { useState } from "react";
import { Star, CheckCircle2, User, ThumbsUp, PenLine } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Review } from "@/data/shop-data";



// Props type
interface ProductReviewsProps {
    reviews?: Review[];
    rating?: number;
    reviewCount?: number;
}




export function ProductReviews({ reviews, rating = 0, reviewCount = 0 }: ProductReviewsProps) {


    const [isWriting, setIsWriting] = useState(false);



    const ratingDistribution = [70, 20, 5, 2, 3];




    return (


        <div className="space-y-6 pt-2 px-3 sm:px-5 sm:py-6">


            <div className="flex items-center justify-between">

                <h2 className="text-xl sm:text-3xl font-black text-zinc-900 dark:text-white">Customer Reviews</h2>

                <Button
                    onClick={() => setIsWriting(!isWriting)}
                    variant="outline"
                    className="gap-2 rounded-full font-bold border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    <PenLine className="w-4 h-4" />
                    Write a Review
                </Button>

            </div>


            <div className="grid grid-cols-1 gap-8 lg:gap-12">


                {/* 1. Rating Summary Stats */}
                <div className="space-y-8">


                    <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800">


                        <div className="text-center">
                            <span className="text-5xl font-black text-zinc-900 dark:text-white block">{rating}</span>
                            <div className="flex gap-0.5 justify-center my-2">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className={cn("w-4 h-4", s <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-zinc-300 dark:text-zinc-700")} />
                                ))}
                            </div>
                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wide">{reviewCount} Reviews</p>
                        </div>


                        <div className="h-16 w-px bg-zinc-200 dark:bg-zinc-700 mx-auto" />


                        <div className="grow space-y-1.5 min-w-[140px]">
                            {[5, 4, 3, 2, 1].map((n, idx) => (
                                <div key={n} className="flex items-center gap-2 text-xs">
                                    <span className="font-bold w-3 text-zinc-500">{n}</span>
                                    <div className="h-1.5 grow bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-zinc-900 dark:bg-white rounded-full"
                                            style={{ width: `${ratingDistribution[idx] || 0}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>



                {/* 2. Reviews List */}
                <div className="space-y-8">


                    {/* Write Review Form Area */}
                    <AnimatePresence>

                        {isWriting && (

                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >

                                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 mb-8 space-y-6 shadow-xs">

                                    <div className="flex justify-between items-center">
                                        <h3 className="text-xl font-bold">Write a Review</h3>
                                        <Button variant="ghost" size="sm" onClick={() => setIsWriting(false)}>Cancel</Button>
                                    </div>

                                    <div className="space-y-4">

                                        <div>

                                            <label className="block text-sm font-bold mb-2">Rating</label>

                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5].map((s) => (
                                                    <button key={s} className="hover:scale-110 transition-transform">
                                                        <Star className="w-8 h-8 text-zinc-300 hover:text-yellow-400 hover:fill-yellow-400 transition-colors" />
                                                    </button>
                                                ))}
                                            </div>

                                        </div>



                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                            <div className="space-y-2">
                                                <label className="text-sm font-bold">Name</label>
                                                <input type="text" className="w-full h-11 px-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent focus:outline-hidden focus:ring-2 focus:ring-black dark:focus:ring-white" placeholder="John Doe" />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-bold">Review Title</label>
                                                <input type="text" className="w-full h-11 px-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent focus:outline-hidden focus:ring-2 focus:ring-black dark:focus:ring-white" placeholder="Summary of your experience" />
                                            </div>

                                        </div>



                                        <div className="space-y-2">
                                            <label className="text-sm font-bold">Review</label>
                                            <textarea className="w-full h-32 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent focus:outline-hidden focus:ring-2 focus:ring-black dark:focus:ring-white resize-none" placeholder="Tell us what you liked or disliked..." />
                                        </div>

                                        <div className="pt-2">
                                            <Button className="w-full md:w-auto h-12 px-8 rounded-xl font-bold bg-zinc-900 text-white hover:bg-zinc-800">
                                                Submit Review
                                            </Button>
                                        </div>

                                    </div>

                                </div>

                            </motion.div>

                        )}


                    </AnimatePresence>



                    {/* Review Cards */}
                    {reviews && reviews.length > 0 ? (

                        <div className="space-y-6">

                            {reviews.map((review) => (

                                <div key={review.id} className="pb-8 border-b border-zinc-100 dark:border-zinc-800 last:border-0 last:pb-0">

                                    <div className="flex items-start justify-between mb-4">

                                        <div className="flex items-center gap-3">

                                            <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-zinc-500">
                                                {review.author.charAt(0)}
                                            </div>

                                            <div>

                                                <h4 className="font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-2">
                                                    {review.author}
                                                    {review.isVerified && (
                                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                                            <CheckCircle2 className="w-3 h-3" /> Verified
                                                        </span>
                                                    )}
                                                </h4>

                                                <div className="flex items-center gap-2 mt-0.5">

                                                    <div className="flex gap-0.5">
                                                        {[1, 2, 3, 4, 5].map((s) => (
                                                            <Star key={s} className={cn("w-3 h-3", s <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-200 dark:text-zinc-800")} />
                                                        ))}
                                                    </div>
                                                    <span className="text-xs font-medium text-zinc-400 border-l border-zinc-200 pl-2 ml-2">{review.date}</span>

                                                </div>

                                            </div>

                                        </div>

                                    </div>


                                    <h5 className="font-bold text-base mb-2 text-zinc-900 dark:text-white">{review.title}</h5>

                                    <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-base">
                                        {review.content}
                                    </p>

                                    <div className="mt-4 flex items-center gap-4">
                                        <button className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors group">
                                            <ThumbsUp className="w-4 h-4 group-hover:scale-110 transition-transform" /> Helpful
                                        </button>
                                    </div>

                                </div>

                            ))}

                        </div>

                    ) : (

                        <div className="text-center py-12 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
                            <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">No reviews yet</h3>
                            <p className="text-zinc-500">Be the first to share your experience!</p>
                        </div>

                    )}

                </div>

            </div>

        </div>

    );

}
