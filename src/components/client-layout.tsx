"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SmoothScrollProvider from "@/components/providers/smooth-scroll-provider";
import Navbar from "@/components/navbar";
import ScrollProgress from "@/components/scroll-progress";
import Footer from "@/components/footer";
import PageTransition from "@/components/page-transition";


export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <SmoothScrollProvider>
            {/* Persistent dark grid background */}
            <div className="grid-background" />

            {/* Glassmorphic Navbar */}
            <Navbar />

            {/* Scroll progress bar */}
            <ScrollProgress />

            {/* Main content with page transitions */}
            <main className="relative z-10">
                <AnimatePresence mode="wait">
                    <PageTransition key={pathname}>
                        {children}
                    </PageTransition>
                </AnimatePresence>
            </main>

            {/* Footer */}
            <Footer />


        </SmoothScrollProvider>
    );
}
