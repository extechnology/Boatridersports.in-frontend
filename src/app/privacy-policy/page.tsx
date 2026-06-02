import type { Metadata } from "next";
import PrivacyPolicy from "./PrivacyClient";





// Site URL for seo
const siteUrl = "https://boatridersports.in/";


// Social image (1200×630) px
const socialImage = "https://boatridersports.in/logo.png";


// Metadata for about page
export const metadata: Metadata = {

    metadataBase: new URL(siteUrl),

    title: "Privacy Policy | Boat Rider Sports",

    description: "Clear, fair, and simple. Privacy Policy at Boat Rider Sports.",

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
        title: "Privacy Policy | Boat Rider Sports",
        description: "Clear, fair, and simple. Privacy Policy at Boat Rider Sports.",
        url: `${siteUrl}/privacy-policy`,
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
        title: "Privacy Policy | Boat Rider Sports",
        description: "Clear, fair, and simple. Privacy Policy at Boat Rider Sports.",
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
        canonical: `${siteUrl}/privacy-policy`,
    },


};



export default function Page() {

    return <PrivacyPolicy />

}