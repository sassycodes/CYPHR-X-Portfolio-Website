"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Terminal } from "lucide-react";

interface ProjectCardProps {
    title: string;
    description: string;
    tech: string[];
    status: string;
    span?: string;
}

export default function ProjectCard({
    title,
    description,
    tech,
    status,
}: ProjectCardProps) {
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
        setRotateY(((x - centerX) / centerX) * 6);
        setRotateX(((centerY - y) / centerY) * 6);
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
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            style={{ perspective: 1000, transformStyle: "preserve-3d" }}
            className="glass-card rounded-xl p-6 h-full flex flex-col group cursor-pointer relative overflow-hidden hover:border-emerald-500/20 transition-all duration-300"
        >
            {/* 3D glare overlay */}
            <div
                className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                style={{
                    background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(16,185,129,0.06) 0%, transparent 60%)`,
                }}
            />

            {/* Header */}
            <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-zinc-600" />
                    <span className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase">
                        PROJECT
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-zinc-500 tracking-wider">
                        {status}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
                </div>
            </div>

            {/* Title */}
            <h3 className="font-mono text-xl font-bold text-white mb-3 relative z-10 group-hover:text-zinc-100 transition-colors">
                {title}
            </h3>

            {/* Description — terminal style */}
            <div className="font-mono text-xs text-zinc-500 leading-relaxed mb-6 flex-grow relative z-10">
                <span className="text-emerald-500/50 mr-1">{">"}</span>
                {description}
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 relative z-10">
                {tech.map((t) => (
                    <span
                        key={t}
                        className="font-mono text-[10px] text-zinc-400 bg-zinc-900/50 border border-zinc-800/50 rounded-md px-2.5 py-1 tracking-wider"
                    >
                        {t}
                    </span>
                ))}
            </div>

            {/* External link icon */}
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <ExternalLink className="w-4 h-4 text-emerald-500/60" />
            </div>
        </motion.div>
    );
}
