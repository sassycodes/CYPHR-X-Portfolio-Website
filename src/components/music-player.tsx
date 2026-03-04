"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2 } from "lucide-react";

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Create audio element once
        audioRef.current = new Audio();
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3;
        // You can set the src to an .mp3 file later:
        // audioRef.current.src = "/audio/ambient.mp3";
        setIsLoaded(true);

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(() => {
                // Autoplay might be blocked
            });
        }
        setIsPlaying(!isPlaying);
    };

    if (!isLoaded) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
        >
            <button
                onClick={togglePlay}
                className="glass flex items-center gap-3 rounded-full px-4 py-2.5 transition-all duration-300 hover:bg-black/60 group cursor-pointer"
                aria-label={isPlaying ? "Pause music" : "Play music"}
            >
                {/* Frequency visualizer */}
                <div className="flex items-end gap-[2px] h-4">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="freq-bar"
                            style={{
                                animationPlayState: isPlaying ? "running" : "paused",
                                height: isPlaying ? undefined : "4px",
                            }}
                        />
                    ))}
                </div>

                {/* Play/Pause icon */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isPlaying ? "pause" : "play"}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                    >
                        {isPlaying ? (
                            <Pause className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                        ) : (
                            <Play className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                        )}
                    </motion.div>
                </AnimatePresence>

                <Volume2 className="w-3 h-3 text-zinc-600" />
            </button>
        </motion.div>
    );
}
