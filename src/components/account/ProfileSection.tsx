'use client';

import { motion } from 'framer-motion';
import { Package, MapPin, Mail, Phone, ShoppingCart, Loader2, AlertCircle } from 'lucide-react';
import { useCheckLogin } from '@/service/auth/useAuth';



export default function ProfileSection() {


    // fetch user data
    const { data, isLoading, isError } = useCheckLogin();



    // Error Ui
    if (isError) {

        return (

            <div className="flex justify-center py-12 px-4">
                <div className="flex flex-col justify-center items-center gap-3 bg-white px-5 py-4">
                   
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
                        <AlertCircle className="h-10 w-10 text-red-500" />
                    </div>

                    <div className="text-center">
                        <p className="text-md font-semibold text-slate-900">
                            Something went wrong !
                        </p>
                        <p className="text-sm text-slate-500">
                            Failed to load your profile. Please try again later
                        </p>
                    </div>
                </div>
            </div>

        )

    }



    // Loading State
    if (isLoading) {

        return (

            <div className="flex justify-center py-12">

                <Loader2 className="w-8 h-8 animate-spin text-gray-900" />

            </div>

        );

    }


    return (


        <div className="space-y-4">


            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            </div>


            {/* Profile Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-linear-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white relative overflow-hidden"
            >


                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
                </div>


                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">


                    {/* Avatar */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative"
                    >

                        <div className="w-24 h-24 rounded-full bg-linear-to-br from-red-500 to-orange-900 p-1">

                            <div className="w-full h-full rounded-full bg-white p-1">

                                {/* <Image
                                    src={currentUser.avatar || '/default-avatar.png'}
                                    alt={currentUser.name}
                                    width={88}
                                    height={88}
                                    className="w-full h-full rounded-full object-cover"
                                /> */}


                                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="" className="w-full h-full rounded-full object-cover" />

                            </div>

                        </div>

                    </motion.div>



                    {/* User Info */}
                    <div className="flex-1">

                        <h2 className="text-2xl font-bold mb-2">{data?.user?.username}</h2>

                        <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-300">

                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <span>{data?.user?.email}</span>
                            </div>

                            {data?.user?.phone && (
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    <span>{data?.user?.phone}</span>
                                </div>
                            )}

                        </div>

                    </div>

                </div>

            </motion.div>




            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">


                {/* Total Orders */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all group"
                >

                    <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <Package className="w-6 h-6 text-blue-600" />
                        </div>

                        <div>
                            <p className="text-2xl font-bold text-gray-900">{data?.user?.total_orders}</p>
                            <p className="text-sm text-gray-600 font-medium">Total Orders</p>
                        </div>

                    </div>

                </motion.div>



                {/* Addresses */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all group"
                >

                    <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                            <MapPin className="w-6 h-6 text-green-600" />
                        </div>

                        <div>
                            <p className="text-2xl font-bold text-gray-900">{data?.user?.address_count}</p>
                            <p className="text-sm text-gray-600 font-medium">Addresses</p>
                        </div>

                    </div>

                </motion.div>


                {/* Cart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all group"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                            <ShoppingCart className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{data?.user?.cart_count}</p>
                            <p className="text-sm text-gray-600 font-medium">Cart</p>
                        </div>
                    </div>
                </motion.div>



                {/* Total Spent */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all group"
                >

                    <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                            <Package className="w-6 h-6 text-purple-600" />
                        </div>

                        <div>
                            <p className="text-2xl font-bold text-gray-900">₹{data?.user?.total_spend.toLocaleString()}</p>
                            <p className="text-sm text-gray-600 font-medium">Total Spent</p>
                        </div>

                    </div>

                </motion.div>

            </div>

        </div>

    );


}
