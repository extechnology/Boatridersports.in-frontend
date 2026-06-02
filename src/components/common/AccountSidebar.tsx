'use client';

import { motion } from 'framer-motion';
import { User, Package, MapPin, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLogout } from '@/service/auth/useAuth';



// menu items
interface MenuItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    action?: () => void;
}



// account sidebar props
interface AccountSidebarProps {
    activeSection: string;
    onSectionChange: (section: string) => void;
    isMobileMenuOpen?: boolean;
    onCloseMobileMenu?: () => void;
}



// account sidebar
export default function AccountSidebar({ activeSection, onSectionChange, isMobileMenuOpen = false, onCloseMobileMenu }: AccountSidebarProps) {
    
    
    const router = useRouter();
    const logoutMutation = useLogout();


    // Handle logout
    const handleLogout = () => {
    
        logoutMutation.mutate(undefined, {

            onSuccess: () => {
            
                router.push('/');
            
            }
    
        });
    
    };


    // Menu items
    const menuItems: MenuItem[] = [
        { id: 'profile', label: 'My Profile', icon: <User className="w-5 h-5" /> },
        { id: 'orders', label: 'My Orders', icon: <Package className="w-5 h-5" /> },
        { id: 'addresses', label: 'Addresses', icon: <MapPin className="w-5 h-5" /> },
        { id: 'logout', label: 'Logout', icon: <LogOut className="w-5 h-5" />, action: handleLogout }
    ];


    // Handle menu click
    const handleMenuClick = (item: MenuItem) => {
       
        if (item.action) {
       
            item.action();
       
        } else {
       
            onSectionChange(item.id);
        }
        if (onCloseMobileMenu) {
       
            onCloseMobileMenu();
       
        }
    
    };



    // Desktop Sidebar
    const DesktopSidebar = () => (


        <div className="hidden lg:block w-72 shrink-0">


            <div className="sticky top-24">


                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm"
                >


                    <nav className="space-y-2">


                        {menuItems.map((item, index) => (


                            <motion.button
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => handleMenuClick(item)}
                                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all ${activeSection === item.id
                                    ? 'bg-gray-900 text-white shadow-lg'
                                    : item.id === 'logout'
                                        ? 'text-red-600 hover:bg-red-50'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >

                                {item.icon}
                                <span>{item.label}</span>

                            </motion.button>

                        ))}

                    </nav>

                </motion.div>

            </div>

        </div>

    );




    // Mobile Bottom Navigation
    const MobileBottomNav = () => (

        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-2xl">

            <div className="grid grid-cols-5 gap-1 p-2">

                {menuItems.map((item) => (

                    <motion.button
                        key={item.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleMenuClick(item)}
                        className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl transition-all ${activeSection === item.id
                            ? 'bg-gray-900 text-white'
                            : item.id === 'logout'
                                ? 'text-red-600'
                                : 'text-gray-600'
                            }`}
                    >

                        {item.icon}

                        <span className="text-xs font-medium truncate w-full text-center">
                            {item.label.split(' ')[item.label.split(' ').length - 1]}
                        </span>

                    </motion.button>

                ))}

            </div>

        </div>
    );



    return (

        <>
            <DesktopSidebar />

            <MobileBottomNav />

        </>

    );


}
