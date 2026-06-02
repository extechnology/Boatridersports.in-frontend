import CategorySlider from "@/components/home/CategorySlider";
import VideoShowcase from "@/components/home/VideoShowcase";
import FeaturedCollection from "@/components/home/FeaturedCollection";
import ImmersiveFeatures from "@/components/home/ImmersiveFeatures";
import OurBrands from "@/components/home/OurBrands";
import { BlurFade } from "@/components/ui/blur-fade";
import type { Metadata } from "next";
import { serverFetch } from "@/lib/fetcher";
import { HomeSliderType, ShopBuyType } from "@/types/home";
import { BikeProduct } from "@/types/product";



// Site URL for seo
const siteUrl = "https://boatridersports.in/";


// Social image (1200×630) px
const socialImage = "https://boatridersports.in/logo.png";



// Metadata for about page
export const metadata: Metadata = {

  metadataBase: new URL(siteUrl),

  title: "Boat Rider - Premium Bicycles & Cycling Community Since 1974",

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
    title: "Boat Rider - Premium Bicycles & Cycling Community Since 1974",
    description: "Boat Rider has been delivering premium bicycles, expert service, and a passionate cycling community since 1974. Discover our mission, team, and values.",
    url: `${siteUrl}`,
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
    title: "Boat Rider - Premium Bicycles & Cycling Community Since 1974",
    description: "Boat Rider has been delivering premium bicycles, expert service, and a passionate cycling community since 1974. Discover our mission, team, and values.",
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
    canonical: `${siteUrl}`,
  },


};



export default async function Home() {



  // Fetch product
  const [HeroSlider, ShopBuy, FeaturedProduct, BrandsImages] = await Promise.all([

    serverFetch<HomeSliderType>(`/ui/home-slider-video/`, {
      next: { revalidate: 60 * 60 },
    }),

    serverFetch<ShopBuyType[]>(`/product/shop-buy/`, {
      next: { revalidate: 60 * 60 },
    }),

    serverFetch<BikeProduct[]>(`/product/featured-product/`, {
      next: { revalidate: 60 * 60 },
    }),

    serverFetch<string[]>(`/product/brands-images/`, {
      next: { revalidate: 60 * 60 },
    }),

  ]);



  return (


    <section aria-label="Homepage" className="w-full flex-col items-center justify-center">



      {/* Hero Slider */}
      <VideoShowcase data={HeroSlider} />


      {/* Category Slider */}
      <CategorySlider data={ShopBuy} />


      {/* Featured Collection */}
      <BlurFade delay={0.25 * 2} duration={0.5} inView>
        <FeaturedCollection data={FeaturedProduct} />
      </BlurFade>


      {/* Our Brands */}
      <BlurFade delay={0.25 * 4} duration={0.5} inView>
        <OurBrands data={BrandsImages} />
      </BlurFade>


      {/* Immersive Features */}
      <BlurFade delay={0.25 * 5} duration={0.5} inView>
        <ImmersiveFeatures />
      </BlurFade>


    </section >



  );



}
