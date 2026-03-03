"use client";

import { useRef, useEffect, useState, useCallback } from "react";

// ─── Data ───────────────────────────────────────────────
interface NeuralNode {
    id: string;
    label: string;
    group: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
    glowColor: string;
    description?: string;
    href?: string;
}

interface Connection {
    from: string;
    to: string;
    pulse: number; // 0-1 progress of traveling pulse
    pulseSpeed: number;
    active: boolean;
}

const NODE_DATA: Omit<NeuralNode, "x" | "y" | "vx" | "vy">[] = [
    // Central
    { id: "cyphr", label: "CYPHR", group: "core", radius: 40, color: "#10B981", glowColor: "#10B981", description: "The Central Processing Unit" },

    // Category nodes — 7 clusters
    { id: "compete", label: "COMPETE", group: "category", radius: 22, color: "#10B981", glowColor: "#10B981" },
    { id: "build", label: "BUILD", group: "category", radius: 22, color: "#10B981", glowColor: "#10B981" },
    { id: "explore", label: "EXPLORE", group: "category", radius: 22, color: "#10B981", glowColor: "#10B981" },
    { id: "learn", label: "LEARN", group: "category", radius: 22, color: "#10B981", glowColor: "#10B981" },
    { id: "craft", label: "CRAFT", group: "category", radius: 22, color: "#10B981", glowColor: "#10B981" },
    { id: "curious", label: "CURIOUS", group: "category", radius: 22, color: "#10B981", glowColor: "#10B981" },
    { id: "beyond", label: "BEYOND", group: "category", radius: 22, color: "#10B981", glowColor: "#10B981" },

    // COMPETE — grind & glory
    { id: "hackathons", label: "Hackathons", group: "leaf", radius: 12, color: "#6EE7B7", glowColor: "#10B981", description: "6+ hackathons and counting" },
    { id: "ideathons", label: "Ideathons", group: "leaf", radius: 12, color: "#6EE7B7", glowColor: "#10B981", description: "TrustAI Ideathon — Top 20/273" },
    { id: "leetcode", label: "LeetCode Sprint", group: "leaf", radius: 10, color: "#6EE7B7", glowColor: "#10B981", description: "Currently on a DSA grind" },

    // BUILD — shipping code
    { id: "sysprog", label: "Systems Programming", group: "leaf", radius: 12, color: "#6EE7B7", glowColor: "#10B981", description: "C/C++, raw sockets, encryption tunnels" },
    { id: "ai-pipe", label: "AI Pipelines", group: "leaf", radius: 12, color: "#6EE7B7", glowColor: "#10B981", description: "n8n + Gemini + Veo orchestration" },
    { id: "ai-agents", label: "AI Agents", group: "leaf", radius: 12, color: "#6EE7B7", glowColor: "#10B981", description: "Building autonomous agents from scratch" },

    // EXPLORE — poking at everything
    { id: "cybersec", label: "Cybersecurity", group: "leaf", radius: 12, color: "#6EE7B7", glowColor: "#10B981", description: "Offense, defense, everything between" },
    { id: "kernel", label: "Kernel Hacking", group: "leaf", radius: 10, color: "#6EE7B7", glowColor: "#10B981", description: "Going below userspace" },
    { id: "ai-tools", label: "AI Tool Testing", group: "leaf", radius: 11, color: "#6EE7B7", glowColor: "#10B981", description: "First to try every new AI tool that drops" },

    // LEARN — absorbing knowledge
    { id: "deeptech", label: "Deep Tech Startups", group: "leaf", radius: 12, color: "#6EE7B7", glowColor: "#10B981", description: "Tracking the next wave" },
    { id: "litreview", label: "Literature Reviews", group: "leaf", radius: 10, color: "#6EE7B7", glowColor: "#10B981", description: "Independent research deep dives" },
    { id: "papers", label: "Research Papers", group: "leaf", radius: 10, color: "#6EE7B7", glowColor: "#10B981", description: "Reading & dissecting papers" },

    // CRAFT — the art of prompts & words
    { id: "vibecoding", label: "Vibe Coding", group: "leaf", radius: 12, color: "#6EE7B7", glowColor: "#10B981", description: "Claude, Antigravity, Gemini — daily drivers" },
    { id: "prompts", label: "Prompt Engineering", group: "leaf", radius: 11, color: "#6EE7B7", glowColor: "#10B981", description: "Contextual phrasing & structured prompts" },
    { id: "blog", label: "Blog (Launching Soon)", group: "leaf", radius: 10, color: "#6EE7B7", glowColor: "#10B981", description: "Documenting the chaos — coming soon" },

    // CURIOUS — intellectual rabbit holes
    { id: "psychology", label: "Psychology", group: "leaf", radius: 11, color: "#6EE7B7", glowColor: "#10B981", description: "How minds work, why people tick" },
    { id: "geopol", label: "Geopolitics & History", group: "leaf", radius: 11, color: "#6EE7B7", glowColor: "#10B981", description: "Power, borders, and the stories behind them" },
    { id: "space", label: "Space", group: "leaf", radius: 11, color: "#6EE7B7", glowColor: "#10B981", description: "The final frontier, always looking up" },

    // BEYOND — the offline life
    { id: "manga", label: "Manga", group: "leaf", radius: 12, color: "#6EE7B7", glowColor: "#10B981", description: "Niche collections, always reading" },
    { id: "books", label: "Books", group: "leaf", radius: 11, color: "#6EE7B7", glowColor: "#10B981", description: "Non-fiction, sci-fi, whatever catches the eye" },
    { id: "rabbitholes", label: "Rabbit Holes", group: "leaf", radius: 10, color: "#6EE7B7", glowColor: "#10B981", description: "3 AM Wikipedia spirals about everything" },
];

const CONNECTIONS_DATA: [string, string][] = [
    // Core → Categories
    ["cyphr", "compete"],
    ["cyphr", "build"],
    ["cyphr", "explore"],
    ["cyphr", "learn"],
    ["cyphr", "craft"],
    ["cyphr", "curious"],
    ["cyphr", "beyond"],
    // COMPETE
    ["compete", "hackathons"],
    ["compete", "ideathons"],
    ["compete", "leetcode"],
    // BUILD
    ["build", "sysprog"],
    ["build", "ai-pipe"],
    ["build", "ai-agents"],
    // EXPLORE
    ["explore", "cybersec"],
    ["explore", "kernel"],
    ["explore", "ai-tools"],
    // LEARN
    ["learn", "deeptech"],
    ["learn", "litreview"],
    ["learn", "papers"],
    // CRAFT
    ["craft", "vibecoding"],
    ["craft", "prompts"],
    ["craft", "blog"],
    // CURIOUS
    ["curious", "psychology"],
    ["curious", "geopol"],
    ["curious", "space"],
    // BEYOND
    ["beyond", "manga"],
    ["beyond", "books"],
    ["beyond", "rabbitholes"],
    // Cross-connections — the neural links between interests
    ["vibecoding", "ai-agents"],      // vibe coding feeds into building agents
    ["ai-tools", "prompts"],          // testing tools ↔ crafting prompts
    ["books", "psychology"],          // reading connects to understanding minds
    ["leetcode", "sysprog"],          // DSA grind feeds systems work
    ["ai-pipe", "deeptech"],          // pipelines ↔ deep tech
    ["cybersec", "kernel"],           // security ↔ low-level
    ["geopol", "litreview"],          // geopolitics research
    ["ai-agents", "ai-tools"],        // building agents ↔ testing tools
];

// Category IDs for circular pre-positioning
const CATEGORY_IDS = ["compete", "build", "explore", "learn", "craft", "curious", "beyond"];
const CATEGORY_CHILDREN: Record<string, string[]> = {
    compete: ["hackathons", "ideathons", "leetcode"],
    build: ["sysprog", "ai-pipe", "ai-agents"],
    explore: ["cybersec", "kernel", "ai-tools"],
    learn: ["deeptech", "litreview", "papers"],
    craft: ["vibecoding", "prompts", "blog"],
    curious: ["psychology", "geopol", "space"],
    beyond: ["manga", "books", "rabbitholes"],
};

// ─── Force simulation helpers ───────────────────────────
function initNodes(width: number, height: number): NeuralNode[] {
    const cx = width / 2;
    const cy = height / 2;
    const catRadius = Math.min(width, height) * 0.28; // category orbit radius
    const leafRadius = Math.min(width, height) * 0.15; // leaf offset from category

    return NODE_DATA.map((nd) => {
        let x = cx;
        let y = cy;

        if (nd.id === "cyphr") {
            // Pin to center
            x = cx;
            y = cy;
        } else if (nd.group === "category") {
            // Place categories in a circle around center
            const idx = CATEGORY_IDS.indexOf(nd.id);
            const angle = (idx / CATEGORY_IDS.length) * Math.PI * 2 - Math.PI / 2;
            x = cx + Math.cos(angle) * catRadius;
            y = cy + Math.sin(angle) * catRadius;
        } else if (nd.group === "leaf") {
            // Place leaves near their parent category
            for (const [catId, children] of Object.entries(CATEGORY_CHILDREN)) {
                const childIdx = children.indexOf(nd.id);
                if (childIdx >= 0) {
                    const catIdx = CATEGORY_IDS.indexOf(catId);
                    const catAngle = (catIdx / CATEGORY_IDS.length) * Math.PI * 2 - Math.PI / 2;
                    const catX = cx + Math.cos(catAngle) * catRadius;
                    const catY = cy + Math.sin(catAngle) * catRadius;
                    const leafAngle = catAngle + ((childIdx - 1) * 0.5);
                    x = catX + Math.cos(leafAngle) * leafRadius;
                    y = catY + Math.sin(leafAngle) * leafRadius;
                    break;
                }
            }
        }

        return { ...nd, x, y, vx: 0, vy: 0 };
    });
}

function initConnections(): Connection[] {
    return CONNECTIONS_DATA.map(([from, to]) => ({
        from,
        to,
        pulse: Math.random(),
        pulseSpeed: 0.002 + Math.random() * 0.004,
        active: Math.random() > 0.6,
    }));
}

// ─── Component ──────────────────────────────────────────
export default function NeuralNetwork() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const nodesRef = useRef<NeuralNode[]>([]);
    const connectionsRef = useRef<Connection[]>([]);
    const mouseRef = useRef({ x: 0, y: 0, down: false });
    const hoveredRef = useRef<string | null>(null);
    const dragRef = useRef<string | null>(null);
    const animRef = useRef<number>(0);
    const [tooltip, setTooltip] = useState<{ x: number; y: number; label: string; desc: string } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ w: 800, h: 600 });

    // Init — size to container, not window
    useEffect(() => {
        const resize = () => {
            const container = containerRef.current;
            const w = container ? container.clientWidth : window.innerWidth - 48;
            const h = Math.max(550, window.innerHeight - 200);
            setDimensions({ w, h });
            // Re-init nodes on first load or if they haven't been created
            if (nodesRef.current.length === 0) {
                nodesRef.current = initNodes(w, h);
                connectionsRef.current = initConnections();
            }
        };
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    // Force simulation
    const simulate = useCallback(() => {
        const nodes = nodesRef.current;
        const { w, h } = dimensions;
        const cx = w / 2;
        const cy = h / 2;

        for (const node of nodes) {
            // CYPHR: very strong center lock
            if (node.id === "cyphr") {
                node.vx += (cx - node.x) * 0.08;
                node.vy += (cy - node.y) * 0.08;
            } else {
                // Others: gentle center pull to prevent drift
                node.vx += (cx - node.x) * 0.001;
                node.vy += (cy - node.y) * 0.001;
            }

            // Repulsion between all nodes — stronger force, bigger min distance
            for (const other of nodes) {
                if (node.id === other.id) continue;
                const dx = node.x - other.x;
                const dy = node.y - other.y;
                const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
                const minDist = (node.radius + other.radius) * 4;
                if (dist < minDist) {
                    const force = ((minDist - dist) / dist) * 0.8;
                    node.vx += dx * force;
                    node.vy += dy * force;
                }
            }
        }

        // Spring forces along connections — bigger target distances
        for (const conn of connectionsRef.current) {
            const a = nodes.find((n) => n.id === conn.from);
            const b = nodes.find((n) => n.id === conn.to);
            if (!a || !b) continue;

            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
            // Core-to-category: 250px, category-to-leaf: 150px, cross-links: 120px
            let targetDist = 120;
            if (a.group === "core" || b.group === "core") targetDist = 250;
            else if (a.group === "category" || b.group === "category") targetDist = 150;
            const force = (dist - targetDist) * 0.004;

            a.vx += (dx / dist) * force;
            a.vy += (dy / dist) * force;
            b.vx -= (dx / dist) * force;
            b.vy -= (dy / dist) * force;
        }

        // Integrate + damping
        for (const node of nodes) {
            if (node.id === dragRef.current) continue;
            node.vx *= 0.82;
            node.vy *= 0.82;
            // Dead-zone: kill micro-vibrations
            if (Math.abs(node.vx) < 0.1) node.vx = 0;
            if (Math.abs(node.vy) < 0.1) node.vy = 0;
            node.x += node.vx;
            node.y += node.vy;
            // Bounds with padding
            const pad = 40;
            node.x = Math.max(pad, Math.min(w - pad, node.x));
            node.y = Math.max(pad, Math.min(h - pad, node.y));
        }
    }, [dimensions]);

    // Drawing
    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const { w, h } = dimensions;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, w, h);

        const nodes = nodesRef.current;
        const connections = connectionsRef.current;
        const hovered = hoveredRef.current;

        // Draw connections
        for (const conn of connections) {
            const a = nodes.find((n) => n.id === conn.from);
            const b = nodes.find((n) => n.id === conn.to);
            if (!a || !b) continue;

            const isHighlighted = hovered && (conn.from === hovered || conn.to === hovered);
            const opacity = isHighlighted ? 0.5 : 0.12;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${opacity})`;
            ctx.lineWidth = isHighlighted ? 1.5 : 0.8;
            ctx.stroke();

            // Pulse dot traveling along connection
            if (conn.active) {
                conn.pulse += conn.pulseSpeed;
                if (conn.pulse > 1) {
                    conn.pulse = 0;
                    conn.active = Math.random() > 0.3;
                }
                const px = a.x + (b.x - a.x) * conn.pulse;
                const py = a.y + (b.y - a.y) * conn.pulse;
                ctx.beginPath();
                ctx.arc(px, py, 2, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(16, 185, 129, 0.8)";
                ctx.fill();
            } else {
                if (Math.random() > 0.998) conn.active = true;
            }
        }

        // Draw nodes
        const time = Date.now() * 0.001;
        for (const node of nodes) {
            const isHovered = hovered === node.id;

            // Glow
            if (node.group === "core" || isHovered) {
                const glowSize = node.group === "core" ? 60 + Math.sin(time * 2) * 10 : 30;
                const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowSize);
                gradient.addColorStop(0, `rgba(16, 185, 129, ${node.group === "core" ? 0.3 : 0.2})`);
                gradient.addColorStop(1, "rgba(16, 185, 129, 0)");
                ctx.beginPath();
                ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
            }

            // Node circle
            const r = isHovered ? node.radius * 1.3 : node.radius;
            ctx.beginPath();
            ctx.arc(node.x, node.y, r, 0, Math.PI * 2);

            if (node.group === "core") {
                const breathe = 0.7 + Math.sin(time * 1.5) * 0.3;
                ctx.fillStyle = `rgba(16, 185, 129, ${breathe})`;
            } else if (node.group === "category") {
                ctx.fillStyle = isHovered ? "rgba(16, 185, 129, 0.6)" : "rgba(16, 185, 129, 0.25)";
            } else {
                ctx.fillStyle = isHovered ? "rgba(110, 231, 183, 0.7)" : "rgba(110, 231, 183, 0.2)";
            }
            ctx.fill();

            // Border
            ctx.beginPath();
            ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
            ctx.strokeStyle = isHovered
                ? "rgba(16, 185, 129, 0.8)"
                : node.group === "core"
                    ? "rgba(16, 185, 129, 0.5)"
                    : "rgba(16, 185, 129, 0.15)";
            ctx.lineWidth = node.group === "core" ? 2 : 1;
            ctx.stroke();

            // Labels
            const showLabel = node.group === "core" || node.group === "category" || isHovered;
            if (showLabel) {
                ctx.font =
                    node.group === "core"
                        ? "bold 16px var(--font-geist-mono), monospace"
                        : node.group === "category"
                            ? "bold 12px var(--font-geist-mono), monospace"
                            : "11px var(--font-geist-mono), monospace";
                ctx.textAlign = "center";
                ctx.fillStyle =
                    node.group === "core"
                        ? "rgba(255, 255, 255, 0.9)"
                        : isHovered
                            ? "rgba(255, 255, 255, 0.8)"
                            : "rgba(161, 161, 170, 0.7)";
                ctx.fillText(node.label, node.x, node.y + r + 16);
            }
        }
    }, [dimensions]);

    // Animation loop
    useEffect(() => {
        if (nodesRef.current.length === 0) return;

        const loop = () => {
            simulate();
            draw();
            animRef.current = requestAnimationFrame(loop);
        };
        animRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(animRef.current);
    }, [simulate, draw]);

    // Mouse handlers
    const getNodeAt = useCallback((mx: number, my: number): NeuralNode | null => {
        for (const node of nodesRef.current) {
            const dx = mx - node.x;
            const dy = my - node.y;
            if (dx * dx + dy * dy < (node.radius + 8) ** 2) return node;
        }
        return null;
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        mouseRef.current = { ...mouseRef.current, x: mx, y: my };

        if (dragRef.current) {
            const node = nodesRef.current.find((n) => n.id === dragRef.current);
            if (node) {
                node.x = mx;
                node.y = my;
                node.vx = 0;
                node.vy = 0;
            }
            return;
        }

        const node = getNodeAt(mx, my);
        hoveredRef.current = node?.id ?? null;

        if (node && node.description) {
            setTooltip({ x: mx, y: my, label: node.label, desc: node.description });
        } else {
            setTooltip(null);
        }
    }, [getNodeAt]);

    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const node = getNodeAt(mx, my);
        if (node) {
            dragRef.current = node.id;
            mouseRef.current.down = true;
        }
    }, [getNodeAt]);

    const handleMouseUp = useCallback(() => {
        dragRef.current = null;
        mouseRef.current.down = false;
    }, []);

    const handleMouseLeave = useCallback(() => {
        hoveredRef.current = null;
        dragRef.current = null;
        mouseRef.current.down = false;
        setTooltip(null);
    }, []);

    return (
        <div ref={containerRef} className="relative w-full" style={{ height: dimensions.h }}>
            <canvas
                ref={canvasRef}
                width={dimensions.w}
                height={dimensions.h}
                style={{ width: "100%", height: dimensions.h }}
                className="cursor-crosshair"
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
            />

            {/* Tooltip */}
            {tooltip && (
                <div
                    className="absolute pointer-events-none z-20 glass rounded-lg px-3 py-2 max-w-[200px]"
                    style={{
                        left: tooltip.x + 16,
                        top: tooltip.y - 10,
                        transform: "translateY(-50%)",
                    }}
                >
                    <div className="font-mono text-xs font-semibold text-white mb-0.5">
                        {tooltip.label}
                    </div>
                    <div className="font-mono text-[10px] text-zinc-400 leading-relaxed">
                        <span className="text-emerald-500/60 mr-1">{">"}</span>
                        {tooltip.desc}
                    </div>
                </div>
            )}
        </div>
    );
}
