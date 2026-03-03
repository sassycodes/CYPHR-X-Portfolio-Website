"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
    Briefcase,
    MapPin,
    Calendar,
    ChevronRight,
    ExternalLink,
    Rocket,
    Brain,
    Megaphone,
    Users,
} from "lucide-react";

interface Experience {
    role: string;
    company: string;
    type: string;
    period: string;
    duration: string;
    location: string;
    mode: string;
    description: string;
    responsibilities: { icon: React.ElementType; label: string; text: string }[];
    tags: string[];
    status: "ACTIVE" | "COMPLETE";
}

const experiences: Experience[] = [
    {
        role: "GTM (Go-To-Marketing) & Operations",
        company: "Carter AI",
        type: "Internship",
        period: "Nov 2025 — Present",
        duration: "5 mos",
        location: "Pune, Maharashtra, India",
        mode: "On-site",
        description:
            "Working on agentic AI pipelines that handle content creation and marketing workflows through n8n. Basically automating what used to be manual social media ops.",
        responsibilities: [
            {
                icon: Rocket,
                label: "AI Pipelines",
                text: "Building n8n workflows that automate content generation and publishing across channels.",
            },
            {
                icon: Megaphone,
                label: "GTM Ops",
                text: "Helping scale the company's online presence through automation instead of manual effort.",
            },
        ],
        tags: ["n8n", "AI Agents", "Content Automation", "GTM", "Operations"],
        status: "ACTIVE",
    },
    {
        role: "AI/ML Lead",
        company: "IIIT Pune ACM SIGCHI Student Chapter",
        type: "Full-time",
        period: "Nov 2025 — Present",
        duration: "5 mos",
        location: "Pune, Maharashtra, India",
        mode: "On-site",
        description:
            "Part of the founding core team. Building the campus HCI community from the ground up — where ML meets actual user experience problems.",
        responsibilities: [
            {
                icon: Rocket,
                label: "Technical Direction",
                text: "Setting the chapter's technical direction and figuring out what projects actually matter.",
            },
            {
                icon: Brain,
                label: "AI × Design",
                text: "Running projects and workshops around making AI/ML stuff more usable for real people.",
            },
            {
                icon: Users,
                label: "Events",
                text: "Putting together tech events, coding jams, and talks that go beyond slides and theory.",
            },
        ],
        tags: ["HCI", "Machine Learning", "UX Research", "Workshops", "Community"],
        status: "ACTIVE",
    },
];

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
                type: "spring" as const,
                stiffness: 100,
                damping: 20,
                delay: index * 0.15,
            }}
            className="glass-card rounded-xl p-6 md:p-8 group hover:bg-zinc-950/80 hover:border-emerald-500/20 transition-all duration-300 border border-zinc-800/40"
        >
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                <div className="flex-1">
                    {/* Company + Type badge */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="font-mono text-[11px] text-zinc-400 bg-zinc-900 border border-zinc-800/50 rounded px-2.5 py-1 tracking-widest">
                            {exp.company}
                        </span>
                        <span className="font-mono text-[10px] text-zinc-500 tracking-wider">
                            · {exp.type}
                        </span>
                    </div>

                    {/* Role title */}
                    <h3 className="font-mono text-lg md:text-xl font-bold text-white group-hover:text-zinc-100 transition-colors">
                        {exp.role}
                    </h3>
                </div>

                {/* Status */}
                <div className="flex items-center gap-1.5 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono text-[10px] text-emerald-500 tracking-wider animate-pulse">
                        {exp.status}
                    </span>
                </div>
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 mb-5 text-zinc-500">
                <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    <span className="font-mono text-[11px] tracking-wider">
                        {exp.period}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-600">
                        ({exp.duration})
                    </span>
                </div>
                <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" />
                    <span className="font-mono text-[11px] tracking-wider">
                        {exp.location}
                    </span>
                </div>
                <span className="font-mono text-[10px] text-zinc-600 bg-zinc-900/50 border border-zinc-800/30 rounded px-2 py-0.5 tracking-wider">
                    {exp.mode}
                </span>
            </div>

            {/* Description — terminal style */}
            <p className="font-mono text-xs text-zinc-400 leading-relaxed mb-6">
                <span className="text-emerald-500/50 mr-1">{">"}</span>
                {exp.description}
            </p>

            {/* Responsibilities */}
            <div className="space-y-3 mb-6">
                <span className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase">
                    Key Responsibilities
                </span>
                {exp.responsibilities.map((resp, i) => {
                    const RespIcon = resp.icon;
                    return (
                        <div
                            key={i}
                            className="flex items-start gap-3 bg-zinc-900/40 border border-zinc-800/30 rounded-lg p-3"
                        >
                            <div className="w-7 h-7 rounded-md bg-zinc-800/50 flex items-center justify-center shrink-0 mt-0.5">
                                <RespIcon className="w-3.5 h-3.5 text-zinc-400" />
                            </div>
                            <div>
                                <span className="font-mono text-[11px] text-zinc-300 font-semibold">
                                    {resp.label}
                                </span>
                                <p className="font-mono text-[11px] text-zinc-500 leading-relaxed mt-0.5">
                                    {resp.text}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
                {exp.tags.map((tag) => (
                    <span
                        key={tag}
                        className="font-mono text-[10px] text-zinc-400 bg-zinc-900/50 border border-zinc-800/40 rounded-md px-2 py-0.5 tracking-wider"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}

export default function ExperiencePage() {
    return (
        <div className="min-h-screen pt-24 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Page header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <span className="font-mono text-xs text-zinc-600 tracking-widest">
                            05
                        </span>
                        <span className="w-8 h-px bg-zinc-800" />
                        <span className="font-mono text-xs text-zinc-600 tracking-widest uppercase">
                            Work Log
                        </span>
                    </div>
                    <h1 className="font-mono text-4xl sm:text-5xl font-bold text-white tracking-tight">
                        Experience
                    </h1>
                    <p className="font-mono text-sm text-zinc-500 mt-3 max-w-lg">
                        Active deployments in the field — building, leading, and shipping
                        where it counts.
                    </p>
                </motion.div>

                {/* Experience cards */}
                <div className="space-y-6">
                    {experiences.map((exp, index) => (
                        <ExperienceCard key={index} exp={exp} index={index} />
                    ))}
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="mt-12 flex items-center justify-center gap-3"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span className="font-mono text-[11px] text-zinc-600 tracking-wider">
                        STATUS: CURRENTLY_DEPLOYED
                    </span>
                </motion.div>
            </div>
        </div>
    );
}
