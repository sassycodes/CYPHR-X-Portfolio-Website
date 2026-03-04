"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
    label: string;
    value?: number;
    suffix?: string;
    textValue?: string;
}

const stats: Stat[] = [
    { label: "Hackathons", value: 6, suffix: "+" },
    { label: "Projects Shipped", value: 3 },
    { label: "Coffees Consumed", textValue: "idk", suffix: " (not many tho)" },
];

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!isInView) return;

        let start = 0;
        const duration = 1500;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * value);
            setCount(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, value]);

    return (
        <span ref={ref} className="tabular-nums">
            {count}{suffix}
        </span>
    );
}

export default function StatsBar() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-3xl mx-auto mt-10 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
        >
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="glass-card rounded-lg px-4 py-4 sm:py-5 text-center group hover:border-emerald-500/20 transition-all duration-300"
                >
                    <div className="font-mono text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
                        {stat.textValue ? (
                            <span>{stat.textValue}<span className="text-xs font-normal text-zinc-500">{stat.suffix}</span></span>
                        ) : (
                            <AnimatedCounter value={stat.value!} suffix={stat.suffix} />
                        )}
                    </div>
                    <div className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
                        {stat.label}
                    </div>
                </div>
            ))}
        </motion.div>
    );
}
