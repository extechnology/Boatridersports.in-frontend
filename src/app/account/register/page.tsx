'use client';

import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Bike, Check, Loader2, ShieldCheck, RefreshCw } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegister, useVerifyOtp, useResendOtp } from '@/service/auth/useAuth';




// register schema
const registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    identifier: z.string().email("Email address is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    terms: z.boolean().refine(val => val === true, {
        message: "You must accept the terms and conditions"
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});



type RegisterFormData = z.infer<typeof registerSchema>;



// otp schema
const otpSchema = z.object({
    otp: z.string().min(1, "OTP is required"),
});



type OtpFormData = z.infer<typeof otpSchema>;



function RegisterContent() {


    const router = useRouter();
    const searchParams = useSearchParams();


    const [showPassword, setShowPassword] = useState(false);


    const [showConfirmPassword, setShowConfirmPassword] = useState(false);



    // State to toggle between register form and OTP form
    const [step, setStep] = useState<'register' | 'otp'>('register');



    // Store credentials to be passed to verify OTP
    const [credentials, setCredentials] = useState({
        username: '',
        identifier: '',
        password: ''
    });



    // api calls
    const registerMutation = useRegister();
    const verifyOtpMutation = useVerifyOtp();
    const resendOtpMutation = useResendOtp();


    // register form
    const {
        register: registerForm,
        handleSubmit: handleRegisterSubmit,
        formState: { errors: registerErrors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: '',
            identifier: '',
            password: '',
            confirmPassword: '',
            terms: false,
        },
    });


    // otp form
    const {
        register: otpForm,
        handleSubmit: handleOtpSubmit,
        formState: { errors: otpErrors },
    } = useForm<OtpFormData>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: ''
        }
    });



    // handle register form
    const onRegister = (data: RegisterFormData) => {

        const formData = new FormData();
        formData.append("identifier", data.identifier);
        formData.append("username", data.username);
        formData.append("password", data.password);

        registerMutation.mutate(formData, {
            onSuccess: () => {
                setCredentials({
                    username: data.username,
                    identifier: data.identifier,
                    password: data.password
                });
                setStep('otp');
            }
        });

    };



    // handle verify otp form
    const onVerifyOtp = (data: OtpFormData) => {

        const formData = new FormData();

        formData.append("identifier", credentials.identifier);
        formData.append("username", credentials.username);
        formData.append("password", credentials.password);
        formData.append("otp", data.otp);

        verifyOtpMutation.mutate(formData, {
            onSuccess: () => {
                const redirect = searchParams.get('redirect');
                if (redirect) {
                    router.push(redirect);
                } else {
                    router.push('/account');
                }
            }
        });

    };



    // handle resend otp
    const handleResendOtp = () => {
        const formData = new FormData();
        formData.append("identifier", credentials.identifier);
        resendOtpMutation.mutate(formData);
    };



    return (


        <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center p-4 pt-20 pb-8">


            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">


                {/* Left Side - Branding */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="hidden lg:block"
                >
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-gray-900 to-gray-700 flex items-center justify-center">
                                <Bike className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900">Join Us Today</h1>
                                <p className="text-gray-600">Create your account in seconds</p>
                            </div>
                        </div>

                        <div className="space-y-4 pt-8">
                            {[
                                { title: 'Free Shipping', desc: 'On orders over ₹5,000' },
                                { title: 'Exclusive Rewards', desc: 'Earn points on every purchase' },
                                { title: 'Expert Support', desc: '24/7 customer assistance' },
                                { title: 'Easy Returns', desc: '30-day hassle-free returns' }
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-colors"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                                        <Check className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                                        <p className="text-sm text-gray-600">{feature.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>


                {/* Right Side - Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full"
                >
                    <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 md:p-10 relative overflow-hidden">

                        <AnimatePresence mode="wait">
                            {step === 'register' ? (
                                <motion.div
                                    key="register-form"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Mobile Logo */}
                                    <div className="lg:hidden flex items-center gap-3 mb-8">
                                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-gray-900 to-gray-700 flex items-center justify-center">
                                            <Bike className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
                                            <p className="text-sm text-gray-600">Join us today!</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleRegisterSubmit(onRegister)} className="space-y-5">
                                        {/* Username */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                Username
                                            </label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    {...registerForm('username')}
                                                    placeholder="johndoe"
                                                    className={`w-full pl-12 pr-4 py-3.5 border ${registerErrors.username ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all`}
                                                />
                                            </div>
                                            {registerErrors.username && (
                                                <p className="mt-1 text-sm text-red-500">{registerErrors.username.message}</p>
                                            )}
                                        </div>

                                        {/* Identifier (Email or Phone) */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                Email or Phone Number
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    {...registerForm('identifier')}
                                                    placeholder="Email Address"
                                                    className={`w-full pl-12 pr-4 py-3.5 border ${registerErrors.identifier ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all`}
                                                />
                                            </div>
                                            {registerErrors.identifier && (
                                                <p className="mt-1 text-sm text-red-500">{registerErrors.identifier.message}</p>
                                            )}
                                        </div>

                                        {/* Password */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                Password
                                            </label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    {...registerForm('password')}
                                                    placeholder="Create a strong password"
                                                    className={`w-full pl-12 pr-12 py-3.5 border ${registerErrors.password ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all`}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                >
                                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                            {registerErrors.password && (
                                                <p className="mt-1 text-sm text-red-500">{registerErrors.password.message}</p>
                                            )}
                                        </div>

                                        {/* Confirm Password */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                Confirm Password
                                            </label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    {...registerForm('confirmPassword')}
                                                    placeholder="Confirm your password"
                                                    className={`w-full pl-12 pr-12 py-3.5 border ${registerErrors.confirmPassword ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all`}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                >
                                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                            {registerErrors.confirmPassword && (
                                                <p className="mt-1 text-sm text-red-500">{registerErrors.confirmPassword.message}</p>
                                            )}
                                        </div>

                                        {/* Terms */}
                                        <div>
                                            <div className="flex items-start gap-3">
                                                <input
                                                    type="checkbox"
                                                    id="terms"
                                                    {...registerForm('terms')}
                                                    className="mt-1 w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                                                />
                                                <label htmlFor="terms" className="text-sm text-gray-600">
                                                    I agree to the{' '}
                                                    <Link href="/terms" className="font-semibold text-gray-900 hover:text-gray-700">
                                                        Terms of Service
                                                    </Link>
                                                    {' '}and{' '}
                                                    <Link href="/privacy" className="font-semibold text-gray-900 hover:text-gray-700">
                                                        Privacy Policy
                                                    </Link>
                                                </label>
                                            </div>
                                            {registerErrors.terms && (
                                                <p className="mt-1 text-sm text-red-500">{registerErrors.terms.message}</p>
                                            )}
                                        </div>

                                        {/* Submit Button */}
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            disabled={registerMutation.isPending}
                                            className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {registerMutation.isPending ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                <>
                                                    Create Account
                                                    <ArrowRight className="w-5 h-5" />
                                                </>
                                            )}
                                        </motion.button>



                                    </form>

                                    {/* Sign In Link */}
                                    <p className="mt-8 text-center text-sm text-gray-600">
                                        Already have an account?{' '}
                                        <Link href="/account/login" className="font-semibold text-gray-900 hover:text-gray-700">
                                            Sign in
                                        </Link>
                                    </p>

                                </motion.div>


                            ) : (
                                <motion.div
                                    key="otp-form"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="text-center mb-8">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <ShieldCheck className="w-8 h-8 text-gray-900" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify OTP</h2>
                                        <p className="text-sm text-gray-600">
                                            Please enter the code sent to<br />
                                            <span className="font-medium text-gray-900">{credentials.identifier}</span>
                                        </p>
                                    </div>

                                    <form onSubmit={handleOtpSubmit(onVerifyOtp)} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2 text-center">
                                                Authentication Code
                                            </label>
                                            <input
                                                type="text"
                                                {...otpForm('otp')}
                                                placeholder="Enter OTP"
                                                className={`w-full px-4 py-4 text-center text-xl tracking-widest border ${otpErrors.otp ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all`}
                                            />
                                            {otpErrors.otp && (
                                                <p className="mt-2 text-sm text-red-500 text-center">{otpErrors.otp.message}</p>
                                            )}
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            disabled={verifyOtpMutation.isPending}
                                            className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {verifyOtpMutation.isPending ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                'Verify & Continue'
                                            )}
                                        </motion.button>
                                    </form>

                                    <div className="mt-8 text-center">
                                        <p className="text-sm text-gray-600 mb-4">Didn't receive the code?</p>
                                        <button
                                            onClick={handleResendOtp}
                                            disabled={resendOtpMutation.isPending}
                                            className="flex items-center justify-center gap-2 mx-auto text-sm font-semibold text-gray-900 hover:text-gray-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                                        >
                                            {resendOtpMutation.isPending ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <RefreshCw className="w-4 h-4" />
                                            )}
                                            Resend Code
                                        </button>

                                        <button
                                            onClick={() => setStep('register')}
                                            className="mt-6 text-sm text-gray-500 hover:text-gray-700 underline"
                                        >
                                            Change email or phone number
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default function RegisterPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center p-4">
                <Loader2 className="w-8 h-8 animate-spin text-gray-900" />
            </div>
        }>
            <RegisterContent />
        </Suspense>
    );
}
