"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ProjectCard from "@/components/project-card";

const projects = [
    {
        title: "Imagine_OS",
        description:
            "AI text-to-video pipeline. Feed it a prompt, it storyboards through Gemini, renders video via Veo, all orchestrated with n8n. Built this in first semester.",
        tech: ["n8n", "Google Gemini", "Veo", "AI Agents"],
        span: "col-span-2",
        status: "SHIPPED",
    },
    {
        title: "CogniTrust 2.0",
        description:
            "Deepfake audio detection with spectral analysis + neural classifiers. Generates blockchain-anchored certificates as proof. Built for real-world evidence workflows.",
        tech: ["Python", "PyTorch", "FastAPI", "Blockchain"],
        span: "col-span-1",
        status: "v2.0",
    },
    {
        title: "Userspace VPN",
        description:
            "Building a VPN from scratch in C++ — raw sockets, custom encryption tunnels, packet routing. No kernel modules. Pure userspace networking. Still in development.",
        tech: ["C++", "Sockets", "Networking", "Cryptography"],
        span: "col-span-1",
        status: "IN DEV",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 20,
        },
    },
};

export default function ProjectsPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Page header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <span className="font-mono text-xs text-zinc-600 tracking-widest">
                            02
                        </span>
                        <span className="w-8 h-px bg-zinc-800" />
                        <span className="font-mono text-xs text-zinc-600 tracking-widest uppercase">
                            Projects
                        </span>
                    </div>
                    <h1 className="font-mono text-4xl sm:text-5xl font-bold text-white tracking-tight">
                        What I&apos;ve Built
                    </h1>
                    <p className="font-mono text-sm text-zinc-500 mt-3 max-w-lg">
                        <span className="text-emerald-500/50 mr-1">{">"}  </span>
                        Engineering projects that prove theory through execution. Each one
                        built from the ground up, no templates, no shortcuts.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.title}
                            variants={itemVariants}
                            className={`${project.span} md:${project.span}`}
                        >
                            <ProjectCard {...project} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
