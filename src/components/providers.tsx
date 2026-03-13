"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchInterval: false,
                        refetchOnWindowFocus: false,
                        staleTime: Infinity,
                        retry: false,
                    },
                    mutations: {
                        retry: false,
                    },
                },
            })
    );

    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>{children}</TooltipProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
}

