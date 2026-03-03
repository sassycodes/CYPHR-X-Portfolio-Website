"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TypingTextProps {
    text: string;
    className?: string;
    speed?: number;
    delay?: number;
}

export default function TypingText({
    text,
    className,
    speed = 30,
    delay = 800,
}: TypingTextProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        setDisplayedText("");
        let index = 0;

        const startTimeout = setTimeout(() => {
            const interval = setInterval(() => {
                if (index < text.length) {
                    setDisplayedText(text.slice(0, index + 1));
                    index++;
                } else {
                    clearInterval(interval);
                    // Blink cursor a few times then hide
                    setTimeout(() => setShowCursor(false), 2000);
                }
            }, speed);

            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(startTimeout);
    }, [text, speed, delay]);

    return (
        <span className={cn("font-mono", className)}>
            {displayedText}
            {showCursor && (
                <span className="animate-pulse text-emerald-500">▌</span>
            )}
        </span>
    );
}
