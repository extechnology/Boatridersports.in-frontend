"use client";


import { motion, Variants } from "framer-motion";
import { CheckCircle2, Users, ArrowRight, Wrench, Heart, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CountUp from "@/components/ui/CountUp";




export default function AboutClient() {


    // Animation Variants
    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };


    // Stagger Animation
    const stagger: Variants = {
        visible: { transition: { staggerChildren: 0.15 } },
    };



    const cardVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 40,
        },
        visible: (index: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
                delay: index * 0.15,
            },
        }),
    };



    return (


        <div className="min-h-screen bg-white text-gray-900 font-sans">



            {/* ================= HERO SECTION ================= */}
            <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">


                {/* Background Overlay */}
                <div className="absolute inset-0 z-10 bg-linear-to-b from-black/70 via-black/50 to-transparent" />


                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/BANNER IMAGE 1920X1080 PX.jpg.jpeg"
                        loading="lazy"
                        alt="Cyclist sunset"
                        className="object-cover object-center w-full h-full"
                    />
                </div>


                {/* Hero Content */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="relative z-20 text-center text-white px-4 max-w-5xl mx-auto"
                >

                    <motion.h1
                        className="text-5xl md:text-8xl lg:text-8xl font-black mb-6 tracking-tighter leading-none"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        RIDE <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-red-800">BEYOND</span> <br /> LIMITS
                    </motion.h1>


                    <motion.p
                        className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto font-medium leading-relaxed mb-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        We don't just sell bikes we curate freedom. Join a community driven by performance, passion, and the open road.
                    </motion.p>

                </motion.div>

                {/* Curve Separator */}
                <div className="absolute bottom-0 left-0 w-full z-20 translate-y-px">
                    <svg viewBox="0 0 1440 120" className="w-full h-[60px] md:h-[110px] fill-white block" preserveAspectRatio="none">
                        <path d="M0,0 C480,100 960,100 1440,0 V120 H0 Z" />
                    </svg>
                </div>

            </section>



            {/* ================= MISSION SECTION (PRESERVED) ================= */}
            <section className="py-2 pb-5 md:py-6 md:pb-10 px-2 sm:px-6 lg:px-8 max-w-7xl mx-auto">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-24 items-center">

                    {/* Image Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >

                        <div className="relative aspect-4/5 overflow-hidden rounded-2xl shadow-2xl">

                            <img
                                src="/1500X1500px  Boatrider About us images.jpg.jpeg"
                                loading="lazy"
                                alt="Mechanic working on bike"
                                className="absolute inset-0 h-full w-full object-cover"
                            />

                        </div>


                        {/* Floating Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="absolute -bottom-8 -right-8 md:bottom-12 md:-right-12 bg-white p-6 md:p-8 rounded-2xl shadow-xl max-w-xs border border-gray-100 hidden md:block"
                        >
                            <p className="text-4xl font-bold text-red-600 mb-2">15+</p>
                            <p className="text-gray-600 font-medium">Years of excellence in servicing and selling premium bikes.</p>
                        </motion.div>

                    </motion.div>


                    {/* Content */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={stagger}
                    >

                        <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                            More Than Just a <span className="text-red-500">Bike Shop</span>
                        </motion.h2>

                        <motion.p variants={fadeInUp} className="text-lg text-gray-600 mb-6 leading-relaxed text-justify">
                            Boatrider is a trusted dealer and distributor of premium bicycles and bikes with over 15 years of industry experience. Built on passion, performance, and perseverance, Boatrider stands for quality, reliability, and customer satisfaction. What began as a focused initiative to deliver world-class bicycles has grown into a complete destination for riders of all ages and skill levels.
                        </motion.p>

                        <motion.p variants={fadeInUp} className="text-lg text-gray-600 mb-8 leading-relaxed text-justify">
                            We believe cycling is more than transport—it’s a lifestyle, fitness choice, and passion. By partnering with reputed brands, we ensure products that meet international standards in design, durability, and safety while adapting to evolving rider needs and trends.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">

                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-6 h-6 text-red-600 shrink-0" />
                                <span className="font-semibold text-gray-800">Premium Brands Only</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-6 h-6 text-red-600 shrink-0" />
                                <span className="font-semibold text-gray-800">Expert Mechanics</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-6 h-6 text-red-600 shrink-0" />
                                <span className="font-semibold text-gray-800">Lifetime Support</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-6 h-6 text-red-600 shrink-0" />
                                <span className="font-semibold text-gray-800">Community Events</span>
                            </div>

                        </motion.div>

                        <motion.div variants={fadeInUp}>

                            <Link href="/contact">

                                <Button size="lg" className="bg-black text-white hover:bg-red-600 rounded-full px-8 py-6 text-lg transition-all duration-300">
                                    Get in Touch <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>

                            </Link>

                        </motion.div>
                    </motion.div>

                </div>

            </section>



            {/* ================= CHAIRMAN MESSAGE SECTION ================= */}
            <section className="py-2 pb-5 md:py-6 md:pb-10 px-2 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white relative overflow-hidden border-t border-gray-200">


                {/* Background Pattern */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-red-50 rounded-full blur-[120px] opacity-40 pointer-events-none" />
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gray-100 rounded-full blur-[100px] opacity-40 pointer-events-none" />


                <div className="max-w-7xl mx-auto relative z-10">


                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">


                        {/* Left Side: Profile Image */}
                        <motion.div
                            className="lg:col-span-5 relative"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >

                            <div className="relative rounded-[3rem] overflow-hidden aspect-4/5 shadow-2xl">

                                <img
                                    src="/2670x1780.jpg.jpeg"
                                    loading="lazy"
                                    alt="Chairman Vision"
                                    className="w-full h-full object-cover"
                                />

                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                                <div className="absolute bottom-10 left-10 right-10">
                                    <p className="text-red-500 font-bold tracking-widest text-sm uppercase mb-2">Leadership</p>
                                    <h3 className="text-3xl font-bold text-white mb-1">Mr. Sananth</h3>
                                    <p className="text-gray-300 text-sm font-medium">Chairman of Boatrider</p>
                                </div>

                            </div>


                            {/* Floating Quote Icon */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-8 -right-8 w-24 h-24 bg-red-600 rounded-3xl items-center justify-center shadow-2xl shadow-red-200 hidden md:flex"
                            >
                                <Quote className="w-10 h-10 text-white" />
                            </motion.div>
                        </motion.div>


                        {/* Right Side: Message Content */}
                        <motion.div
                            className="lg:col-span-7"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >

                            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-8">
                                Trust is our <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-red-800">Most Valuable</span> Asset
                            </motion.h2>

                            <motion.div variants={fadeInUp} className="space-y-8">
                                <p className="text-xl md:text-2xl text-gray-700 italic font-medium leading-relaxed border-l-4 border-red-600 pl-8 py-2">
                                    "At the heart of Boatrider’s success is a clear vision and strong leadership. We believe that trust is the most valuable asset in any business. From the very beginning, the focus has been on building long-term relationships rather than short-term gains."
                                </p>

                                <div className="space-y-6 text-lg text-gray-600 leading-relaxed text-justify">
                                    <p>
                                        “Over the last 15 years, Boatrider has been driven by one simple principle—deliver the best, without compromise. Every bicycle or bike that carries our name reflects our commitment to quality, safety, and customer satisfaction. We have witnessed the cycling culture grow and evolve, and we are proud to be a part of that journey.”
                                    </p>

                                    <p>
                                        “Our goal is not just to sell products, but to inspire healthier, more active lifestyles and a deeper connection with riding.”
                                    </p>

                                    <p className="text-gray-900 font-bold italic">
                                        We aim the vision of continues to guide Boatrider toward innovation, expansion, and excellence, while staying rooted in integrity and customer-first values.
                                    </p>
                                </div>

                            </motion.div>

                        </motion.div>

                    </div>

                </div>

            </section>


            {/* ================= COUNTERS / STATS SECTION ================= */}
            <section className="bg-gray-900 text-white py-12 sm:py-14 px-4">

                <div className="max-w-7xl mx-auto">

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 text-center md:divide-x md:divide-gray-800">


                        {/* Bikes Sold */}
                        <div className="px-2">
                            <div className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-linear-to-br from-white to-gray-500 mb-2">
                                <CountUp
                                    from={0}
                                    to={3000}
                                    separator=","
                                    direction="up"
                                    duration={1}
                                    className="count-up-text"
                                />+
                            </div>
                            <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest">
                                Bikes Sold
                            </div>
                        </div>


                        {/* Brands */}
                        <div className="px-2">
                            <div className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-linear-to-br from-white to-gray-500 mb-2">
                                <CountUp
                                    from={0}
                                    to={50}
                                    direction="up"
                                    duration={1}
                                    className="count-up-text"
                                />+
                            </div>
                            <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest">
                                Brands
                            </div>
                        </div>


                        {/* Happy Riders */}
                        <div className="px-2">
                            <div className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-linear-to-br from-white to-gray-500 mb-2">
                                <CountUp
                                    from={0}
                                    to={12000}
                                    separator=","
                                    direction="up"
                                    duration={1}
                                    className="count-up-text"
                                />+
                            </div>
                            <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest">
                                Happy Riders
                            </div>
                        </div>


                        {/* Support */}
                        <div className="px-2">

                            <div className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-linear-to-br from-white to-gray-500 mb-2">
                                24/7
                            </div>

                            <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest">
                                Support
                            </div>

                        </div>


                    </div>


                </div>


            </section>



            {/* ================= TEAM / EXPERTS SECTION ================= */}
            <section className="py-6 px-2 sm:py-12 sm:px-4 bg-gray-50">

                <div className="max-w-7xl mx-auto">

                    <div className="text-center mb-8">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet The <span className="text-red-600">Pros</span></h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">The passionate individuals behind Boat Rider who make every ride possible.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">

                        {[
                            {
                                name: "Alex Rivera",
                                role: "Head Mechanic",
                                image: "https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=2574&auto=format&fit=crop"
                            },
                            {
                                name: "Sarah Chen",
                                role: "Pro Cyclist & Consultant",
                                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop"
                            },
                            {
                                name: "Mike Ross",
                                role: "Store Manager",
                                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop"
                            }
                        ].map((member, i) => (

                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.3 }}
                                className="group relative overflow-hidden rounded-3xl h-[450px]"
                            >
                                <img src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80" />

                                <div className="absolute bottom-0 left-0 p-8 text-white">
                                    <p className="text-red-500 font-bold tracking-wider text-sm mb-1">{member.role}</p>
                                    <h3 className="text-2xl font-bold">{member.name}</h3>
                                </div>

                            </motion.div>

                        ))}

                    </div>

                </div>

            </section>


            {/* ================= FEATURES GRID ================= */}
            <section className="py-4 px-2 sm:py-10 sm:px-4 bg-white">

                <div className="max-w-7xl mx-auto">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-8">

                        <motion.div
                            custom={0}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="p-8 rounded-3xl bg-gray-50 hover:bg-black hover:text-white transition-all duration-300 group cursor-pointer border border-gray-200"
                        >
                            <Wrench className="w-12 h-12 text-red-600 mb-6" />
                            <h3 className="text-xl font-bold mb-3">Expert Service</h3>
                            <p className="text-gray-500 group-hover:text-gray-400">
                                Our certified technicians ensure your bike performs at its peak, handling everything from tune-ups to custom builds.
                            </p>
                        </motion.div>

                        <motion.div
                            custom={1}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="p-8 rounded-3xl bg-gray-50 hover:bg-black hover:text-white transition-all duration-300 group cursor-pointer border border-gray-200"
                        >
                            <Heart className="w-12 h-12 text-red-600 mb-6" />
                            <h3 className="text-xl font-bold mb-3">Passion Driven</h3>
                            <p className="text-gray-500 group-hover:text-gray-400">
                                We don't just work here; we ride here. Our passion for cycling drives every recommendation we make.
                            </p>
                        </motion.div>

                        <motion.div
                            custom={2}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="p-8 rounded-3xl bg-gray-50 hover:bg-black hover:text-white transition-all duration-300 group cursor-pointer border border-gray-200"
                        >
                            <Users className="w-12 h-12 text-red-600 mb-6" />
                            <h3 className="text-xl font-bold mb-3">Community Focused</h3>
                            <p className="text-gray-500 group-hover:text-gray-400">
                                From group rides to charity events, we're committed to building a stronger, healthier cycling community.
                            </p>
                        </motion.div>

                    </div>
                </div>
            </section>



            {/* ================= CTA SECTION ================= */}
            <section className="px-2 sm:px-16 sm:mb-8 mb-4">

                <div className="relative overflow-hidden rounded-3xl mx-auto">

                    {/* Background image */}
                    <img
                        src="/3000 × 2000 px.jpg.jpeg"
                        loading="lazy"
                        alt="CTA Background"
                        className="w-full h-[420px] md:h-[520px] object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/60" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">

                        {/* Top pill */}
                        <span className="mb-6 inline-block rounded-full bg-white px-6 py-2 text-sm font-medium text-gray-900 shadow">
                            Get Started Today
                        </span>

                        {/* Heading */}
                        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
                            “Life is like riding a bicycle.
                            <br className="hidden md:block" />
                            To keep your balance, you must keep moving.”
                        </h2>

                        {/* Author */}
                        <p className="text-gray-300 mb-10 text-base md:text-lg">
                            — Albert Einstein
                        </p>

                        <Link href="/shop">
                            <button className="group inline-flex items-center gap-3 rounded-full bg-red-600 px-12 py-4 text-base md:text-lg font-semibold text-white shadow-md transition-all duration-300 hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                Start Your Journey
                                <ArrowRight
                                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </button>
                        </Link>

                    </div>

                </div>

            </section>

        </div>


    )



}