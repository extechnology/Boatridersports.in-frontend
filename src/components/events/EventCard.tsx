"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Route, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { CyclingEvent } from "@/data/eventsData";

interface EventCardProps {
    event: CyclingEvent;
    onRegister: (event: CyclingEvent) => void;
    index: number;
}

export default function EventCard({ event, onRegister, index }: EventCardProps) {
    const fillPercent = Math.min(Math.round((event.filledSpots / event.maxSpots) * 100), 100);
    const spotsLeft = event.maxSpots - event.filledSpots;

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "Community":
                return "bg-emerald-600 text-white";
            case "Trail":
                return "bg-orange-600 text-white";
            case "Race":
                return "bg-purple-600 text-white";
            case "Workshop":
                return "bg-blue-600 text-white";
            default:
                return "bg-red-600 text-white";
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="group relative flex flex-col bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
        >
            {/* Top Image Area */}
            <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-zinc-900">
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Dark gradient for badge contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 gap-2">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-md ${getCategoryColor(
                            event.category
                        )}`}
                    >
                        {event.categoryLabel}
                    </span>

                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-sm">
                        {event.fee}
                    </span>
                </div>

                {/* Bottom Overlay on Image: Distance & Difficulty pill */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs z-10">
                    <span className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 font-semibold">
                        <Route className="w-3.5 h-3.5 text-red-400" />
                        {event.distance}
                    </span>

                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/15">
                        {event.difficulty}
                    </span>
                </div>
            </div>

            {/* Card Content */}
            <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-5">
                <div className="space-y-3">
                    {/* Event Tag */}
                    <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{event.tag}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white leading-snug group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        {event.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                        {event.description}
                    </p>

                    {/* Aligned Details Grid */}
                    <div className="pt-2 space-y-2 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300">
                        <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                                <Calendar className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                            </div>
                            <span className="font-semibold">{event.date}</span>
                            <span className="text-zinc-400">•</span>
                            <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                                <Clock className="w-3 h-3" />
                                {event.time}
                            </span>
                        </div>

                        <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                                <MapPin className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                            </div>
                            <span className="font-medium truncate">{event.location}</span>
                        </div>
                    </div>

                    {/* Highlights */}
                    <div className="pt-1 flex flex-wrap gap-1.5">
                        {event.highlights.slice(0, 2).map((h, i) => (
                            <span
                                key={i}
                                className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                            >
                                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                {h}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Footer Section: Spots Progress & CTA */}
                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
                    {/* Capacity Indicator */}
                    <div className="space-y-1">
                        <div className="flex justify-between items-center text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                            <span>{event.filledSpots} / {event.maxSpots} spots filled</span>
                            <span className={spotsLeft <= 10 ? "text-orange-500 font-bold" : ""}>
                                {spotsLeft <= 10 ? `Only ${spotsLeft} left!` : `${spotsLeft} available`}
                            </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                    fillPercent >= 85
                                        ? "bg-red-500"
                                        : fillPercent >= 60
                                        ? "bg-orange-500"
                                        : "bg-emerald-500"
                                }`}
                                style={{ width: `${fillPercent}%` }}
                            />
                        </div>
                    </div>

                    {/* Register Button */}
                    <button
                        type="button"
                        onClick={() => onRegister(event)}
                        className="w-full h-11 rounded-full bg-black hover:bg-red-600 dark:bg-white dark:hover:bg-red-600 text-white dark:text-black dark:hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-xl hover:cursor-pointer group/btn active:scale-98"
                    >
                        <span>Register Now</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
