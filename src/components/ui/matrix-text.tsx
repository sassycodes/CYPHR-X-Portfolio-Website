"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LetterState {
    char: string;
    isMatrix: boolean;
    isSpace: boolean;
}

interface MatrixTextProps {
    text?: string;
    className?: string;
    letterAnimationDuration?: number;
    letterInterval?: number;
}

export const MatrixText = ({
    text = "HelloWorld!",
    className,
    letterAnimationDuration = 400,
    letterInterval = 80,
}: MatrixTextProps) => {
    const isFirstRender = useRef(true);

    const [letters, setLetters] = useState<LetterState[]>(() =>
        text.split("").map((char) => ({
            char,
            isMatrix: false,
            isSpace: char === " ",
        }))
    );

    const getRandomChar = useCallback(
        () => (Math.random() > 0.5 ? "1" : "0"),
        []
    );

    const animateTransition = useCallback(
        (newText: string) => {
            // Start with all letters as binary
            setLetters(
                newText.split("").map((char) => ({
                    char: char === " " ? " " : getRandomChar(),
                    isMatrix: char !== " ",
                    isSpace: char === " ",
                }))
            );

            // Reveal each letter one by one
            newText.split("").forEach((char, index) => {
                if (char === " ") return;

                setTimeout(() => {
                    setLetters((prev) => {
                        const updated = [...prev];
                        if (updated[index]) {
                            updated[index] = {
                                ...updated[index],
                                char: newText[index],
                                isMatrix: false,
                            };
                        }
                        return updated;
                    });
                }, (index + 1) * letterInterval + letterAnimationDuration);
            });
        },
        [getRandomChar, letterInterval, letterAnimationDuration]
    );

    useEffect(() => {
        // Skip animation on first render — show text statically
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        // On subsequent text changes, play the decode animation
        animateTransition(text);
    }, [text]);

    return (
        <span
            className={cn("inline-flex items-center", className)}
            aria-label={text}
        >
            {letters.map((letter, index) => (
                <motion.span
                    key={`${index}`}
                    className="w-[1ch] text-center overflow-hidden inline-block"
                    animate={
                        letter.isMatrix
                            ? {
                                color: "#10B981",
                                textShadow:
                                    "0 0 12px rgba(16, 185, 129, 0.6)",
                            }
                            : {
                                color: "inherit",
                                textShadow: "none",
                            }
                    }
                    transition={{
                        duration: 0.15,
                        ease: "easeInOut",
                    }}
                    style={{ fontVariantNumeric: "tabular-nums" }}
                >
                    {letter.isSpace ? "\u00A0" : letter.char}
                </motion.span>
            ))}
        </span>
    );
};
