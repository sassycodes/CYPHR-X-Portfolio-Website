"use client";

import { motion } from "framer-motion";
import NeuralNetwork from "@/components/neural-network";

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-24 pb-10 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                {/* Page header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <span className="font-mono text-xs text-zinc-600 tracking-widest">
                            00
                        </span>
                        <span className="w-8 h-px bg-zinc-800" />
                        <span className="font-mono text-xs text-zinc-600 tracking-widest uppercase">
                            About
                        </span>
                    </div>
                    <h1 className="font-mono text-4xl sm:text-5xl font-bold text-white tracking-tight">
                        What&apos;s Cooking Up in My Brain?
                    </h1>
                    <p className="font-mono text-sm text-zinc-500 mt-3 max-w-lg">
                        <span className="text-emerald-500/50 mr-1">{">"}</span>
                        A live feed of the technologies, rabbit holes, and research I&apos;m currently obsessed with.
                        Drag the nodes to explore the connections. Hover for details.
                    </p>
                </motion.div>

                {/* Neural Network Canvas */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="glass-card rounded-xl overflow-hidden"
                >
                    <NeuralNetwork />
                </motion.div>

                {/* Legend */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="mt-6 flex flex-wrap items-center justify-center gap-6"
                >
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
                        <span className="font-mono text-[10px] text-zinc-500 tracking-wider">CORE</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/25 border border-emerald-500/30" />
                        <span className="font-mono text-[10px] text-zinc-500 tracking-wider">CATEGORY</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-300/20 border border-emerald-500/15" />
                        <span className="font-mono text-[10px] text-zinc-500 tracking-wider">NODE</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-px bg-emerald-500/30" />
                        <span className="font-mono text-[10px] text-zinc-500 tracking-wider">SYNAPSE</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-mono text-[10px] text-zinc-500 tracking-wider">SIGNAL</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
