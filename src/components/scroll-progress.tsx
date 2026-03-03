"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function ScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const scaleX = useSpring(0, { stiffness: 100, damping: 30 });

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? scrollTop / docHeight : 0;
            setScrollProgress(progress);
            scaleX.set(progress);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scaleX]);

    if (scrollProgress === 0) return null;

    return (
        <motion.div
            className="fixed top-16 left-0 right-0 h-[2px] bg-emerald-500/80 z-50 origin-left"
            style={{ scaleX }}
        />
    );
}
