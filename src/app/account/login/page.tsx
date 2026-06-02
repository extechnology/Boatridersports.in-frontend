'use client';

import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Bike, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin, useGoogleAuth } from '@/service/auth/useAuth';
import { useGoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';





// login schema
const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
    remember: z.boolean().optional(),
});



type LoginFormData = z.infer<typeof loginSchema>;



function LoginContent() {


    // router instance
    const router = useRouter();


    // search params instance
    const searchParams = useSearchParams();


    // password visibility state
    const [showPassword, setShowPassword] = useState(false);



    // login mutation
    const loginMutation = useLogin();



    // form hook
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            remember: false,
        },
    });



    // on submit handler
    const onSubmit = (data: LoginFormData) => {

        // create form data
        const formData = new FormData();
        formData.append("identifier", data.email);
        formData.append("password", data.password);

        // login mutation
        loginMutation.mutate(formData, {
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




    const googleAuthMutation = useGoogleAuth();

    // google login handler
    const handleGoogleLogin = useGoogleLogin({

        onSuccess: (codeResponse) => {
        
            const formData = new FormData();
        
            formData.append('token', codeResponse.access_token);
        
            googleAuthMutation.mutate(formData, {

                onSuccess: () => {
                
                    const redirect = searchParams.get('redirect');
                
                    if (redirect) {
                
                        router.push(redirect);
                
                    } else {
                
                        router.push('/account');
                
                    }
                
                }
           
            });
        
        },
        
        onError: (error) => console.log('Login Failed:', error)
    
    });



    return (


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
                            <h1 className="text-4xl font-bold text-gray-900">Welcome Back</h1>
                            <p className="text-gray-600">Sign in to continue your journey</p>
                        </div>
     
                    </div>


                    <div className="space-y-4 pt-8">

                        {[
                            { title: 'Track Your Orders', desc: 'Monitor your deliveries in real-time' },
                            { title: 'Exclusive Deals', desc: 'Get access to member-only discounts' },
                            { title: 'Saved Addresses', desc: 'Quick checkout with saved information' }

                        ].map((feature, index) => (

                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                                className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-colors"
                            >

                                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                                    <ArrowRight className="w-5 h-5 text-gray-600" />
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



            {/* Right Side - Login Form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full"
            >

                <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 md:p-10">


                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center gap-3 mb-8">

                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-gray-900 to-gray-700 flex items-center justify-center">
                            <Bike className="w-6 h-6 text-white" />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
                            <p className="text-sm text-gray-600">Welcome back!</p>
                        </div>

                    </div>


                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {/* Email */}
                        <div>

                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Email Address
                            </label>

                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    {...register('email')}
                                    placeholder="you@example.com"
                                    className={`w-full pl-12 pr-4 py-3.5 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all`}
                                />
                            </div>

                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
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
                                    {...register('password')}
                                    placeholder="Enter your password"
                                    className={`w-full pl-12 pr-12 py-3.5 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all`}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>

                            </div>

                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                            )}

                        </div>


                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    {...register('remember')}
                                    className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                                />
                                <span className="text-sm text-gray-600">Remember me</span>
                            </label>
                            <Link href="/forgot-password" className="text-sm font-semibold text-gray-900 hover:text-gray-700">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loginMutation.isPending}
                            className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loginMutation.isPending ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </motion.button>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        {/* Google Login */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            disabled={googleAuthMutation.isPending}
                            onClick={() => handleGoogleLogin()}
                            className="w-full py-3.5 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {googleAuthMutation.isPending ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                            )}
                            {googleAuthMutation.isPending ? 'Connecting...' : 'Continue with Google'}
                        </motion.button>
                    </form>

                    {/* Sign Up Link */}
                    <p className="mt-8 text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link href="/account/register" className="font-semibold text-gray-900 hover:text-gray-700">
                            Sign up for free
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <GoogleOAuthProvider clientId="768569011649-56clmsu38kekioqk07fd533un5djk3ef.apps.googleusercontent.com">
            <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center p-4 pt-20">
                <Suspense fallback={<div className="flex items-center justify-center w-full h-64"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>}>
                    <LoginContent />
                </Suspense>
            </div>
        </GoogleOAuthProvider>
    );
}
