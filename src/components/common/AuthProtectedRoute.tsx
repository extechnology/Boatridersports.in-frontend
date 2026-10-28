'use client';

import { useCheckLogin } from "@/service/auth/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import ProductLoading from "@/app/loading";

export default function AuthProtectedRoute({ children }: { children: React.ReactNode }) {
    const { data, isLoading } = useCheckLogin();
    const router = useRouter();
    const pathname = usePathname();

    const isLoggedIn = Boolean(data?.is_logged_in);

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            router.push(`/account/login?redirect=${encodeURIComponent(pathname)}`);
        }
    }, [isLoading, isLoggedIn, router, pathname]);

    // Show loading while checking auth status or while redirecting unauthorized users
    if (isLoading || !isLoggedIn) {
        return <ProductLoading />;
    }

    return <>{children}</>;
}
