"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Users, Route, Award, Search, Sparkles, Filter, ArrowRight } from "lucide-react";
import HeroSlider from "@/components/events/HeroSlider";
import CountUp from "@/components/events/CountUp";
import EventCard from "@/components/events/EventCard";
import EventRegisterModal from "@/components/events/EventRegisterModal";
import { EVENTS_DATA, CyclingEvent } from "@/data/eventsData";
import { useEventsList } from "@/service/events/useEvents";

export default function EventsPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedEventForModal, setSelectedEventForModal] = useState<CyclingEvent | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch dynamic events from backend with fallback
    const { data: apiEventsResponse } = useEventsList();
    const allEvents: CyclingEvent[] =
        Array.isArray(apiEventsResponse) && apiEventsResponse.length > 0
            ? apiEventsResponse
            : Array.isArray(apiEventsResponse?.data) && apiEventsResponse.data.length > 0
            ? apiEventsResponse.data
            : EVENTS_DATA;

    const handleOpenRegister = (event: CyclingEvent) => {
        setSelectedEventForModal(event);
        setIsModalOpen(true);
    };

    const scrollToEvents = (category?: string) => {
        if (category) setSelectedCategory(category);
        const el = document.getElementById("events-list");
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    const heroSlides = [
        {
            image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1920&q=80",
            title: "Upcoming Events",
            subtitle: "Join our community rides, races, and workshops across Kerala",
            cta: {
                text: "Register Now",
                action: () => handleOpenRegister(EVENTS_DATA[0]),
            },
        },
        {
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80",
            title: "Mountain Adventures",
            subtitle: "Experience thrilling trails and breathtaking views of Wayanad Ghats",
            cta: {
                text: "Explore Events",
                action: () => scrollToEvents("Trail"),
            },
        },
        {
            image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1920&q=80",
            title: "Competitive Racing",
            subtitle: "Test your limits in our championship closed-circuit criteriums",
            cta: {
                text: "View Races",
                action: () => scrollToEvents("Race"),
            },
        },
    ];

    const statsData = [
        { icon: Calendar, value: 804, label: "Rides & Events", color: "from-blue-500 to-cyan-500" },
        { icon: Users, value: 3267, label: "Users Joined", color: "from-purple-500 to-pink-500" },
        { icon: Route, value: 30, suffix: " kms", label: "Distance Covered", color: "from-orange-500 to-red-500" },
        { icon: Award, value: 70, label: "Total Winners", color: "from-green-500 to-emerald-500" },
    ];

    const categories = [
        { key: "All", label: "All Events" },
        { key: "Community", label: "Community Rides" },
        { key: "Trail", label: "Mountain & Trail" },
        { key: "Race", label: "Races & Speed" },
        { key: "Workshop", label: "Workshops" },
    ];

    // Filter events (dynamically from backend or default dataset)
    const filteredEvents = allEvents.filter((event) => {
        const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
        const matchesSearch =
            searchQuery.trim() === "" ||
            event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-black font-sans">
            {/* Hero Slider */}
            <HeroSlider slides={heroSlides} />

            {/* Stats Section */}
            <section className="py-12 bg-linear-to-br from-zinc-950 via-zinc-900 to-black text-white relative overflow-hidden border-b border-zinc-800">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                            backgroundSize: "40px 40px",
                        }}
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        {statsData.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="text-center group"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-linear-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-xl`}
                                >
                                    <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                                </motion.div>
                                <div className="text-4xl sm:text-5xl md:text-6xl font-black mb-2 bg-linear-to-br from-white to-gray-300 bg-clip-text text-transparent">
                                    <CountUp end={stat.value} suffix={stat.suffix || ""} />
                                </div>
                                <div className="text-zinc-400 font-semibold text-xs sm:text-sm tracking-wide uppercase">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Events Main Section */}
            <section id="events-list" className="py-14 sm:py-20 scroll-mt-20">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                        <div className="space-y-3">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold tracking-widest text-red-600 bg-red-50 dark:bg-red-950/40 dark:text-red-400 uppercase rounded-full">
                                <Sparkles className="w-3.5 h-3.5" />
                                Cycling Calendar 2026-2027
                            </span>

                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
                                Our Rides &amp; Events
                            </h2>

                            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
                                Discover exciting cycling events, from coastal dawn cruises to competitive races and technical workshops.
                            </p>
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full md:w-72">
                            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by title, location..."
                                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                            />
                        </div>
                    </div>

                    {/* Category Filter Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
                        <div className="flex items-center gap-2 shrink-0">
                            <Filter className="w-4 h-4 text-zinc-400 mr-1 hidden sm:block" />
                            {categories.map((cat) => {
                                const isSelected = selectedCategory === cat.key;
                                const count =
                                    cat.key === "All"
                                        ? EVENTS_DATA.length
                                        : EVENTS_DATA.filter((e) => e.category === cat.key).length;

                                return (
                                    <button
                                        key={cat.key}
                                        type="button"
                                        onClick={() => setSelectedCategory(cat.key)}
                                        className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all hover:scale-105 active:scale-95 whitespace-nowrap flex items-center gap-1.5 ${
                                            isSelected
                                                ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                                                : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                                        }`}
                                    >
                                        <span>{cat.label}</span>
                                        <span
                                            className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                                                isSelected
                                                    ? "bg-white/20 text-white"
                                                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                                            }`}
                                        >
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Events Grid */}
                    {filteredEvents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {filteredEvents.map((event, index) => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    onRegister={handleOpenRegister}
                                    index={index}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 space-y-4">
                            <p className="text-lg font-bold text-zinc-900 dark:text-white">
                                No events found matching your filter
                            </p>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                                Try adjusting your search query or selecting a different category.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedCategory("All");
                                    setSearchQuery("");
                                }}
                                className="px-6 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-wider hover:bg-red-600 dark:hover:bg-red-600 dark:hover:text-white transition"
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Registration Modal Form */}
            <EventRegisterModal
                event={selectedEventForModal}
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedEventForModal(null);
                }}
            />

            {/* Host Your Own Ride / Corporate CTA Section */}
            <section className="py-16 sm:py-20 bg-linear-to-br from-zinc-950 via-zinc-900 to-black text-white relative overflow-hidden border-t border-zinc-800">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                            backgroundSize: "40px 40px",
                        }}
                    />
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-red-400 bg-red-950/60 border border-red-800/50">
                        Custom Cycling Events
                    </span>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                        Want to Host a Group or Corporate Ride?
                    </h2>

                    <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
                        We organize custom corporate wellness rides, charity rallies, school clinics, and private group cycling tours with full technical and safety support.
                    </p>

                    <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold text-sm shadow-xl shadow-red-600/30 hover:shadow-red-600/50 hover:scale-105 active:scale-95 transition-all"
                        >
                            <span>Contact Our Events Team</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
