"use client";

import { useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

function DiscordIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
    );
}

const DISCORD_USERNAME = "sarthak_106624";

const socials = [
    {
        name: "GitHub",
        href: "https://github.com/sassycodes",
        icon: Github,
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/sarthak-gaikwad-23496b379",
        icon: Linkedin,
    },
    {
        name: "Discord",
        href: "#discord",
        icon: DiscordIcon,
    },
    {
        name: "Email",
        href: "mailto:sarthakg1827@gmail.com",
        icon: Mail,
    },
];

export default function Footer() {
    const [copied, setCopied] = useState(false);

    const handleDiscordClick = (e: React.MouseEvent) => {
        e.preventDefault();
        navigator.clipboard.writeText(DISCORD_USERNAME);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <footer className="relative z-10 border-t border-zinc-800/50 mt-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    {/* Left — branding */}
                    <div className="flex flex-col items-center sm:items-start gap-1">
                        <span className="font-mono text-xs font-semibold tracking-[0.25em] text-zinc-400 uppercase">
                            CYPHR
                        </span>
                        <span className="font-mono text-[10px] text-zinc-600 tracking-wider">
                            © {new Date().getFullYear()} · All rights reserved
                        </span>
                    </div>

                    {/* Center — social links */}
                    <div className="flex items-center gap-4">
                        {socials.map((social) => {
                            const Icon = social.icon;
                            const isDiscord = social.name === "Discord";
                            return (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target={isDiscord ? undefined : "_blank"}
                                    rel={isDiscord ? undefined : "noopener noreferrer"}
                                    onClick={isDiscord ? handleDiscordClick : undefined}
                                    className="group relative p-2 rounded-lg border border-zinc-800/40 bg-zinc-900/30 hover:border-emerald-500/20 hover:bg-zinc-900/60 transition-all duration-300"
                                    aria-label={social.name}
                                    title={isDiscord ? (copied ? "Copied!" : `Copy: ${DISCORD_USERNAME}`) : social.name}
                                >
                                    <Icon className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 transition-colors duration-300" />
                                    {/* Glow */}
                                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-emerald-500/[0.04]" />
                                    {/* Copied tooltip */}
                                    {isDiscord && copied && (
                                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 font-mono text-[10px] text-emerald-400 bg-zinc-900 border border-emerald-500/20 rounded px-2 py-0.5 whitespace-nowrap">
                                            Copied!
                                        </span>
                                    )}
                                </a>
                            );
                        })}
                    </div>

                    {/* Right — status */}
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-mono text-[10px] text-zinc-600 tracking-wider">
                            SYSTEM ONLINE
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
