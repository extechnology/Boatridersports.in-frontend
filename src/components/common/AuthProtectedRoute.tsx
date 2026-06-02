'use client';

import { useCheckLogin } from "@/service/auth/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import ProductLoading from "@/app/loading";





export default function AuthProtectedRoute({ children }: { children: React.ReactNode }) {


    const { data, isLoading } = useCheckLogin();
    const router = useRouter();
    const pathname = usePathname();


    useEffect(() => {

        if (!isLoading && !data?.is_logged_in) {

            router.push(`/account/login?redirect=${encodeURIComponent(pathname)}`);

        }

    }, [isLoading, data, router, pathname]);



    // loading screen
    if (isLoading) {

        return (

            <ProductLoading />

        );

    }



    if (!data) {

        return null; // Let the useEffect handle the redirect

    }


    return <>{children}</>;

}
