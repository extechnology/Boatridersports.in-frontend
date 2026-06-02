"use client";

import { BikeProduct, AccessoryProduct } from "@/types/product";
import { useState, useEffect } from "react";
import { ProductGallery } from "@/components/shop/product/ProductGallery";
import { ProductInfo } from "@/components/shop/product/ProductInfo";
import { ProductDetails } from "@/components/shop/product/ProductDetails";
import { ProductReviews } from "@/components/shop/product/ProductReviews";
import { YouMayAlsoLike } from "@/components/shop/product/YouMayAlsoLike";
import { useTheme } from "@/context/ThemeContext";



// Props interface
interface Props {
    product: BikeProduct | AccessoryProduct;
}


export default function ProductClient({ product }: Props) {


    const { setIsHeaderDark } = useTheme();


    // Check if product is a bike
    const isBike = product?.product_type === "bike";



    // Set header dark mode based on product
    useEffect(() => {

        if (product.is_dark) {
            setIsHeaderDark(true);
        }

        return () => setIsHeaderDark(false);

    }, [product.is_dark, setIsHeaderDark]);




    // Derived values
    const getInitialImages = () => {

        if (isBike) {
            return product?.bike_colors?.[0]?.bike_images ?? [];
        }

        return (product as AccessoryProduct)?.accessory_images ?? [];

    };



    // State variables
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState(getInitialImages()[0]);
    const [quantity, setQuantity] = useState(1);
    const [activeAccordion, setActiveAccordion] = useState<string | null>(null);



    // Effect for updating images when color changes
    useEffect(() => {

        const images = isBike ? product.bike_colors?.[selectedColorIndex]?.bike_images ?? [] : (product as AccessoryProduct)?.accessory_images ?? [];
        setSelectedImage(images[0]);

    }, [product, selectedColorIndex, isBike]);



    // Accordion toggle
    const toggleAccordion = (value: string) => {
        setActiveAccordion(activeAccordion === value ? null : value);
    };



    // Current images
    const currentImages = isBike ? product?.bike_colors?.[selectedColorIndex]?.bike_images ?? [] : (product as AccessoryProduct)?.accessory_images ?? [];



    return (


        <div className={`min-h-screen pt-20 pb-10 sm:pb-0 sm:pt-16 ${product.is_dark ? 'bg-black text-white dark' : 'bg-white dark:bg-zinc-950'}`}>


            {/* GRID LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 lg:h-[calc(100vh-64px)]">


                {/* LEFT COLUMN */}
                <div className="lg:col-span-7 xl:col-span-8 lg:overflow-y-auto no-scrollbar space-y-5">


                    {/* Gallery */}
                    <ProductGallery
                        images={currentImages}
                        selectedImage={selectedImage}
                        onImageSelect={setSelectedImage}
                        title={product.name}
                    />


                    {/* Mobile Buy Panel (appears after gallery) */}
                    <div className="block lg:hidden">
                        <ProductInfo
                            product={product}
                            quantity={quantity}
                            setQuantity={setQuantity}
                            selectedColorIndex={selectedColorIndex}
                            setSelectedColorIndex={setSelectedColorIndex}
                        />
                    </div>


                    {/* Details */}
                    <ProductDetails
                        product={product}
                        activeAccordion={activeAccordion}
                        toggleAccordion={toggleAccordion}
                    />


                    {/* Reviews */}
                    <ProductReviews
                        reviews={[]}
                        rating={4.8}
                        reviewCount={124}
                    />


                    {/* You May Also Like */}
                    <YouMayAlsoLike />


                </div>


                {/* RIGHT COLUMN – Desktop Buy Panel */}
                <div className="hidden lg:block lg:col-span-5 xl:col-span-4 lg:overflow-y-auto no-scrollbar px-6 py-6">
                    <ProductInfo
                        product={product}
                        quantity={quantity}
                        setQuantity={setQuantity}
                        selectedColorIndex={selectedColorIndex}
                        setSelectedColorIndex={setSelectedColorIndex}
                    />
                </div>


            </div>

        </div>

    );

}
