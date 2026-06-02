'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, User, Menu, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import { usePathname } from "next/navigation";
import { MENU_ITEMS } from '@/data/headerData';
import MegaMenu from './MegaMenu';
import MobileDrawer from './MobileDrawer';
import { useTheme } from "@/context/ThemeContext";
import SearchModal from './SearchModal';
import { useGetCartList } from '@/service/cart/useCart';





export default function Header() {


  const { isHeaderDark } = useTheme();


  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/events" || pathname === "/contact" || pathname === "/about";



  // Get cart data from API
  const { data: cartData, isLoading } = useGetCartList();



  // State
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);


  // Scroll State
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);


  // Bag Count (Mock)
  const [count, setCount] = useState<number>(2);



  // Handle Scroll Logic
  useEffect(() => {

    const handleScroll = () => {

      const currentScrollY = window.scrollY;

      // Update Scrolled State (Threshold 20px)
      setIsScrolled(currentScrollY > 20);

      // Determine visibility (Hide on scroll down, show on scroll up)
      if (currentScrollY < 10) {

        setIsVisible(true);

      } else if (currentScrollY > lastScrollY.current && currentScrollY > 60) {

        setIsVisible(false);

      } else if (currentScrollY < lastScrollY.current) {

        setIsVisible(true);

      }

      lastScrollY.current = currentScrollY;

    };


    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);

  }, []);




  const isTransparent = isHome && !isScrolled;

  // Use context value for dark mode
  const headerBg = isTransparent ? "rgba(0,0,0,0)" : (isHeaderDark ? "#000000" : "#ffffff");
  const textColor = (isTransparent || isHeaderDark) ? "text-white" : "text-gray-900";
  const hoverBg = (isTransparent || isHeaderDark) ? "hover:bg-white/10" : "hover:bg-gray-100";
  const logoSrc = (isTransparent || isHeaderDark) ? '/white-logo.png' : '/logo.png';





  return (


    <>

      <motion.header
        aria-label="Header"
        initial={{ y: 0, backgroundColor: "rgba(0,0,0,0)" }}
        animate={{
          y: isVisible ? 0 : -100,
          backgroundColor: headerBg,
          backdropFilter: isTransparent ? "blur(0px)" : "blur(12px)",
          boxShadow: isTransparent ? "none" : "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        }}
        transition={{
          y: { duration: 0.5, ease: "easeInOut" },
          backgroundColor: { duration: 0.5, ease: "easeInOut" },
          backdropFilter: { duration: 0.5, ease: "easeInOut" }
        }}
        className={`fixed top-0 left-0 right-0 z-50`}
      >


        <div className="w-full mx-auto px-4 sm:px-6 lg:px-10">


          <div className="flex items-center justify-between h-16">


            {/* Logo */}
            <div className="shrink-0 z-50 flex items-center">

              <Link href="/" className="flex items-center">

                <Image
                  src={logoSrc}
                  alt="Cycle Logo"
                  width={160}
                  height={40}
                  priority
                  className="w-auto h-14 object-contain"
                />

              </Link>

            </div>



            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">

              {MENU_ITEMS.map((item) => (

                <div
                  key={item.name}
                  className="relative group h-20 flex items-center"
                  onMouseEnter={() => {
                    if (item.hasDropdown) setActiveDropdown(item.name);
                  }}
                  onMouseLeave={() => {
                    if (item.hasDropdown) setActiveDropdown(null);
                  }}
                >

                  <Link
                    href={item.href}
                    className={`font-semibold transition-colors py-2 ${textColor} hover:text-red-600`}
                    onClick={() => setActiveDropdown(null)}
                  >
                    {item.name}
                  </Link>


                  {/* Dropdown Beam Effect */}
                  {item.hasDropdown && activeDropdown === item.name && (

                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute top-14 left-0 right-0 h-0.5 bg-red-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />

                  )}

                </div>

              ))}

            </nav>


            {/* Actions */}
            <div className="hidden lg:flex items-center space-x-3">

              {/* <button
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 rounded-full transition-colors hover:cursor-pointer ${textColor} ${hoverBg}`}
              >
                <Search className="w-5 h-5" />
              </button> */}

              <Link href="/account">
                <button className={`p-2 rounded-full transition-colors hover:cursor-pointer ${textColor} ${hoverBg}`}>
                  <User className="w-5 h-5" />
                </button>
              </Link>

              <Link href="/cart">
                <button className={`relative p-2 rounded-full transition-colors hover:cursor-pointer ${textColor} ${hoverBg}`}>
                  <ShoppingCart className="w-5 h-5" />
                  {cartData && !isLoading && cartData?.all_products?.length > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 min-w-5 px-1 flex items-center justify-center rounded-full text-[11px] leading-none"
                    >
                      {cartData?.all_products?.length > 99 ? "99+" : cartData?.all_products?.length}
                    </Badge>
                  )}
                </button>
              </Link>

            </div>


            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`p-2 ${textColor}`}
              >
                <Menu className="w-6 h-6" />
              </button>

            </div>


          </div>


        </div>


        {/* ================= MEGA MENU ================= */}
        <MegaMenu activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} isDark={!!isHeaderDark} />


      </motion.header>


      {/* Mobile Menu Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onSearchOpen={() => setIsSearchOpen(true)}
      />


      {/* Search Modal */}
      <SearchModal open={isSearchOpen} onOpenChange={setIsSearchOpen} />


    </>

  );
}
