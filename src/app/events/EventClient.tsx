"use client";


import { motion } from 'framer-motion';
import { Calendar, Users, Route, Award, CalendarX } from 'lucide-react';
import HeroSlider from '@/components/events/HeroSlider';
import CountUp from '@/components/events/CountUp';



export default function EventsPage() {


    const heroSlides = [
        {
            image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1920&q=80',
            title: 'Upcoming Events',
            subtitle: 'Join our community rides, races, and workshops',
            cta: {
                text: 'Register Now',
                action: () => console.log('Register clicked')
            }
        },
        {
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
            title: 'Mountain Adventures',
            subtitle: 'Experience thrilling trails and breathtaking views',
            cta: {
                text: 'Explore Events',
                action: () => console.log('Explore clicked')
            }
        },
        {
            image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1920&q=80',
            title: 'Competitive Racing',
            subtitle: 'Test your limits in our championship events',
            cta: {
                text: 'View Races',
                action: () => console.log('View races clicked')
            }
        }
    ];


    const statsData = [
        { icon: Calendar, value: 804, label: 'Rides & Events', color: 'from-blue-500 to-cyan-500' },
        { icon: Users, value: 3267, label: 'Users Joined', color: 'from-purple-500 to-pink-500' },
        { icon: Route, value: 30, suffix: ' kms', label: 'Distance Covered', color: 'from-orange-500 to-red-500' },
        { icon: Award, value: 70, label: 'Total Winners', color: 'from-green-500 to-emerald-500' }
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50">
            {/* Hero Slider */}
            <HeroSlider slides={heroSlides} />

            {/* Stats Section */}
            <section className="py-10 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }} />
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
                                    className={`w-20 h-20 mx-auto mb-6 bg-linear-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-2xl`}
                                >
                                    <stat.icon className="w-10 h-10 text-white" />
                                </motion.div>
                                <div className="text-5xl md:text-6xl font-bold mb-3 bg-linear-to-br from-white to-gray-300 bg-clip-text text-transparent">
                                    <CountUp end={stat.value} suffix={stat.suffix || ''} />
                                </div>
                                <div className="text-gray-400 font-medium text-sm md:text-base">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Events Section */}
            <section className="py-12">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-10">

                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Our Rides &amp; Events
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Discover exciting cycling events, from casual rides to competitive races
                        </p>
                    </motion.div>

                    {/* No Upcoming Events Empty State */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center justify-center py-24 px-6"
                    >
                        <div className="relative mb-8">
                            {/* Outer glow ring */}
                            <div className="absolute inset-0 rounded-full bg-gray-100 blur-xl scale-125 opacity-70" />
                            <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-inner">
                                <CalendarX className="w-14 h-14 text-gray-400" strokeWidth={1.5} />
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-3">No Upcoming Events</h3>
                        <p className="text-gray-500 text-center max-w-md leading-relaxed">
                            We're busy planning something exciting for you. Check back soon for our upcoming rides, races, and workshops!
                        </p>

                        <div className="mt-8 flex items-center gap-2 px-5 py-3 rounded-full bg-gray-100 text-gray-600 text-sm font-medium">
                            <Calendar className="w-4 h-4" />
                            Stay tuned — events are coming soon
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }} />
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Ready to Join the Ride?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Be part of our growing cycling community and experience the thrill of group rides
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-14 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-all hover:scale-105">
                                Contact Us
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
