import ShopClient from "./ShopClient";
import { serverFetch } from "@/lib/fetcher";
import { PaginatedResponse, BikeProduct, AccessoryProduct } from "@/types/product";
import { Metadata } from "next";


// Generate metadata for shop page
export async function generateMetadata({ params, searchParams, }: { params: { slug: "bike" | "accessories" }; searchParams: { [key: string]: string | string[] | undefined }; }): Promise<Metadata> {


    const { slug } = await params;


    const isAccessories = slug === "accessories";
    const hasFilters = Object?.keys(searchParams || {}).length > 0;


    const title = isAccessories ? "Shop Cycling Accessories | Helmets, Lights & Gear" : "Shop Bikes | Road, Mountain & Electric Bikes";


    const description = isAccessories ? "Browse premium cycling accessories including helmets, lights, locks, and riding gear." : "Explore high-performance road, mountain, and electric bikes built for every rider.";


    const canonicalUrl = `https://boatridersports.in/shop/${slug}`;


    const ogImage = isAccessories ? "https://boatridersports.in/logo.png" : "https://boatridersports.in/logo.png";


    return {

        title,
        description,


        robots: hasFilters ? { index: false, follow: true } : { index: true, follow: true },


        alternates: {
            canonical: canonicalUrl,
        },


        openGraph: {
            title,
            description,
            url: canonicalUrl,
            type: "website",
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },


        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage],
        },

    };

}




export default async function ShopPage({ params, searchParams, }: { params: { slug: string }; searchParams: { [key: string]: string | string[] | undefined }; }) {


    const { slug } = await params;
    const resolvedSearchParams = await searchParams;


    const type = slug === "accessories" ? "accessories" : "bike";


    const query = new URLSearchParams();


    Object.entries(resolvedSearchParams).forEach(([key, value]) => {

        if (!value) return;

        if (Array.isArray(value)) {
            value.forEach(v => query.append(key, v));
            return;
        }

        // 👇 split comma-separated values
        if (typeof value === "string" && value.includes(",")) {
            value.split(",").forEach(v => query.append(key, v));
        } else {
            query.append(key, value);
        }

    });



    // Fetch product
    const productsRes = await serverFetch<PaginatedResponse<BikeProduct | AccessoryProduct>>(
        `/product/products-filtered/?${query}&type=${type}`,
        { cache: "no-store" }
    );



    return (

        <ShopClient
            type={type}
            products={productsRes.results}
            totalCount={productsRes.count}
            currentPage={productsRes.current_page}
            totalpages={productsRes.total_pages}
        />

    );


}
