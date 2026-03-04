"use client";

import { motion } from "framer-motion";
import { Shield, Trophy, Code, Cpu, Zap, Target, Users } from "lucide-react";

const achievements = [
    {
        timestamp: "2025.02",
        level: "LEAD",
        icon: Users,
        title: "AI/ML Lead — ACM SIGCHI Chapter",
        description:
            "Appointed as the AI/ML Lead for the college ACM SIGCHI chapter. Driving research initiatives, workshops, and project sprints in machine learning, NLP, and human-computer interaction across the student body.",
    },

    {
        timestamp: "2025.01",
        level: "Runners Up",
        icon: Users,
        title: "NeuroSys AI Hackathon",
        description:
            "Built an end-to-end contextual video generation platform and stood as the second runners up in the intra-cllg hackathon.",
    },

    {
        timestamp: "2026.01",
        level: "Shortlisted",
        icon: Users,
        title: "Trust-AI Ideathon (under the India AI Impact Summit'26)",
        description:
            "Stood amongnst top 20 teams to qualify for the final round of the Trust-AI Ideathon. Built a systematic protocol to flag and assign liability in the case of crimes related to deep-fake media",
    },



    {
        timestamp: "2024.08",
        level: "INIT",
        icon: Target,
        title: "Entered IIIT — STEM Journey Begins",
        description:
            "Commenced first year at IIIT with focus on AI, systems programming, and cybersecurity. Hit the ground running — shipping code from day one instead of waiting for the syllabus.",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -20, y: 10 },
    visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 20,
        },
    },
};

export default function AchievementsPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6">
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
                            03
                        </span>
                        <span className="w-8 h-px bg-zinc-800" />
                        <span className="font-mono text-xs text-zinc-600 tracking-widest uppercase">
                            System Log
                        </span>
                    </div>
                    <h1 className="font-mono text-4xl sm:text-5xl font-bold text-white tracking-tight">
                        Achievements
                    </h1>
                    <p className="font-mono text-sm text-zinc-500 mt-3 max-w-lg">
                        A chronological execution trace of milestones, deployments, and
                        impact events — logged from the system.
                    </p>
                </motion.div>

                {/* System log entries */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-3"
                >
                    {achievements.map((achievement, index) => {
                        const Icon = achievement.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="glass-card rounded-lg p-5 group hover:bg-zinc-950/80 hover:border-emerald-500/20 transition-all duration-300 cursor-default"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                                    {/* Timestamp + Level badge */}
                                    <div className="flex sm:flex-col items-center sm:items-start gap-2 sm:gap-1 sm:min-w-[100px] shrink-0">
                                        <span className="font-mono text-[11px] text-zinc-600 tracking-wider">
                                            {achievement.timestamp}
                                        </span>
                                        <span className="font-mono text-[10px] bg-zinc-900 border border-zinc-800/50 rounded px-2 py-0.5 tracking-widest" style={{ color: '#C5A455' }}>
                                            [{achievement.level}]
                                        </span>
                                    </div>

                                    {/* Icon */}
                                    <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-md bg-zinc-900/50 border border-zinc-800/40 shrink-0 group-hover:border-emerald-500/20 transition-colors">
                                        <Icon className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-grow">
                                        <h3 className="font-mono text-sm font-semibold text-white mb-1.5 group-hover:text-zinc-100">
                                            {achievement.title}
                                        </h3>
                                        <p className="font-mono text-xs text-zinc-500 leading-relaxed">
                                            <span className="text-emerald-500/50 mr-1">{">"}</span>
                                            {achievement.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Terminal EOF */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="mt-8 text-center"
                >
                    <span className="font-mono text-[10px] text-zinc-700 tracking-wider">
                        — END OF LOG —
                    </span>
                </motion.div>
            </div>
        </div>
    );
}
