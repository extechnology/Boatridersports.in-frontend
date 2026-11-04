"use client";

import { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Loader2, AlertCircle, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContactEnquiry } from "@/service/contact/useContact";



// =============== ZOD SCHEMA ===============
const contactSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must be under 100 characters"),
    email: z
        .string()
        .email("Please enter a valid email address"),
    phone: z
        .string()
        .min(7, "Phone number must be at least 7 digits")
        .max(15, "Phone number must be under 15 digits")
        .regex(/^[+\d\s\-()]+$/, "Please enter a valid phone number"),
    subject: z
        .string()
        .min(1, "Please select a subject"),
    message: z
        .string()
        .min(10, "Message must be at least 10 characters")
        .max(1000, "Message must be under 1000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;




function WhatsAppIcon({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
  );
}

function LandlineIcon({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M18 3H6a3 3 0 0 0-3 3v1a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a3 3 0 0 0-3-3z" />
      <path d="M5 9l-1.5 9A2 2 0 0 0 5.5 20h13a2 2 0 0 0 2-2L19 9" />
      <circle cx="8.5" cy="13.5" r="0.75" fill="currentColor" />
      <circle cx="12" cy="13.5" r="0.75" fill="currentColor" />
      <circle cx="15.5" cy="13.5" r="0.75" fill="currentColor" />
      <circle cx="8.5" cy="16.5" r="0.75" fill="currentColor" />
      <circle cx="12" cy="16.5" r="0.75" fill="currentColor" />
      <circle cx="15.5" cy="16.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

export default function ContactPage() {
    const [showContactChoice, setShowContactChoice] = useState(false);


    // =============== ANIMATION VARIANTS ===============
    const fadeIn: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const stagger = {
        visible: { transition: { staggerChildren: 0.1 } },
    };


    // =============== REACT HOOK FORM + ZOD ===============
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
    });


    // =============== MUTATION ===============
    const { mutate, isPending } = useContactEnquiry();

    const onSubmit = (values: ContactFormData) => {
        const data = new FormData();
        data.append("name",    values.name);
        data.append("email",   values.email);
        data.append("phone",   values.phone);
        data.append("subject", values.subject);
        data.append("message", values.message);
        mutate(data, {
            onSuccess: () => reset(),
        });
    };


    // =============== FIELD CLASS HELPERS ===============
    const inputBase =
        "w-full px-4 py-3 rounded-lg bg-gray-50 border focus:bg-white focus:ring-2 outline-none transition-all duration-300 disabled:opacity-60";
    const inputNormal = `${inputBase} border-gray-200 focus:border-red-500 focus:ring-red-100`;
    const inputError  = `${inputBase} border-red-400 focus:border-red-500 focus:ring-red-100 bg-red-50`;



    return (


        <div className="min-h-screen bg-white">


            {/* ================= HERO SECTION ================= */}
            <section className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center">


                {/* Background Overlay */}
                <div className="absolute inset-0 z-10 bg-black/40" />


                {/* Parallax/Static Image Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/contact banner 1920x1080px.jpg.jpeg"
                        alt="contact banner"
                        loading="lazy"
                        className="w-full h-full object-cover object-center"
                    />
                </div>



                {/* Hero Content */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="relative z-20 text-center text-white px-4"
                >


                    <motion.h1
                        className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Get in Touch
                    </motion.h1>


                    <motion.p
                        className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-semibold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        We'd love to hear from you. Whether it's a question about our bikes, services, or just a friendly chat.
                    </motion.p>

                </motion.div>


                {/* Curve Separator */}
                <div className="absolute bottom-0 left-0 w-full z-20 translate-y-px">
                    <svg viewBox="0 0 1440 120" className="w-full h-[60px] md:h-[110px] fill-white block" preserveAspectRatio="none">
                        <path d="M0,0 C480,100 960,100 1440,0 V120 H0 Z" />
                    </svg>
                </div>

            </section>



            {/* ================= CONTACT CONTENT ================= */}
            <section className="py-1 md:py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">


                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={stagger}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24"
                >


                    {/* Left Column: Contact Form */}
                    <motion.div variants={fadeIn} className="space-y-8">


                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                            <p className="text-gray-500">Fill out the form below and we'll get back to you as soon as possible.</p>
                        </div>


                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>

                            {/* Full Name */}
                            <div className="space-y-1.5">
                                <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    disabled={isPending}
                                    className={errors.name ? inputError : inputNormal}
                                    {...register("name")}
                                />
                                {errors.name && (
                                    <p className="flex items-center gap-1 text-xs text-red-600 mt-1">
                                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>


                            {/* Email & Phone */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div className="space-y-1.5">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        disabled={isPending}
                                        className={errors.email ? inputError : inputNormal}
                                        {...register("email")}
                                    />
                                    {errors.email && (
                                        <p className="flex items-center gap-1 text-xs text-red-600 mt-1">
                                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        placeholder="+91 98765 43210"
                                        disabled={isPending}
                                        className={errors.phone ? inputError : inputNormal}
                                        {...register("phone")}
                                    />
                                    {errors.phone && (
                                        <p className="flex items-center gap-1 text-xs text-red-600 mt-1">
                                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                            {errors.phone.message}
                                        </p>
                                    )}
                                </div>

                            </div>


                            {/* Subject */}
                            <div className="space-y-1.5">
                                <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</label>
                                <select
                                    id="subject"
                                    disabled={isPending}
                                    className={errors.subject ? inputError : inputNormal}
                                    {...register("subject")}
                                >
                                    <option value="">Select a topic</option>
                                    <option value="Sales Inquiry">Sales Inquiry</option>
                                    <option value="Customer Support">Customer Support</option>
                                    <option value="Service & Repair">Service &amp; Repair</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.subject && (
                                    <p className="flex items-center gap-1 text-xs text-red-600 mt-1">
                                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                        {errors.subject.message}
                                    </p>
                                )}
                            </div>


                            {/* Message */}
                            <div className="space-y-1.5">
                                <label htmlFor="message" className="text-sm font-medium text-gray-700">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    placeholder="How can we help you today?"
                                    disabled={isPending}
                                    className={`${errors.message ? inputError : inputNormal} resize-none`}
                                    {...register("message")}
                                />
                                {errors.message && (
                                    <p className="flex items-center gap-1 text-xs text-red-600 mt-1">
                                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                        {errors.message.message}
                                    </p>
                                )}
                            </div>


                            {/* Submit */}
                            <Button
                                type="submit"
                                size="lg"
                                disabled={isPending}
                                className="w-full py-6 text-lg bg-black hover:bg-gray-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </Button>

                        </form>

                    </motion.div>



                    {/* Right Column: Contact Info */}
                    <motion.div variants={fadeIn} className="flex flex-col justify-between h-full space-y-12">

                        {/* Info Cards */}
                        <div className="space-y-8">

                            <div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>

                                <div className="grid gap-8">

                                    <div className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-200 hover:shadow-lg transition-all duration-300 group">

                                        <div className="p-3 rounded-xl bg-white shadow-sm border border-gray-200 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                                            <MapPin className="w-6 h-6" />
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Visit Our Store</h4>
                                            <p className="text-gray-500 leading-relaxed">

                                                Boatrider Sports Pvt. Ltd <br />
                                                16/1040, Pushpa Junction, Francis Road, Calicut, Kerala – 673 002

                                            </p>
                                        </div>

                                    </div>


                                    <div className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-200 hover:shadow-lg transition-all duration-300 group">

                                        <div className="p-3 rounded-xl bg-white shadow-sm border border-gray-200 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                                            <Mail className="w-6 h-6" />
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Email Us</h4>
                                            <p className="text-gray-500 mb-1">For general inquiries:</p>
                                            <a href="mailto:boatridersportsclt@gmail.com" className="text-black font-medium hover:text-red-600 transition-colors">boatridersportsclt@gmail.com</a>
                                        </div>

                                    </div>

                                    {/* Mobile & WhatsApp Card */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-200 hover:shadow-lg transition-all duration-300 group">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 rounded-xl bg-white shadow-sm border border-gray-200 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300 shrink-0">
                                                <Phone className="w-6 h-6" />
                                            </div>

                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-1">Mobile & WhatsApp</h4>
                                                <p className="text-gray-500 text-xs sm:text-sm mb-1.5">Mon-Sat from 10am to 8pm (Sun Closed):</p>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowContactChoice(true)}
                                                    className="text-black font-bold text-lg hover:text-red-600 transition-colors cursor-pointer text-left flex items-center gap-2 flex-wrap"
                                                >
                                                    <span>+91 95265 11511</span>
                                                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Choose Call / WhatsApp</span>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 pl-14 sm:pl-0">
                                            <a
                                                href="https://wa.me/919526511511?text=Hi%20Boatrider%20Sports%2C%20I%20have%20an%20enquiry"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm shadow-emerald-500/20"
                                            >
                                                <WhatsAppIcon className="w-4 h-4 fill-current" />
                                                <span>WhatsApp</span>
                                            </a>
                                            <a
                                                href="tel:+919526511511"
                                                className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-red-600 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                                            >
                                                <Phone className="w-4 h-4" />
                                                <span>Call</span>
                                            </a>
                                        </div>
                                    </div>

                                    {/* Landline Card */}
                                    <div className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-200 hover:shadow-lg transition-all duration-300 group">
                                        <div className="p-3 rounded-xl bg-white shadow-sm border border-gray-200 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300 shrink-0">
                                            <LandlineIcon className="w-6 h-6" />
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Landline</h4>
                                            <p className="text-gray-500 text-xs sm:text-sm mb-1">Direct office dial (Mon-Sat 10am to 8pm):</p>
                                            <a
                                                href="tel:04954850666"
                                                className="text-black font-bold text-lg hover:text-red-600 transition-colors inline-flex items-center gap-2"
                                            >
                                                <span>0495 4850666</span>
                                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-200 text-zinc-700">Tap to call</span>
                                            </a>
                                        </div>
                                    </div>

                                </div>

                            </div>



                            {/* Hours */}
                            <div className="p-8 rounded-3xl bg-black text-white relative overflow-hidden">

                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <Clock className="w-32 h-32" />
                                </div>

                                <h4 className="text-xl font-bold mb-4 relative z-10">Opening Hours</h4>

                                <ul className="space-y-3 relative z-10 text-gray-300">

                                    <li className="flex justify-between items-center">
                                        <span>Monday - Saturday</span>
                                        <span className="font-medium text-white">10:00 AM - 8:00 PM</span>
                                    </li>

                                    <li className="flex justify-between items-center">
                                        <span>Sunday</span>
                                        <span className="font-bold text-red-400">Closed</span>
                                    </li>

                                </ul>

                            </div>

                        </div>

                    </motion.div>

                </motion.div>

            </section>



            {/* ================= MAP SECTION (Visual Polish) ================= */}
            <section className="w-full h-[400px] bg-gray-100 transition-all duration-700 relative group overflow-hidden">

                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3541.287250595887!2d75.78213747452286!3d11.24302585041498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba6596b4044716b%3A0xcc9e722a120ccb24!2sBoatrider%20Sports!5e1!3m2!1sen!2sin!4v1768884767688!5m2!1sen!2sin" width="600" height="450" className="w-full h-full" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

            </section>


            {/* WhatsApp or Call Choice Modal */}
            <AnimatePresence>
                {showContactChoice && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowContactChoice(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl z-10 border border-gray-100"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Connect with Us</h3>
                                    <p className="text-sm font-semibold text-gray-500">+91 95265 11511</p>
                                </div>
                                <button
                                    onClick={() => setShowContactChoice(false)}
                                    className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition cursor-pointer"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                                How would you like to reach our customer support team? Choose an option below:
                            </p>

                            <div className="space-y-3">
                                <a
                                    href="https://wa.me/919526511511?text=Hi%20Boatrider%20Sports%2C%20I%20have%20an%20enquiry"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setShowContactChoice(false)}
                                    className="flex items-center justify-between p-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white transition-all shadow-lg shadow-emerald-500/25 group cursor-pointer"
                                >
                                    <div className="flex items-center gap-3.5">
                                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                            <WhatsAppIcon className="w-6 h-6 fill-current" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-base">Chat on WhatsApp</div>
                                            <div className="text-xs text-emerald-100">Quick replies & product catalogs</div>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </a>

                                <a
                                    href="tel:+919526511511"
                                    onClick={() => setShowContactChoice(false)}
                                    className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900 hover:bg-red-600 text-white transition-all shadow-lg group cursor-pointer"
                                >
                                    <div className="flex items-center gap-3.5">
                                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-base">Voice Call</div>
                                            <div className="text-xs text-zinc-400">Direct phone conversation</div>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
