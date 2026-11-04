"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, ArrowRight } from "lucide-react";

interface ProductEnquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
    productName: string;
    enquiryUrl: string;
    productDetails?: string;
    phoneNumber?: string;
    phoneTel?: string;
    landline?: string;
    landlineTel?: string;
}

function WhatsAppIcon({ className, ...props }: React.ComponentProps<"svg">) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
    );
}

export default function ProductEnquiryModal({
    isOpen,
    onClose,
    productName,
    enquiryUrl,
    productDetails,
    phoneNumber = "+91 95265 11511",
    phoneTel = "+919526511511",
    landline = "0495 4850666",
    landlineTel = "04954850666",
}: ProductEnquiryModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (!isOpen) return;
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
                        aria-hidden="true"
                    />

                    {/* Modal Box */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 16 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-7 shadow-2xl z-10 border border-zinc-200 dark:border-zinc-800 text-left"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                                <span className="inline-block text-[11px] font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-full mb-1.5">
                                    Product Enquiry
                                </span>
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white leading-snug">
                                    {productName}
                                </h3>
                                {productDetails && (
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                        {productDetails}
                                    </p>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Close modal"
                                className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 flex items-center justify-center transition cursor-pointer shrink-0"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-5 leading-relaxed">
                            How would you like to connect with our team regarding this product? Choose an option below:
                        </p>

                        {/* Actions */}
                        <div className="space-y-3">
                            {/* WhatsApp Action */}
                            <a
                                href={enquiryUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={onClose}
                                className="flex items-center justify-between p-4 rounded-2xl bg-linear-to-r from-[#25D366] to-[#128C7E] hover:from-[#20bd5a] hover:to-[#0f7a6e] text-white transition-all shadow-lg shadow-emerald-500/25 group cursor-pointer"
                            >
                                <div className="flex items-center gap-3.5">
                                    <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                                        <WhatsAppIcon className="w-6 h-6 fill-current" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-base leading-tight">WhatsApp</div>
                                        <div className="text-xs text-emerald-100 mt-0.5">
                                            Instant chat & pre-filled product details
                                        </div>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 shrink-0" />
                            </a>

                            {/* Direct Call Action */}
                            <a
                                href={`tel:${phoneTel}`}
                                onClick={onClose}
                                className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900 hover:bg-red-600 dark:bg-zinc-800 dark:hover:bg-red-600 text-white transition-all shadow-lg group cursor-pointer"
                            >
                                <div className="flex items-center gap-3.5">
                                    <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-base leading-tight">Call Now</div>
                                        <div className="text-xs text-zinc-400 group-hover:text-red-100 transition-colors mt-0.5">
                                            {phoneNumber} (Direct line)
                                        </div>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 shrink-0" />
                            </a>
                        </div>

                        {/* Secondary info / Landline */}
                        <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-center">
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                Or dial landline:{" "}
                                <a
                                    href={`tel:${landlineTel}`}
                                    className="font-semibold text-zinc-700 dark:text-zinc-200 hover:text-red-600 dark:hover:text-red-400 underline underline-offset-2"
                                >
                                    {landline}
                                </a>{" "}
                                <span className="text-zinc-400">(Mon–Sat 10am–8pm)</span>
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}

