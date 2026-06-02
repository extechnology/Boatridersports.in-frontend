import type { Metadata } from "next";
import TermsClient from "./TermsClient";


const siteUrl = "https://boatridersports.in/";
const socialImage = "https://boatridersports.in/logo.png";


export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: "Terms & Conditions | Boat Rider Sports",
    description: "Terms and Conditions at Boat Rider Sports.",
    applicationName: "Boat Rider",
    keywords: [
        "Boat Rider",
        "Terms and Conditions",
        "Terms",
    ],
    authors: [{ name: "Boat Rider" }],
    creator: "Boat Rider",
    publisher: "Boat Rider",
    openGraph: {
        title: "Terms & Conditions | Boat Rider Sports",
        description: "Terms and Conditions at Boat Rider Sports.",
        url: `${siteUrl}/terms-and-conditions`,
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
        title: "Terms & Conditions | Boat Rider Sports",
        description: "Terms and Conditions at Boat Rider Sports.",
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
        canonical: `${siteUrl}/terms-and-conditions`,
    },
};

export default function Page() {
    return <TermsClient />;
}
