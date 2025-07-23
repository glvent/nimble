"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
    const router = useRouter();

    useEffect(() => {
        const handleAuthCallback = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                
                if (error) {
                    console.error("Auth callback error:", error);
                    router.push("/auth/signin?error=auth_failed");
                    return;
                }

                if (data.session) {
                    // Successfully authenticated
                    router.push("/chat"); // or wherever you want to redirect
                } else {
                    // No session found
                    router.push("/auth/signin");
                }
            } catch (error) {
                console.error("Unexpected error during auth callback:", error);
                router.push("/auth/signin?error=unexpected");
            }
        };

        handleAuthCallback();
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Completing sign in...</p>
            </div>
        </div>
    );
} 