import type { Metadata } from "next";
import ReturnClient from "./ReturnClient";



// Site URL for seo
const siteUrl = "https://boatridersports.in/";


// Social image (1200×630) px
const socialImage = "https://boatridersports.in/logo.png";


// Metadata for about page
export const metadata: Metadata = {

    metadataBase: new URL(siteUrl),

    title: "Return & Refund Policy | Boat Rider Sports",

    description: "Easy returns and refunds for bicycles, accessories, and gear. Clear, fair, and simple. Return Policy at Boat Rider Sports.",

    applicationName: "Boat Rider",

    keywords: [
        "Boat Rider",
        "premium bicycles",
        "bicycle shop",
        "cycling community",
        "bike service",
        "road bikes",
        "mountain bikes",
        "electric bikes",
    ],


    authors: [{ name: "Boat Rider" }],
    creator: "Boat Rider",
    publisher: "Boat Rider",


    openGraph: {
        title: "Return & Refund Policy | Boat Rider Sports",
        description: "Easy returns and refunds for bicycles, accessories, and gear. Clear, fair, and simple. Return Policy at Boat Rider Sports.",
        url: `${siteUrl}/return-refund-policy`,
        siteName: "Boat Rider",
        images: [
            {
                url: socialImage,
                width: 1200,
                height: 630,
                alt: "Boat Rider – Premium cycling community",
            },
        ],
        locale: "en_US",
        type: "website",
    },


    twitter: {
        card: "summary_large_image",
        title: "Return & Refund Policy | Boat Rider Sports",
        description: "Easy returns and refunds for bicycles, accessories, and gear. Clear, fair, and simple. Return Policy at Boat Rider Sports.",
        images: [socialImage],
    },


    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },


    alternates: {
        canonical: `${siteUrl}/return-refund-policy`,
    },


};



export default function Page() {

    return <ReturnClient />;

}