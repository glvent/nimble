"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";
import { useEffect } from "react";
import { LucideX } from "lucide-react";

export interface ErrorContextType {
    errorQueue: ErrorQueueItem[];
    addError: (message: string) => void;
}

interface ErrorQueueItem {
    id: string;
    message: string;
    count: number;
    timestamp: NodeJS.Timeout;
}



const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export function ErrorProvider({ children }: { children: ReactNode }) {
    const [errorQueue, setErrorQueue] = useState<ErrorQueueItem[]>([]);

    useEffect(() => {
        errorQueue.forEach(err => {
            clearTimeout(err.timestamp);
        });
    }, [errorQueue]);

    const addError = (message: string) => {
        const id = crypto.randomUUID();
        const timestamp = setTimeout(() => {
            removeError(id);
        }, 5000);
        const count = errorQueue.find(err => err.message === message)?.count || 0;
        setErrorQueue(prev => [...prev, { id, message, count: count + 1, timestamp }]);

        toast.error(message, {
            duration: 5000,
        })
    }

    function removeError(id: string) {
        setErrorQueue(prev => prev.filter(err => err.id !== id));
    }

    return (
        <ErrorContext.Provider
            value={{ errorQueue, addError }}
        >
            {children}
        </ErrorContext.Provider>
    );
}

export function useError(): ErrorContextType {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error("useError must be used within an ErrorProvider");
    }
    return context;
}
