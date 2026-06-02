'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Lock, Eye, EyeOff, Shield, Mail, Smartphone } from 'lucide-react';



export default function SettingsSection() {


    const [showPassword, setShowPassword] = useState(false);
    const [notifications, setNotifications] = useState({
        orderUpdates: true,
        promotions: false,
        newsletter: true,
        sms: false
    });



    return (


        <div className="space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
                <p className="text-gray-600 mt-1">Manage your preferences and security</p>
            </div>

            {/* Notifications Settings */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
            >
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                            <Bell className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
                            <p className="text-sm text-gray-600">Manage how you receive updates</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-4">
                    {/* Order Updates */}
                    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="font-semibold text-gray-900">Order Updates</p>
                                <p className="text-sm text-gray-600">Get notified about your order status</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setNotifications({ ...notifications, orderUpdates: !notifications.orderUpdates })}
                            className={`relative w-14 h-7 rounded-full transition-colors ${notifications.orderUpdates ? 'bg-green-500' : 'bg-gray-300'
                                }`}
                        >
                            <motion.div
                                animate={{ x: notifications.orderUpdates ? 28 : 2 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                            />
                        </button>
                    </div>

                    {/* Promotions */}
                    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <Bell className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="font-semibold text-gray-900">Promotional Emails</p>
                                <p className="text-sm text-gray-600">Receive offers and discounts</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setNotifications({ ...notifications, promotions: !notifications.promotions })}
                            className={`relative w-14 h-7 rounded-full transition-colors ${notifications.promotions ? 'bg-green-500' : 'bg-gray-300'
                                }`}
                        >
                            <motion.div
                                animate={{ x: notifications.promotions ? 28 : 2 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                            />
                        </button>
                    </div>

                    {/* Newsletter */}
                    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="font-semibold text-gray-900">Newsletter</p>
                                <p className="text-sm text-gray-600">Weekly cycling tips and news</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setNotifications({ ...notifications, newsletter: !notifications.newsletter })}
                            className={`relative w-14 h-7 rounded-full transition-colors ${notifications.newsletter ? 'bg-green-500' : 'bg-gray-300'
                                }`}
                        >
                            <motion.div
                                animate={{ x: notifications.newsletter ? 28 : 2 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                            />
                        </button>
                    </div>

                    {/* SMS Notifications */}
                    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <Smartphone className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="font-semibold text-gray-900">SMS Notifications</p>
                                <p className="text-sm text-gray-600">Get updates via text message</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setNotifications({ ...notifications, sms: !notifications.sms })}
                            className={`relative w-14 h-7 rounded-full transition-colors ${notifications.sms ? 'bg-green-500' : 'bg-gray-300'
                                }`}
                        >
                            <motion.div
                                animate={{ x: notifications.sms ? 28 : 2 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                            />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Security Settings */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
            >
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Security</h2>
                            <p className="text-sm text-gray-600">Manage your password and security</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-4">
                    {/* Current Password */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Current Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter current password"
                                className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            New Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter new password"
                                className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Confirm new password"
                                className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Update Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors mt-2"
                    >
                        Update Password
                    </motion.button>
                </div>
            </motion.div>

            {/* Danger Zone */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-red-50 rounded-2xl border border-red-200 p-6"
            >
                <h3 className="text-lg font-bold text-red-900 mb-2">Danger Zone</h3>
                <p className="text-sm text-red-700 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                </p>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
                >
                    Delete Account
                </motion.button>
            </motion.div>
        </div>
    );
}
