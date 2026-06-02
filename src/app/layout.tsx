import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Providers from "./providers";
import Script from "next/script";
import ScrollToTop from "@/components/common/ScrollToTop";




export const metadata: Metadata = {


  metadataBase: new URL("https://bot-rider.vercel.app"),


  title: {
    default: "Boat Rider",
    template: "%s | Boat Rider",
  },


  description: "Boat Rider is a premium cycling store for high-performance bikes, accessories, and riding gear.",


  keywords: [
      "premium chairs",
      "office chairs",
      "executive chairs",
      "furniture store",
      "modern seating",
      "home furniture",
  ],


  authors: [{ name: "Boat Rider" }],  
  creator: "Boat Rider",
  publisher: "Boat Rider",


  alternates: {
    canonical: "https://bot-rider.vercel.app",
  },


  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },


  openGraph: {
    title: "Boat Rider — Premium Cycling Store",
    description: "Shop premium road, mountain & electric bikes along with accessories at Boat Rider.",
    url: "https://bot-rider.vercel.app",
    siteName: "Boat Rider",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Boat Rider Premium Cycling Store",
      },
    ],
    locale: "en_US",
    type: "website",
  },


  twitter: {
    card: "summary_large_image",
    title: "Boat Rider — Premium Cycling Store",
    description: "Shop premium road, mountain & electric bikes along with accessories at Boat Rider.",
    images: ["/og-image.jpg"],
  },


  icons: {
    icon: "/Fevicon.png",
    apple: "/Fevicon.png",
  },


};




export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {


  return (


    <html lang="en" className="light">

      <head>

        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://bot-rider.vercel.app/#organization",
              name: "Boat Rider",
              url: "https://bot-rider.vercel.app",
              logo: "https://bot-rider.vercel.app/logo.png",
              foundingDate: "1974",
              description:
                "Boat Rider delivers premium bicycles, expert service, and a passionate cycling community since 1974.",
              sameAs: [
                "https://twitter.com/boatrider",
                "https://instagram.com/boatrider"
              ]
            }),
          }}
        />

      </head>


      <body className="antialiased"    >

        <Providers>

          <ScrollToTop />

          <div className="flex flex-col min-h-screen">

            {/* Header */}
            <Header />

            {/* Page content */}
            <main className="flex-1">
              {children}
            </main>

            {/* Footer */}
            <Footer />

          </div>

        </Providers>

      </body>

    </html>

  );

}
