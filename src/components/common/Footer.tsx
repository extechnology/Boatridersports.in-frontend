'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';


// Social Links
const SOCIAL_LINKS = [
  { icon: Facebook, href: '#' },
  { icon: Instagram, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Youtube, href: '#' },
];


// Quick Links
const QUICK_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Bikes', href: '/shop/bikes' },
  { name: 'Accessories', href: '/shop/accessories' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
];


// Legal Links
const LEGAL_LINKS = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms & Conditions', href: '/terms-and-conditions' },
  { name: 'Shipping Policy', href: '/shipping-policy' },
  { name: 'Return & Refund Policy', href: '/return-refund-policy' },
  { name: 'Cookie Policy', href: '/cookie-policy' },
];




export default function Footer() {


  return (

    <footer aria-label="Footer" className="bg-black text-white pt-14 pb-8 overflow-hidden relative border-t border-white/5">


      {/* Background Gradient Blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gray-800/20 rounded-full blur-[120px] pointer-events-none" />


      <div className="px-6 md:px-10 mx-auto relative z-10">


        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-0 sm:mb-12 pl-0 lg:pl-20 text-center">


          {/* Brand & About */}
          <div className="space-y-6 flex flex-col items-center sm:items-start">

            <div className="w-full max-w-[420px]">
              <Image
                src="/white-logo.png"
                alt="Boatrider"
                width={600}
                height={160}
                priority
                className="sm:w-52 w-96 sm:h-20 h-28 object-contain"
              />
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm text-justify">
              Innovating the cycling experience since 1974. We believe in the power of the bicycle to change lives.
              Designed for riders, by riders.
            </p>

            <div className="flex items-center sm:items-start space-x-4">

              {SOCIAL_LINKS.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  whileHover={{ scale: 1.1, color: '#ef4444' }}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}

            </div>

          </div>


          {/* Quick Links */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-start w-full">
            <h3 className="text-lg font-bold mb-6">Explore</h3>
            <ul className="space-y-4">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          {/* Contact Info */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-start w-full">

            <h3 className="text-lg font-bold mb-6">Contact</h3>

            <ul className="space-y-6 text-gray-400">

              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-1" />
                <span>Boatrider Sports Pvt. Ltd<br />16/1040, Pushpa Junction, Francis Road,
                  Calicut, Kerala – 673 002
                </span>
              </li>

              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-600 shrink-0" />
                <a href="tel:04954850666" target='_blank' className="text-white hover:text-red-600 transition-colors">0495 4850666</a>
              </li>

              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-red-600 shrink-0" />
                <a href="mailto:boatridersportsclt@gmail.com" target='_blank' className="text-white hover:text-red-600 transition-colors">boatridersportsclt@gmail.com</a>
              </li>

            </ul>

          </div>


          {/* Legal */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-start w-full">

            <h3 className="text-lg font-bold mb-6">Legal</h3>

            <ul className="space-y-4 mb-8">

              {LEGAL_LINKS.map((link) => (

                <li key={link.name}>

                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>

                </li>

              ))}

            </ul>

          </div>

        </div>


        {/* Big Typography */}
        <div className="flex justify-center mb-5 sm:mb-10 select-none pointer-events-none">
          <h1 className="text-[20vw] sm:text-[18vw] leading-none font-bold text-transparent bg-clip-text bg-linear-to-b from-white/10 to-white/5 tracking-tighter text-center">
            BoatRider
          </h1>
        </div>


        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 border-t border-white/5 pt-8">
          <p>&copy; {new Date().getFullYear()} BoatRider Inc. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span>Designed by ex-technology</span>
          </div>
        </div>


      </div>

    </footer>

  );

}
