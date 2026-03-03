"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
}

export default function TiltCard({ children, className = "" }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [glareX, setGlareX] = useState(50);
    const [glareY, setGlareY] = useState(50);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rY = ((x - centerX) / centerX) * 8;
        const rX = ((centerY - y) / centerY) * 8;

        setRotateX(rX);
        setRotateY(rY);
        setGlareX((x / rect.width) * 100);
        setGlareY((y / rect.height) * 100);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setGlareX(50);
        setGlareY(50);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ rotateX, rotateY }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            style={{ perspective: 1000, transformStyle: "preserve-3d" }}
            className={className}
        >
            {children}
            {/* Subtle glare overlay */}
            <div
                className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(16,185,129,0.06) 0%, transparent 60%)`,
                }}
            />
        </motion.div>
    );
}
