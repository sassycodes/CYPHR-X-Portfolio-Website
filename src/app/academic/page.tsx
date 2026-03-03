"use client";

import { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useInView,
    useSpring,
} from "framer-motion";
import {
    GraduationCap,
    Award,
    Cpu,
    Rocket,
    Code,
    Shield,
    Zap,
    Terminal,
    ChevronRight,
} from "lucide-react";

interface TimelineEntry {
    year: string;
    label: string;
    title: string;
    subtitle: string;
    description: string;
    stats?: { label: string; value: string }[];
    tags?: string[];
    icon: React.ElementType;
    status: "COMPLETE" | "ACTIVE" | "QUEUED";
}

const timelineData: TimelineEntry[] = [
    {
        year: "2022",
        label: "CLASS X",
        title: "10th Standard — CBSE Board",
        subtitle: "Foundation Layer Initialized",
        description:
            "Where it started. Strong in math and science, got my first taste of programming through the school CS curriculum. Wrote my first C++ programs here and knew this was it.",
        stats: [
            { label: "Board", value: "CBSE" },
            { label: "Score", value: "95.80%" },
            { label: "Focus", value: "PCM + CS" },
        ],
        icon: GraduationCap,
        status: "COMPLETE",
    },
    {
        year: "2024",
        label: "CLASS XII",
        title: "12th Standard — Maharashtra State Board",
        subtitle: "Pre-Flight Checks Passed",
        description:
            "Cleared boards and entrance exams. Physics and math here gave me the kind of thinking that later made systems programming click.",
        stats: [
            { label: "Board", value: "Maharashtra State Board" },
            { label: "Score", value: "83.50%" },
            { label: "JEE Advanced", value: "Qualified" },
        ],
        icon: Award,
        status: "COMPLETE",
    },
    {
        year: "2024",
        label: "SEM 1",
        title: "Semester 1",
        subtitle: "System Boot: First Deployment Cycle",
        description:
            "DSA in C, Digital Logic, Engineering Math — the usual. But most of the real work happened outside class. Jumped into 4 hackathons, took second at NeuroSys AI. Built Imagine_OS, an AI text-to-video pipeline using n8n + Gemini + Veo. Got deep into C++ and socket programming on my own.",
        stats: [
            { label: "Hackathons", value: "4 competed" },
            { label: "Won", value: "NeuroSys AI" },
            { label: "Shipped", value: "Imagine_OS" },
        ],
        tags: ["DSA in C", "Digital Logic", "Imagine_OS", "C++", "Socket Programming", "NeuroSys AI"],
        icon: Cpu,
        status: "COMPLETE",
    },
    {
        year: "2025",
        label: "SEM 2",
        title: "Semester 2",
        subtitle: "Full Throttle: Multi-Thread Execution",
        description:
            "OOP in C++, Discrete Math, Advanced DSA. Started building a userspace VPN from scratch in C++ — still in dev. Shipped CogniTrust 2.0 for deepfake detection. Made top 20 out of 273 teams at the TrustAI Ideathon under the India AI Impact Summit. Became AI/ML Lead of the ACM SIGCHI chapter. Currently experimenting with kernels, networking, cybersecurity, and emerging AI tech.",
        stats: [
            { label: "TrustAI", value: "Top 20/273" },
            { label: "Role", value: "SIGCHI Lead" },
            { label: "Exploring", value: "Kernels / Net" },
        ],
        tags: [
            "Userspace VPN",
            "CogniTrust 2.0",
            "TrustAI Ideathon",
            "ACM SIGCHI Lead",
            "Kernels",
            "Cybersecurity",
        ],
        icon: Rocket,
        status: "ACTIVE",
    },
    {
        year: "2025",
        label: "SEM 3",
        title: "Semester 3",
        subtitle: "Awaiting Deployment...",
        description:
            "Advanced algorithms, computer networks, operating systems. Planning deeper dives into kernel-level programming, distributed systems, and AI/ML research projects.",
        tags: ["Algorithms", "Networks", "OS", "Distributed Systems"],
        icon: Terminal,
        status: "QUEUED",
    },
];

function TimelineNode({
    entry,
    index,
}: {
    entry: TimelineEntry;
    index: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const Icon = entry.icon;

    const statusColor =
        entry.status === "COMPLETE"
            ? "text-emerald-500"
            : entry.status === "ACTIVE"
                ? "text-emerald-400"
                : "text-zinc-600";

    const statusDot =
        entry.status === "COMPLETE"
            ? "bg-emerald-500"
            : entry.status === "ACTIVE"
                ? "bg-emerald-400"
                : "bg-zinc-700";

    const borderColor =
        entry.status === "COMPLETE"
            ? "border-emerald-500/20"
            : entry.status === "ACTIVE"
                ? "border-emerald-400/20"
                : "border-zinc-800/40";

    return (
        <div ref={ref} className="relative flex gap-6 md:gap-10 pb-16 last:pb-0">
            {/* Node dot on timeline */}
            <div className="relative flex flex-col items-center shrink-0">
                {/* Animated dot */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{
                        type: "spring" as const,
                        stiffness: 200,
                        damping: 15,
                        delay: 0.2,
                    }}
                    className="relative z-10"
                >
                    <div
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 ${borderColor} bg-black flex items-center justify-center`}
                    >
                        <Icon
                            className={`w-4 h-4 md:w-5 md:h-5 ${statusColor} transition-colors`}
                        />
                    </div>

                    {/* Ping animation for ACTIVE node */}
                    {entry.status === "ACTIVE" && (
                        <motion.div
                            className="absolute inset-0 rounded-full border border-emerald-400/40"
                            animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        />
                    )}
                </motion.div>

                {/* Connector line to next node */}
                {index < timelineData.length - 1 && (
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={isInView ? { scaleY: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="w-px flex-1 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 origin-top mt-2"
                    />
                )}
            </div>

            {/* Content card */}
            <motion.div
                initial={{ opacity: 0, x: 40, y: 10 }}
                animate={
                    isInView ? { opacity: 1, x: 0, y: 0 } : {}
                }
                transition={{
                    type: "spring" as const,
                    stiffness: 100,
                    damping: 20,
                    delay: 0.3,
                }}
                className={`glass-card rounded-xl p-5 md:p-6 flex-1 group hover:bg-zinc-950/80 transition-all duration-300 ${borderColor}`}
                style={{ borderWidth: "1px" }}
            >
                {/* Card header */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                    {/* Year badge */}
                    <span className="font-mono text-[11px] text-zinc-500 bg-zinc-900 border border-zinc-800/50 rounded px-2.5 py-1 tracking-widest">
                        {entry.year}
                    </span>

                    {/* Label badge */}
                    <span
                        className={`font-mono text-[10px] tracking-widest uppercase ${statusColor}`}
                    >
                        {entry.label}
                    </span>

                    {/* Status indicator */}
                    <div className="flex items-center gap-1.5 ml-auto">
                        <span className={`w-1.5 h-1.5 rounded-full ${statusDot} ${entry.status === "ACTIVE" ? "animate-pulse" : ""}`} />
                        <span className="font-mono text-[10px] text-zinc-600 tracking-wider">
                            {entry.status}
                        </span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="font-mono text-base md:text-lg font-bold text-white mb-1 group-hover:text-zinc-100 transition-colors">
                    {entry.title}
                </h3>

                {/* Subtitle — terminal style */}
                <div className="flex items-center gap-2 mb-3">
                    <ChevronRight className="w-3 h-3 text-zinc-600" />
                    <span className="font-mono text-xs text-zinc-500 italic">
                        {entry.subtitle}
                    </span>
                </div>

                {/* Description — terminal style */}
                <p className="font-mono text-xs text-zinc-400 leading-relaxed mb-4">
                    <span className="text-emerald-500/50 mr-1">{">"}</span>
                    {entry.description}
                </p>

                {/* Stats row */}
                {entry.stats && (
                    <div className="flex flex-wrap gap-3 mb-4">
                        {entry.stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="bg-zinc-900/70 border border-zinc-800/40 rounded-lg px-3 py-2 flex flex-col"
                            >
                                <span className="font-mono text-[9px] text-zinc-600 tracking-widest uppercase">
                                    {stat.label}
                                </span>
                                <span className="font-mono text-sm text-white font-semibold">
                                    {stat.value}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Tags */}
                {entry.tags && (
                    <div className="flex flex-wrap gap-1.5">
                        {entry.tags.map((tag) => (
                            <span
                                key={tag}
                                className="font-mono text-[10px] text-zinc-400 bg-zinc-900/50 border border-zinc-800/40 rounded-md px-2 py-0.5 tracking-wider"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
}

export default function AcademicPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 60,
        damping: 20,
    });

    const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

    return (
        <div className="min-h-screen pt-24 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Page header — Boot sequence style */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <span className="font-mono text-xs text-zinc-600 tracking-widest">
                            04
                        </span>
                        <span className="w-8 h-px bg-zinc-800" />
                        <span className="font-mono text-xs text-zinc-600 tracking-widest uppercase">
                            Execution Trace
                        </span>
                    </div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="font-mono text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4"
                    >
                        Academic Journey
                    </motion.h1>

                    {/* Boot sequence log lines */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="space-y-1 mb-6"
                    >
                        {[
                            { text: "Loading academic records...", delay: 0.5 },
                            { text: "Parsing execution history...", delay: 0.7 },
                            { text: "Rendering timeline — OK", delay: 0.9 },
                        ].map((line, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: line.delay, duration: 0.3 }}
                                className="flex items-center gap-2"
                            >
                                <span className="font-mono text-[10px] text-emerald-500/70">
                                    ✓
                                </span>
                                <span className="font-mono text-[11px] text-zinc-600 tracking-wider">
                                    {line.text}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Progress bar */}
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: 1.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="h-px bg-gradient-to-r from-zinc-700 via-zinc-600 to-transparent origin-left"
                    />
                </motion.div>

                {/* Timeline */}
                <div ref={containerRef} className="relative">
                    {/* Scroll-driven progress line (background track) */}
                    <div className="absolute left-5 md:left-6 top-0 bottom-0 w-px bg-zinc-900/50" />

                    {/* Active progress line — draws as you scroll */}
                    <motion.div
                        className="absolute left-5 md:left-6 top-0 w-px bg-gradient-to-b from-emerald-500/60 via-amber-400/40 to-zinc-800 origin-top"
                        style={{ height: progressHeight }}
                    />

                    {/* Timeline entries */}
                    {timelineData.map((entry, index) => (
                        <TimelineNode key={index} entry={index === timelineData.length - 1 ? entry : entry} index={index} />
                    ))}
                </div>

                {/* Footer status */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 0.5 }}
                    className="mt-12 flex items-center justify-center gap-3"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span className="font-mono text-[11px] text-zinc-600 tracking-wider">
                        TIMELINE_STATUS: ACTIVELY_RENDERING
                    </span>
                    <span className="font-mono text-[11px] text-zinc-700">
                        ■
                    </span>
                    <span className="font-mono text-[10px] text-zinc-700 tracking-wider">
                        {timelineData.length} NODES LOADED
                    </span>
                </motion.div>
            </div>
        </div>
    );
}
