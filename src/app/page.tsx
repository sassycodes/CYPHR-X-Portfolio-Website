"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { MatrixText } from "@/components/ui/matrix-text";
import TypingText from "@/components/ui/typing-text";
import StatsBar from "@/components/stats-bar";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
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

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 5) return "Late Night";
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  if (hour < 21) return "Good Evening";
  return "Late Night";
}

export default function Home() {
  const [showAlias, setShowAlias] = useState(true);
  const [greeting, setGreeting] = useState("Welcome");

  useEffect(() => {
    setGreeting(getGreeting());
    const interval = setInterval(() => {
      setShowAlias((prev) => !prev);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-20">
      <Card className="w-full max-w-7xl min-h-[420px] md:h-[700px] bg-black/[0.96] border-zinc-800/60 relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="#10B981"
        />

        <div className="flex flex-col md:flex-row h-full">
          {/* Left content — Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 p-5 sm:p-8 md:p-12 lg:p-16 relative z-10 flex flex-col justify-center"
          >
            {/* Status badge with greeting */}
            <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
              <div className="inline-flex items-center gap-2 glass rounded-full px-3 sm:px-4 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[10px] sm:text-xs text-zinc-400 tracking-wider">
                  {greeting} · SYSTEM ONLINE
                </span>
              </div>
            </motion.div>

            {/* Main heading — matrix decode toggle */}
            <motion.div variants={itemVariants}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold font-mono leading-[0.95] tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                <MatrixText
                  text={showAlias ? "CYPHR" : "SARTHAK"}
                  letterAnimationDuration={400}
                  letterInterval={80}
                />
              </h1>
            </motion.div>

            {/* Divider */}
            <motion.div
              variants={itemVariants}
              className="w-16 h-px bg-gradient-to-r from-emerald-500/60 to-transparent my-4 sm:my-6"
            />

            {/* Subtitle — typing terminal effect */}
            <motion.div
              variants={itemVariants}
              className="font-mono text-xs sm:text-sm md:text-base text-neutral-400 max-w-md leading-relaxed tracking-wide"
            >
              <span className="text-emerald-500/70 mr-1">{">"}</span>
              <TypingText
                text={`Hey there! I'm a First Year student at IIIT Pune & I love to build and break things. My nerdy interests revolve around researching about interesting topics and reading Manga. `}
                speed={25}
                delay={1200}
              />
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={itemVariants} className="mt-6 sm:mt-8">
              <button
                onClick={() => toast("Resume unavailable: will be updated soon")}
                className="glow-button inline-flex items-center gap-2 rounded-lg px-5 sm:px-6 py-2.5 sm:py-3 font-mono text-xs sm:text-sm text-zinc-300 hover:text-white transition-colors duration-300 bg-transparent"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right content — Spline 3D Robot (hidden on mobile) */}
          <div className="hidden md:block flex-1 relative">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>

          {/* Mobile fallback glow (shown only on mobile) */}
          <div className="md:hidden absolute bottom-0 right-0 w-40 h-40 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-radial from-emerald-500/10 via-emerald-500/5 to-transparent rounded-full blur-3xl" />
          </div>
        </div>
      </Card>

      {/* Animated Stats Bar */}
      <StatsBar />
    </div>
  );
}
