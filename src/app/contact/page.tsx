import { Metadata } from "next";
import ContactClient from "./ContactClient";


// Site URL for seo
const siteUrl = "https://boatridersports.in/";


// Social image (1200×630) px
const socialImage = "https://boatridersports.in/logo.png";


// Metadata for about page
export const metadata: Metadata = {

  metadataBase: new URL(siteUrl),

  title: "Contact Us | Premium Bicycles & Cycling Community Since 1974",

  description: "Boat Rider has been delivering premium bicycles, expert service, and a passionate cycling community since 1974. Discover our mission, team, and values.",

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
    title: "Contact Us | Boat Rider",
    description: "Get in touch with us for any inquiries or questions.",
    url: `${siteUrl}/contact`,
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
    title: "Contact Us | Boat Rider",
    description:
      "Get in touch with us for any inquiries or questions.",
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
    canonical: `${siteUrl}/contact`,
  },


};


export default function ContactPage() {

  return (

    <ContactClient />

  );

}

