"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const tabs = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Experience", href: "/experience" },
    { name: "Achievements", href: "/achievements" },
    { name: "Academic Journey", href: "/academic" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    // Close drawer on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 left-0 right-0 z-50 glass pointer-events-none"
            >
                <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Animated Logo Badge */}
                        <Link href="/" className="pointer-events-auto flex items-center gap-3">
                            {/* Pulsing ring + diamond */}
                            <div className="relative flex items-center justify-center w-8 h-8">
                                {/* Outer ping ring */}
                                <motion.div
                                    className="absolute inset-0 rounded-full border border-emerald-500/30"
                                    animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                                />
                                {/* Inner ring */}
                                <div className="absolute inset-1 rounded-full border border-emerald-500/20" />
                                {/* Core dot */}
                                <motion.div
                                    className="w-2 h-2 rounded-full bg-emerald-500"
                                    animate={{ opacity: [1, 0.5, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                />
                            </div>
                            {/* CYPHR text */}
                            <span className="font-mono text-xs font-semibold tracking-[0.25em] text-zinc-400 uppercase hidden sm:inline-block">
                                CYPHR
                            </span>
                        </Link>

                        {/* Desktop Tab Navigation */}
                        <div className="hidden md:flex items-center gap-1 pointer-events-auto">
                            {tabs.map((tab) => {
                                const isActive = pathname === tab.href;
                                return (
                                    <Link
                                        key={tab.href}
                                        href={tab.href}
                                        className={cn(
                                            "relative px-3 py-2 text-sm font-mono transition-colors duration-200 group",
                                            isActive
                                                ? "text-white"
                                                : "text-zinc-500 hover:text-zinc-300"
                                        )}
                                    >
                                        <span className="relative z-10">{tab.name}</span>
                                        {/* Underline — always present, scales from center */}
                                        <span
                                            className={cn(
                                                "absolute bottom-0 left-0 right-0 h-px bg-white/70 transition-transform duration-300 ease-out origin-center",
                                                isActive
                                                    ? "scale-x-100"
                                                    : "scale-x-0 group-hover:scale-x-100"
                                            )}
                                        />
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Mobile Hamburger Button */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden pointer-events-auto p-2 rounded-lg border border-zinc-800/40 bg-zinc-900/30 hover:border-emerald-500/20 transition-all duration-300"
                            aria-label="Toggle navigation menu"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={mobileOpen ? "close" : "menu"}
                                    initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                    exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {mobileOpen ? (
                                        <X className="w-5 h-5 text-zinc-400" />
                                    ) : (
                                        <Menu className="w-5 h-5 text-zinc-400" />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </button>
                    </div>
                </nav>
            </motion.header>

            {/* Mobile Drawer Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
                            onClick={() => setMobileOpen(false)}
                        />

                        {/* Drawer */}
                        <motion.nav
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed top-0 right-0 bottom-0 z-50 w-72 glass border-l border-zinc-800/60 md:hidden flex flex-col"
                        >
                            {/* Drawer header */}
                            <div className="flex items-center justify-between px-5 h-16 border-b border-zinc-800/40">
                                <span className="font-mono text-xs font-semibold tracking-[0.25em] text-zinc-400 uppercase">
                                    NAV
                                </span>
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    className="p-2 rounded-lg border border-zinc-800/40 bg-zinc-900/30 hover:border-emerald-500/20 transition-all duration-300"
                                    aria-label="Close navigation menu"
                                >
                                    <X className="w-5 h-5 text-zinc-400" />
                                </button>
                            </div>

                            {/* Nav links */}
                            <div className="flex-1 flex flex-col gap-1 p-4 pt-6">
                                {tabs.map((tab, index) => {
                                    const isActive = pathname === tab.href;
                                    return (
                                        <motion.div
                                            key={tab.href}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.05 * index, duration: 0.3 }}
                                        >
                                            <Link
                                                href={tab.href}
                                                onClick={() => setMobileOpen(false)}
                                                className={cn(
                                                    "flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-all duration-200",
                                                    isActive
                                                        ? "text-white bg-emerald-500/10 border border-emerald-500/20"
                                                        : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50 border border-transparent"
                                                )}
                                            >
                                                {/* Index number */}
                                                <span className="text-[10px] text-zinc-600 tracking-widest w-4">
                                                    {String(index).padStart(2, "0")}
                                                </span>
                                                <span>{tab.name}</span>
                                                {isActive && (
                                                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                )}
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Drawer footer */}
                            <div className="px-5 py-4 border-t border-zinc-800/40">
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="font-mono text-[10px] text-zinc-600 tracking-wider">
                                        SYSTEM ONLINE
                                    </span>
                                </div>
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
