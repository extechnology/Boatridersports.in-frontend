"use client";


import { motion, useScroll, useTransform } from "framer-motion";
import { BadgeCheck, Bike, Gauge, ShieldCheck, Trophy, Wind, Zap } from "lucide-react";
import { useRef } from "react";



const features = [
    {
        icon: Bike,
        title: "Premium Bikes Brands",
        desc: "Curated selection of world-class, high-performance bicycles.",
        color: "from-blue-500 to-cyan-500"
    },
    {
        icon: Zap,
        title: "Authorized Distributor",
        desc: "Genuine products backed by official manufacturer warranties.",
        color: "from-yellow-400 to-orange-500"
    },
    {
        icon: Gauge,
        title: "Expert Guidance",
        desc: "Professional advice to match riders with perfect bicycles.",
        color: "from-red-500 to-pink-500"
    },
    {
        icon: ShieldCheck,
        title: "Lifetime Warranty",
        desc: "We stand behind our craftsmanship with an industry-leading global warranty.",
        color: "from-green-500 to-emerald-500"
    },
    {
        icon: Trophy,
        title: "Complete Cycling Solutions",
        desc: "Sales, accessories, service, and after-sales support.",
        color: "from-purple-500 to-indigo-500"
    },
    {
        icon: BadgeCheck,
        title: "Trusted Retail Experience",
        desc: "Quality, reliability, and customer satisfaction guaranteed.",
        color: "from-blue-500 to-cyan-500"
    }
];




export default function ImmersiveFeatures() {


    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });


    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);



    return (


        <section ref={containerRef} className="relative py-8 bg-black text-white overflow-hidden">


            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] right-[5%] w-[40%] h-[40%] bg-blue-900/20 blur-[100px] rounded-full" />
            </div>


            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">


                    <div className="space-y-12">

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-sm font-bold tracking-[0.3em] text-gray-500 uppercase mb-4">Why Choose Us</h2>
                            <h3 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-6">
                                EXPERT CARE AND RELIABLE SERVICE <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-gray-500">FOR EVERY RIDE YOU TAKE!</span>
                            </h3>
                            <p className="text-lg text-gray-400 max-w-lg leading-relaxed text-justify">
                                Boatrider is a trusted distributor and retail shop of premium bicycles, offering world-class brands, high-performance models, and expert service for cycling enthusiasts and professionals alike.
                            </p>
                        </motion.div>



                        <div className="grid gap-8">


                            {features.map((feature, idx) => (

                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                                    className="flex items-start gap-4 group"
                                >

                                    <div className={`p-3 rounded-xl bg-linear-to-br ${feature.color} bg-opacity-10 shadow-lg shadow-white/5 group-hover:scale-110 transition-transform duration-300`}>
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>

                                    <div>
                                        <h4 className="text-xl font-bold mb-0 group-hover:text-white transition-colors duration-300">{feature.title}</h4>
                                        <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{feature.desc}</p>
                                    </div>

                                </motion.div>

                            ))}

                        </div>

                    </div>



                    <motion.div
                        style={{ y: y1 }}
                        className="relative h-[600px] lg:h-[900px] w-full rounded-3xl overflow-hidden hidden lg:block mt-20"
                    >

                        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent z-10" />


                        <img
                            src="/1000x667px home page why us.jpg.jpeg"
                            alt="Engineering Excellence"
                            className="absolute inset-0 h-full w-full object-cover"
                            loading="lazy"
                        />


                        {/* Floating Stat Card 1 */}
                        <motion.div
                            style={{ y: y2 }}
                            className="absolute top-20 right-10 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl z-20 w-48"
                        >
                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Max Speed</p>
                            <p className="text-3xl font-bold text-white">45<span className="text-sm">km/h</span></p>
                        </motion.div>

                        {/* Floating Stat Card 2 */}
                        <motion.div
                            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 30]) }}
                            className="absolute bottom-40 left-10 bg-black/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl z-20 w-56"
                        >

                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <p className="text-xs text-gray-400 uppercase tracking-wider">Status</p>
                            </div>

                            <p className="text-lg font-bold text-white">Wind Tunnel Tested</p>

                        </motion.div>

                    </motion.div>


                </div>

            </div>

        </section>

    );

}
