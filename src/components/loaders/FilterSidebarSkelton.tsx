"use client";


import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";



interface FilterSidebarSkeletonProps {
    className?: string;
}




export default function FilterSidebarSkeleton({ className }: FilterSidebarSkeletonProps) {


    return (


        <div
            className={cn(
                "bg-white dark:bg-zinc-900 h-full flex flex-col p-4",
                className
            )}
        >
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-6 border-b lg:hidden">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-8 w-8 rounded-md" />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 lg:p-0 lg:pr-6 space-y-8">
                {/* Reusable Section */}
                {Array.from({ length: 5 }).map((_, sectionIndex) => (
                    <div
                        key={sectionIndex}
                        className="border-b border-zinc-200 dark:border-zinc-800 pb-6 last:border-0"
                    >
                        {/* Section Header */}
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-5 w-32 bg-gray-200" />
                            <Skeleton className="h-5 w-5 bg-gray-200 rounded-full" />
                        </div>

                        {/* Section Content */}
                        <div className="mt-4 space-y-3">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <Skeleton className="h-5 w-5 rounded-md bg-gray-200" />
                                    <Skeleton className="h-4 w-28 bg-gray-200" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Color Grid Skeleton */}
                <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
                    <Skeleton className="h-5 w-24 mb-4" />
                    <div className="grid grid-cols-4 gap-3">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <Skeleton className="h-9 w-9 rounded-full bg-gray-200" />
                                <Skeleton className="h-3 w-10 bg-gray-200" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Size / Chip Buttons */}
                <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
                    <Skeleton className="h-5 w-20 mb-4 bg-gray-200" />
                    <div className="flex flex-wrap gap-2">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton key={i} className="h-10 w-20 rounded-lg" />
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div>
                    <Skeleton className="h-5 w-28 mb-4" />
                    <div className="flex justify-between mb-4">
                        <Skeleton className="h-4 w-16 bg-gray-200" />
                        <Skeleton className="h-4 w-16 bg-gray-200" />
                    </div>
                    <Skeleton className="h-4 w-full rounded-full bg-gray-200" />
                </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t sticky bottom-0 bg-white dark:bg-zinc-900 space-y-3">
                <Skeleton className="h-12 w-full rounded-lg bg-gray-200" />
                <div className="lg:hidden">
                    <Skeleton className="h-12 w-full rounded-lg bg-gray-200" />
                </div>
            </div>

        </div>
    );
}
