'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Home, Briefcase } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { UserAddress } from '@/service/profile/types';
import { useAddAddress, useUpdateAddress } from '@/service/profile/useProfile';



// Props interface
interface AddressFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    address?: UserAddress;
    mode: 'add' | 'edit';
}



// Address schema
const addressSchema = z.object({
    type: z.enum(['home', 'work', 'other']),
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(10, "Valid phone number is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pincode: z.string().regex(/^[0-9]{6}$/, "Pincode must be 6 digits"),
    isDefault: z.boolean()
});



type AddressFormValues = z.infer<typeof addressSchema>;



export default function AddressFormModal({ isOpen, onClose, address, mode }: AddressFormModalProps) {


    // API calls
    const addMutation = useAddAddress();
    const updateMutation = useUpdateAddress();

    
    // Form setup
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        control,
        formState: { errors }
    } = useForm<AddressFormValues>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            type: 'home',
            name: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            pincode: '',
            isDefault: false
        }
    });

    
    // Type value
    const typeValue = watch('type');



    // Effect for address
    useEffect(() => {
        if (isOpen) {
            if (mode === 'edit' && address) {
                reset({
                    type: (address.address_type?.toLowerCase() as 'home' | 'work' | 'other') || 'home',
                    name: address.name || '',
                    phone: address.phone_number || '',
                    address: address.address || '',
                    city: address.city || '',
                    state: address.state || '',
                    pincode: address.pincode || '',
                    isDefault: address.is_default || false
                });
            } else {
                reset({
                    type: 'home',
                    name: '',
                    phone: '',
                    address: '',
                    city: '',
                    state: '',
                    pincode: '',
                    isDefault: false
                });
            }
        }
    }, [isOpen, mode, address, reset]);




    // Form submission
    const onSubmit = (formData: AddressFormValues) => {
    
    
        const data = new FormData();
        
        data.append('name', formData.name);
        data.append('phone_number', formData.phone || '');
        data.append('address_type', formData.type.charAt(0).toUpperCase() + formData.type.slice(1));
        data.append('address', formData.address);
        data.append('city', formData.city);
        data.append('state', formData.state);
        data.append('pincode', formData.pincode);
        data.append('is_default', formData.isDefault.toString());


        if (mode === 'add') {
        
            addMutation.mutate(data, {
                onSuccess: () => {
                    reset();
                    onClose();
                }
            });
        
        } else if (address?.unique_id) {
        
            data.append('unique_id', address.unique_id);
        
            updateMutation.mutate(data, {
                onSuccess: () => {
                    onClose();
                }
            });
        }
    
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
                        >
                            {/* Header */}
                            <div className="bg-linear-to-br from-gray-900 to-gray-800 text-white p-6 flex items-center justify-between shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">
                                            {mode === 'add' ? 'Add New Address' : 'Edit Address'}
                                        </h2>
                                        <p className="text-sm text-gray-300">
                                            {mode === 'add' ? 'Add a new delivery address' : 'Update your delivery address'}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit(onSubmit)} className="p-6 overflow-y-auto">
                                <div className="space-y-5">
                                    {/* Address Type */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-3">
                                            Address Type
                                        </label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {[
                                                { value: 'home', label: 'Home', icon: Home },
                                                { value: 'work', label: 'Work', icon: Briefcase },
                                                { value: 'other', label: 'Other', icon: MapPin }
                                            ].map((type) => (
                                                <button
                                                    key={type.value}
                                                    type="button"
                                                    onClick={() => setValue('type', type.value as 'home' | 'work' | 'other')}
                                                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${typeValue === type.value
                                                        ? 'border-gray-900 bg-gray-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <type.icon className="w-5 h-5" />
                                                    <span className="text-sm font-semibold">{type.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                        {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>}
                                    </div>

                                    {/* Name and Phone */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                {...register('name')}
                                                placeholder="Enter full name"
                                                className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-gray-900'} rounded-xl focus:outline-none focus:ring-2 focus:border-transparent`}
                                            />
                                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                Phone Number *
                                            </label>
                                            <div className={`w-full bg-white border ${errors.phone ? 'border-red-500 focus-within:ring-red-500' : 'border-gray-200 focus-within:ring-gray-900'} rounded-xl focus-within:ring-2 focus-within:border-transparent px-4 py-3 transition-shadow`}>
                                                <Controller
                                                    name="phone"
                                                    control={control}
                                                    render={({ field: { onChange, value } }) => (
                                                        <PhoneInput
                                                            placeholder="Enter phone number"
                                                            value={value}
                                                            onChange={onChange}
                                                            defaultCountry="IN"
                                                            className="w-full bg-transparent outline-none focus:outline-none"
                                                            style={{ outline: 'none' }}
                                                        />
                                                    )}
                                                />
                                            </div>
                                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Address *
                                        </label>
                                        <input
                                            type="text"
                                            {...register('address')}
                                            placeholder="House/Flat No., Building Name, Street, Area"
                                            className={`w-full px-4 py-3 border ${errors.address ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-gray-900'} rounded-xl focus:outline-none focus:ring-2 focus:border-transparent`}
                                        />
                                        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                                    </div>

                                    {/* City, State, Pincode */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                City *
                                            </label>
                                            <input
                                                type="text"
                                                {...register('city')}
                                                placeholder="City"
                                                className={`w-full px-4 py-3 border ${errors.city ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-gray-900'} rounded-xl focus:outline-none focus:ring-2 focus:border-transparent`}
                                            />
                                            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                State *
                                            </label>
                                            <input
                                                type="text"
                                                {...register('state')}
                                                placeholder="State"
                                                className={`w-full px-4 py-3 border ${errors.state ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-gray-900'} rounded-xl focus:outline-none focus:ring-2 focus:border-transparent`}
                                            />
                                            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                Pincode *
                                            </label>
                                            <input
                                                type="text"
                                                {...register('pincode')}
                                                placeholder="560001"
                                                className={`w-full px-4 py-3 border ${errors.pincode ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-gray-900'} rounded-xl focus:outline-none focus:ring-2 focus:border-transparent`}
                                            />
                                            {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode.message}</p>}
                                        </div>
                                    </div>

                                    {/* Default Address */}
                                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                        <input
                                            type="checkbox"
                                            id="isDefault"
                                            {...register('isDefault')}
                                            className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                                        />
                                        <label htmlFor="isDefault" className="text-sm font-semibold text-gray-900 cursor-pointer">
                                            Set as default address
                                        </label>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={addMutation.isPending || updateMutation.isPending}
                                        className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50"
                                    >
                                        {(addMutation.isPending || updateMutation.isPending) ? 'Saving...' : mode === 'add' ? 'Add Address' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
