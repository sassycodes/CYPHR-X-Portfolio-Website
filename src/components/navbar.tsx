"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-50 glass pointer-events-none"
        >
            <nav className="mx-auto max-w-7xl px-6 lg:px-8">
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

                    {/* Tab Navigation */}
                    <div className="flex items-center gap-1 pointer-events-auto">
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
                </div>
            </nav>
        </motion.header>
    );
}
