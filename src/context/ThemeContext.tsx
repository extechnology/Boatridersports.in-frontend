"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ThemeContextType {
    isHeaderDark: boolean;
    setIsHeaderDark: (isDark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


export function ThemeProvider({ children }: { children: ReactNode }) {

    const [isHeaderDark, setIsHeaderDark] = useState(false);

    return (

        <ThemeContext.Provider value={{ isHeaderDark, setIsHeaderDark }}>
            {children}
        </ThemeContext.Provider>

    );

}

export function useTheme() {

    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
}
