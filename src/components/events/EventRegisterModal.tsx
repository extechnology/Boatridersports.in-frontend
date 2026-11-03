"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Calendar,
    MapPin,
    Clock,
    Check,
    Loader2,
    Bike,
    Users,
    User,
    Phone,
    Mail,
    AlertCircle,
    Activity,
    ShieldAlert,
    FileText,
    Route,
    Sparkles,
    CheckCircle2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CyclingEvent } from "@/data/eventsData";
import { useRegisterEvent } from "@/service/events/useEvents";

// Zod validation schema
const eventRegisterSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(2, "Full name must be at least 2 characters")
        .max(60, "Name is too long"),
    phone: z
        .string()
        .trim()
        .min(10, "Phone number must be at least 10 digits")
        .regex(/^[0-9+\s-]{10,16}$/, "Enter a valid 10-digit phone number"),
    email: z
        .string()
        .trim()
        .min(1, "Email address is required")
        .email("Enter a valid email address"),
    participants: z.enum(["1", "2", "3", "4", "5"], {
        message: "Select number of participants",
    }),
    bikeType: z.string().min(1, "Select the bike type you will ride"),
    experienceLevel: z.string().min(1, "Select your experience level"),
    emergencyContact: z.string().trim().optional(),
    notes: z.string().trim().optional(),
    agreedToTerms: z.literal(true, {
        message: "You must agree to the helmet and road safety pledge",
    }),
});

type EventRegisterFormValues = z.infer<typeof eventRegisterSchema>;

interface EventRegisterModalProps {
    event: CyclingEvent | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function EventRegisterModal({ event, isOpen, onClose }: EventRegisterModalProps) {
    const registerMutation = useRegisterEvent();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting: isFormSubmitting },
    } = useForm<EventRegisterFormValues>({
        resolver: zodResolver(eventRegisterSchema),
        defaultValues: {
            fullName: "",
            phone: "",
            email: "",
            participants: "1",
            bikeType: "Road Bike",
            experienceLevel: "Intermediate",
            emergencyContact: "",
            notes: "",
            agreedToTerms: true,
        },
    });

    const isSubmitting = isFormSubmitting || registerMutation.isPending;

    // Reset form when modal opens or event changes
    useEffect(() => {
        if (isOpen) {
            reset({
                fullName: "",
                phone: "",
                email: "",
                participants: "1",
                bikeType: "Road Bike",
                experienceLevel: "Intermediate",
                emergencyContact: "",
                notes: "",
                agreedToTerms: true,
            });
        }
    }, [isOpen, reset, event]);

    if (!isOpen || !event) return null;

    const onSubmit = async (data: EventRegisterFormValues) => {
        try {
            await registerMutation.mutateAsync({
                eventId: event.id,
                eventTitle: event.title,
                fullName: data.fullName,
                phone: data.phone,
                email: data.email,
                participants: parseInt(data.participants, 10) || 1,
                bikeType: data.bikeType,
                experienceLevel: data.experienceLevel,
                emergencyContact: data.emergencyContact || "",
                notes: data.notes || "",
                agreedToTerms: data.agreedToTerms,
            });

            reset();
            onClose();
        } catch (error) {
            console.error("Event registration submission error:", error);
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/75 backdrop-blur-md"
                />

                {/* Modal Container: Expanded width max-w-4xl */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 24 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 z-10 my-4 flex flex-col"
                >
                    {/* Header: Event Hero Banner with Rich Details */}
                    <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-zinc-950 shrink-0">
                        <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            unoptimized
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/35" />

                        {/* Close Button */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center transition-all hover:scale-105 border border-white/10"
                            aria-label="Close modal"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 sm:left-6 flex items-center gap-2 z-10 flex-wrap">
                            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-red-600 text-white shadow-md">
                                {event.categoryLabel}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600/90 text-white backdrop-blur-md border border-emerald-400/40 shadow-sm flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> No Payment Required
                            </span>
                            <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-zinc-200 border border-white/10">
                                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                                {event.tag}
                            </span>
                        </div>

                        {/* Bottom Event Info */}
                        <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-6 right-4 sm:right-6 text-white z-10">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight drop-shadow-md mb-2">
                                {event.title}
                            </h2>

                            <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm text-zinc-200 flex-wrap">
                                <span className="flex items-center gap-1.5 font-medium">
                                    <Calendar className="w-4 h-4 text-red-400 shrink-0" />
                                    {event.date}
                                </span>
                                <span className="flex items-center gap-1.5 font-medium">
                                    <Clock className="w-4 h-4 text-red-400 shrink-0" />
                                    {event.time}
                                </span>
                                <span className="flex items-center gap-1.5 font-medium">
                                    <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                                    {event.location}
                                </span>
                                <span className="hidden md:flex items-center gap-1.5 font-medium">
                                    <Route className="w-4 h-4 text-red-400 shrink-0" />
                                    {event.distance} • {event.difficulty}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Form Body: Spacious & Well Aligned Grid */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        className="p-6 sm:p-8 space-y-6 max-h-[calc(88vh-230px)] overflow-y-auto"
                    >
                        {/* Section Header */}
                        <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                                    Participant Registration
                                </h3>
                                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                                    Please enter your contact and riding details to secure your spot.
                                </p>
                            </div>
                            <span className="hidden sm:inline-block text-xs font-semibold px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                                {event.maxSpots - event.filledSpots} spots left
                            </span>
                        </div>

                        {/* Grid 1: Personal Contact Info (2 Columns) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Full Name */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type="text"
                                        {...register("fullName")}
                                        placeholder="e.g. Rahul Sharma"
                                        className={`w-full h-12 pl-10 pr-4 rounded-xl border text-sm bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-white transition focus:outline-none focus:ring-2 ${
                                            errors.fullName
                                                ? "border-red-500 focus:ring-red-500 bg-red-50/20"
                                                : "border-zinc-200 dark:border-zinc-700 focus:ring-black dark:focus:ring-white"
                                        }`}
                                    />
                                </div>
                                {errors.fullName && (
                                    <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                        <span>{errors.fullName.message}</span>
                                    </p>
                                )}
                            </div>

                            {/* WhatsApp / Phone */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                                    WhatsApp / Phone <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type="tel"
                                        {...register("phone")}
                                        placeholder="e.g. 9876543210"
                                        className={`w-full h-12 pl-10 pr-4 rounded-xl border text-sm bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-white transition focus:outline-none focus:ring-2 ${
                                            errors.phone
                                                ? "border-red-500 focus:ring-red-500 bg-red-50/20"
                                                : "border-zinc-200 dark:border-zinc-700 focus:ring-black dark:focus:ring-white"
                                        }`}
                                    />
                                </div>
                                {errors.phone && (
                                    <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                        <span>{errors.phone.message}</span>
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Grid 2: Email & Riders Count (2 Columns) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Email */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type="email"
                                        {...register("email")}
                                        placeholder="you@example.com"
                                        className={`w-full h-12 pl-10 pr-4 rounded-xl border text-sm bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-white transition focus:outline-none focus:ring-2 ${
                                            errors.email
                                                ? "border-red-500 focus:ring-red-500 bg-red-50/20"
                                                : "border-zinc-200 dark:border-zinc-700 focus:ring-black dark:focus:ring-white"
                                        }`}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                        <span>{errors.email.message}</span>
                                    </p>
                                )}
                            </div>

                            {/* Riders / Slots */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                                    Number of Riders
                                </label>
                                <div className="relative">
                                    <Users className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <select
                                        {...register("participants")}
                                        className="w-full h-12 pl-10 pr-4 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-white transition focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                                    >
                                        <option value="1">1 Rider (Individual)</option>
                                        <option value="2">2 Riders (Pair)</option>
                                        <option value="3">3 Riders</option>
                                        <option value="4">4 Riders</option>
                                        <option value="5">5+ Riders (Club / Group)</option>
                                    </select>
                                </div>
                                {errors.participants && (
                                    <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                        <span>{errors.participants.message}</span>
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Grid 3: Bike Type & Riding Experience (2 Columns) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Bike You'll Ride */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                                    Bike You&apos;ll Ride
                                </label>
                                <div className="relative">
                                    <Bike className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <select
                                        {...register("bikeType")}
                                        className="w-full h-12 pl-10 pr-4 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-white transition focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                                    >
                                        <option value="Road Bike">Road Bike (Drop bar)</option>
                                        <option value="Mountain Bike (MTB)">Mountain Bike (MTB)</option>
                                        <option value="Hybrid / City Bike">Hybrid / Commuter Bike</option>
                                        <option value="Electric Bike (E-Bike)">Electric Bike (E-Bike)</option>
                                        <option value="Gravel Bike">Gravel Bike</option>
                                        <option value="Need to Rent from Boatrider">Need to Rent from Boatrider</option>
                                    </select>
                                </div>
                                {errors.bikeType && (
                                    <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                        <span>{errors.bikeType.message}</span>
                                    </p>
                                )}
                            </div>

                            {/* Cycling Experience */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                                    Cycling Experience
                                </label>
                                <div className="relative">
                                    <Activity className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <select
                                        {...register("experienceLevel")}
                                        className="w-full h-12 pl-10 pr-4 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-white transition focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                                    >
                                        <option value="Beginner">Beginner (10 - 25 km leisure rides)</option>
                                        <option value="Intermediate">Intermediate (30 - 60 km regular rides)</option>
                                        <option value="Advanced">Advanced (60 - 100+ km endurance)</option>
                                        <option value="Competitive">Competitive / Club Racer</option>
                                    </select>
                                </div>
                                {errors.experienceLevel && (
                                    <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                        <span>{errors.experienceLevel.message}</span>
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Grid 4: Emergency Contact & Notes (2 Columns) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Emergency Contact */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                                    Emergency Contact <span className="text-zinc-400 font-normal lowercase">(optional)</span>
                                </label>
                                <div className="relative">
                                    <ShieldAlert className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type="text"
                                        {...register("emergencyContact")}
                                        placeholder="Name & Contact number"
                                        className="w-full h-12 pl-10 pr-4 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-white transition focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                                    />
                                </div>
                            </div>

                            {/* Special Notes */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                                    Special Notes / Dietary <span className="text-zinc-400 font-normal lowercase">(optional)</span>
                                </label>
                                <div className="relative">
                                    <FileText className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type="text"
                                        {...register("notes")}
                                        placeholder="e.g. Vegetarian breakfast, rental helmet size M"
                                        className="w-full h-12 pl-10 pr-4 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-white transition focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Safety & Helmet Pledge Card */}
                        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
                            <label className="flex items-start gap-3 cursor-pointer group select-none">
                                <input
                                    type="checkbox"
                                    {...register("agreedToTerms")}
                                    className="mt-0.5 w-4 h-4 rounded text-red-600 focus:ring-red-500 accent-red-600 shrink-0"
                                />
                                <div className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                                    <span className="font-bold text-zinc-900 dark:text-white">
                                        Safety &amp; Helmet Agreement:{" "}
                                    </span>
                                    I agree to wear a certified bicycle helmet throughout the ride, follow marshal instructions, obey traffic regulations, and ensure my bicycle is in sound mechanical condition.
                                </div>
                            </label>
                            {errors.agreedToTerms && (
                                <p className="flex items-center gap-1 text-red-500 text-xs mt-2 pl-7 font-medium">
                                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                    <span>{errors.agreedToTerms.message}</span>
                                </p>
                            )}
                        </div>

                        {/* Footer Action Bar */}
                        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-100 dark:border-zinc-800">
                            {/* Left Summary: Free Direct Registration */}
                            <div className="text-xs text-zinc-500 dark:text-zinc-400 self-start sm:self-auto flex items-center gap-2 flex-wrap">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Free Registration
                                </span>
                                <span className="text-zinc-400 dark:text-zinc-600">•</span>
                                <span className="font-medium text-zinc-600 dark:text-zinc-300">
                                    No payment required • Instant confirmation
                                </span>
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    disabled={isSubmitting}
                                    className="px-6 py-3 rounded-full border border-zinc-300 dark:border-zinc-700 text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-8 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Confirming Spot...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Check className="w-4 h-4" />
                                            <span>Confirm Registration</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
