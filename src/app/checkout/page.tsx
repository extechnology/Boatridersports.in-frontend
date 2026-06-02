'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Truck, ShoppingBag, Loader2, MapPin, Check, Plus, Edit2, Trash2 } from 'lucide-react';
import AuthProtectedRoute from '@/components/common/AuthProtectedRoute';
import { useGetCartList } from '@/service/cart/useCart';
import { useGetAddresses, useDeleteAddress } from '@/service/profile/useProfile';
import { UserAddress } from '@/service/profile/types';
import AddressFormModal from '@/components/account/AddressFormModal';
import ProductLoading from '@/app/loading';
import { toast } from 'sonner';
import { useCartCheckout } from '@/service/cart/useCart';
import { load } from "@cashfreepayments/cashfree-js";





// get address icon based on type
const getAddressIcon = (type: string) => {
    switch (type?.toLowerCase()) {
        case 'home':
            return <MapPin className="w-5 h-5" />;
        case 'work':
            return <MapPin className="w-5 h-5" />;
        default:
            return <MapPin className="w-5 h-5" />;
    }
};


export default function CheckoutPage() {



    // Cart Data
    const { data: cartData, isLoading: isCartLoading, isError: isCartError } = useGetCartList();



    // Address Data
    const { data: addresses, isLoading: isAddressesLoading } = useGetAddresses();
    const deleteMutation = useDeleteAddress();


    // Cart Checkout Api
    const { mutate: checkoutMutation, isPending: isCheckoutPending } = useCartCheckout();


    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [selectedEditAddress, setSelectedEditAddress] = useState<UserAddress | undefined>(undefined);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [isCheckingOut, setIsCheckingOut] = useState(false);



    // Initial selected address
    if (!selectedAddressId && addresses && addresses.length > 0) {
        const defaultAddress = addresses.find(a => a.is_default) || addresses[0];
        if (defaultAddress) {
            setSelectedAddressId(defaultAddress.unique_id);
        }
    }


    // Handle Add Address
    const handleAddAddress = () => {
        setSelectedEditAddress(undefined);
        setModalMode('add');
        setIsAddressModalOpen(true);
    };



    const handleEditAddress = (address: UserAddress, e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedEditAddress(address);
        setModalMode('edit');
        setIsAddressModalOpen(true);
    };



    const handleDeleteAddress = (unique_id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this address?")) {
            deleteMutation.mutate(unique_id);
        }
    };



    // Handle Proceed to Payment
    const handleProceedToPayment = async () => {


        if (!selectedAddressId) {
            toast.error("Please select a delivery address.")
            return;
        }

        setIsCheckingOut(true);

        const formData = new FormData();
        formData.append("address_id", selectedAddressId);


        // Make the API call For Create Order
        checkoutMutation(formData, {


            onSuccess: async (response: any) => {


                const sessionId = response?.data?.payment_session_id || response?.payment_session_id;


                if (sessionId) {

                    try {

                        const cashfree = await load({
                            mode: "sandbox",
                        });


                        let checkoutOptions = {
                            paymentSessionId: sessionId,
                            redirectTarget: "_self",
                        };

                        cashfree.checkout(checkoutOptions)

                    } catch (err) {

                        toast.error("Failed to load payment gateway");

                    }

                } else {

                    toast.error("Invalid payment session data received.");

                }
            }

        });


    };



    if (isCartLoading || isAddressesLoading) {
        return <ProductLoading />;
    }



    if (isCartError || !cartData || cartData?.all_products?.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 pt-24 pb-8 flex justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty or unavailable.</h2>
                    <Link href="/cart">
                        <button className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold">
                            Return to Cart
                        </button>
                    </Link>
                </div>
            </div>
        );
    }



    const allProducts = cartData?.all_products;
    const originalTotal = cartData?.orginal_amount || 0;
    const totalDiscount = cartData?.total_discount || 0;
    const subtotal = cartData?.total_amount || 0;
    const shipping = cartData?.shipping_charge || 0;
    const total = subtotal + shipping;

    const safeAddresses = addresses || [];



    return (


        <AuthProtectedRoute>

            <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 pt-14 pb-8">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <Link href="/cart">
                            <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                        </Link>
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Checkout</h1>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

                        {/* Left Column: Address Selection */}
                        <div className="lg:col-span-2 space-y-6">

                            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-gray-900" />
                                        Delivery Address
                                    </h2>
                                    <button
                                        onClick={handleAddAddress}
                                        className="text-sm font-semibold text-gray-900 hover:text-gray-700 flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-lg transition-colors"
                                    >
                                        <Plus className="w-4 h-4" /> Add New
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {safeAddresses?.map((address, index) => {
                                        const isSelected = selectedAddressId === address?.unique_id;
                                        return (
                                            <motion.div
                                                key={address?.unique_id}
                                                onClick={() => setSelectedAddressId(address?.unique_id)}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className={`rounded-2xl p-6 transition-all group relative overflow-hidden cursor-pointer ${isSelected
                                                    ? 'border-2 border-green-500 bg-green-50/10 shadow-md'
                                                    : 'border border-gray-200 bg-white hover:shadow-xl hover:border-red-200'
                                                    }`}
                                            >
                                                {/* Selected or Default Badge */}
                                                {(isSelected || address?.is_default) && (
                                                    <div className="absolute top-0 right-0">
                                                        <div className={`px-4 py-1.5 rounded-bl-2xl rounded-tr-2xl flex items-center gap-1.5 text-xs font-semibold shadow-lg text-white ${isSelected ? 'bg-linear-to-br from-green-500 to-emerald-600' : 'bg-gray-400'
                                                            }`}>
                                                            {isSelected && <Check className="w-3.5 h-3.5" />}
                                                            {isSelected ? 'Selected' : 'Default'}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Address Type Icon */}
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${address?.address_type?.toLowerCase() === 'home' ? 'bg-blue-100 text-blue-600' :
                                                    address?.address_type?.toLowerCase() === 'work' ? 'bg-purple-100 text-purple-600' :
                                                        'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {getAddressIcon(address?.address_type!)}
                                                </div>

                                                {/* Address Details */}
                                                <div className="mb-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h3 className="text-lg font-bold text-gray-900 capitalize">{address?.address_type}</h3>
                                                    </div>
                                                    <p className="font-semibold text-gray-900 mb-1">{address?.name}</p>
                                                    <p className="text-sm text-gray-600 leading-relaxed">
                                                        {address?.address}
                                                        <br />
                                                        {address?.city}, {address?.state} - {address?.pincode}
                                                    </p>
                                                    <p className="text-sm text-gray-600 mt-2">{address?.phone_number}</p>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex gap-2 pt-4 border-t border-gray-100">
                                                    <motion.button
                                                        onClick={(e) => handleEditAddress(address, e)}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                                                    >
                                                        <Edit2 className="w-4 h-4" /> Edit
                                                    </motion.button>

                                                    <motion.button
                                                        onClick={(e) => handleDeleteAddress(address?.unique_id, e)}
                                                        disabled={deleteMutation?.isPending}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="px-4 py-2.5 bg-red-50 text-red-600 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors disabled:opacity-50"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </motion.button>
                                                </div>
                                            </motion.div>
                                        );
                                    })}

                                    {/* Add New Address Card */}
                                    <motion.button
                                        onClick={handleAddAddress}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: safeAddresses.length * 0.1 }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300 p-6 hover:border-gray-400 hover:from-gray-100 hover:to-gray-200 transition-all min-h-[280px] flex flex-col items-center justify-center gap-4 group"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center group-hover:border-gray-400 group-hover:scale-110 transition-all">
                                            <Plus className="w-8 h-8 text-gray-400 group-hover:text-gray-600" />
                                        </div>
                                        <div className="text-center">
                                            <h3 className="text-lg font-bold text-gray-900 mb-1">Add New Address</h3>
                                            <p className="text-sm text-gray-600">Create a new delivery address</p>
                                        </div>
                                    </motion.button>
                                </div>
                            </div>



                            {/* Cart Items Summary */}
                            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">


                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
                                    <ShoppingBag className="w-5 h-5 text-gray-900" />
                                    Order Items ({allProducts?.length})
                                </h2>


                                <div className="space-y-4">


                                    {allProducts?.map((item) => {

                                        const product = item?.bike || item?.accessory;


                                        if (!product) return null;


                                        const price = product?.is_discount ? Number(product?.discount_price) : Number(product?.price);


                                        let imageUrl = product?.featured_image;


                                        if (item?.bike && item?.color?.bike_images?.[0]) {

                                            imageUrl = item?.color?.bike_images?.[0];

                                        } else if (item?.accessory && item?.accessory?.accessory_images?.[0]) {

                                            imageUrl = item?.accessory?.accessory_images?.[0];

                                        }


                                        return (

                                            <div key={item?.id} className="flex gap-4 py-4 border-b border-gray-100 last:border-0 last:pb-0">

                                                <div className="w-20 h-20 rounded-xl bg-gray-50 overflow-hidden shrink-0">

                                                    {imageUrl ? (

                                                        <img src={imageUrl} alt={product?.name} className="w-full h-full object-cover" />

                                                    ) : (

                                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                            <ShoppingBag className="w-6 h-6" />
                                                        </div>

                                                    )}

                                                </div>

                                                <div className="flex-1 min-w-0 flex flex-col justify-center">

                                                    <h3 className="font-bold text-gray-900 text-sm line-clamp-1 mb-1">{product?.name}</h3>

                                                    <div className="flex gap-2 text-xs text-gray-500 mb-2">

                                                        <span>Qty: {item?.quantity}</span>
                                                        {item?.size && <span>• Size: {item?.size?.size}</span>}
                                                        {item?.color && <span>• Color: {item?.color?.color}</span>}

                                                    </div>

                                                    <div className="font-bold text-gray-900">₹{(price * item?.quantity).toLocaleString()}</div>

                                                </div>

                                            </div>

                                        );

                                    })}

                                </div>

                            </div>

                        </div>



                        {/* Right Column: Order Summary */}
                        <div className="lg:col-span-1">

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24 shadow-sm"
                            >

                                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                                {/* Price Breakdown */}
                                <div className="space-y-4 mb-6 text-sm md:text-base">

                                    <div className="flex justify-between text-gray-600">
                                        <span>Original Price</span>
                                        <span className="font-semibold line-through">₹{originalTotal?.toLocaleString()}</span>
                                    </div>

                                    <div className="flex justify-between text-green-600">
                                        <span>Total Discount</span>
                                        <span className="font-semibold">-₹{totalDiscount?.toLocaleString()}</span>
                                    </div>

                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-semibold">₹{subtotal?.toLocaleString()}</span>
                                    </div>

                                    <div className="flex justify-between text-gray-600">

                                        <span className="flex items-center gap-2">
                                            <Truck className="w-4 h-4" />
                                            Shipping
                                        </span>

                                        <span className="font-semibold">

                                            {shipping === 0 ? (

                                                <span className="text-green-600">Free</span>

                                            ) : (

                                                `₹${shipping?.toLocaleString()}`

                                            )}

                                        </span>

                                    </div>

                                    <div className="pt-4 border-t border-gray-200">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-gray-900">Total Payable</span>
                                            <span className="text-2xl font-bold text-gray-900">₹{total?.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <motion.button
                                    onClick={handleProceedToPayment}
                                    disabled={isCheckingOut || !selectedAddressId}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isCheckingOut ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                                        </>
                                    ) : (
                                        <>
                                            Proceed to Payment <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </motion.button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Address Form Modal */}
            <AddressFormModal
                isOpen={isAddressModalOpen}
                onClose={() => setIsAddressModalOpen(false)}
                address={selectedEditAddress}
                mode={modalMode}
            />
        </AuthProtectedRoute>
    );
}
