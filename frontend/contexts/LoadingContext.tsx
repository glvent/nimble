"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface LoadingContextType {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading(): LoadingContextType {
    const context = useContext(LoadingContext);

    if (!context) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }

    return context;
}
