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

    // Category nodes — 8 clusters
    { id: "languages", label: "LANGUAGES", group: "category", radius: 24, color: "#10B981", glowColor: "#10B981" },
    { id: "backend", label: "BACKEND", group: "category", radius: 24, color: "#10B981", glowColor: "#10B981" },
    { id: "frontend", label: "FRONTEND", group: "category", radius: 24, color: "#10B981", glowColor: "#10B981" },
    { id: "data_ai", label: "DATA & AI", group: "category", radius: 24, color: "#10B981", glowColor: "#10B981" },
    { id: "database", label: "DATABASE", group: "category", radius: 24, color: "#10B981", glowColor: "#10B981" },
    { id: "tools", label: "TOOLS", group: "category", radius: 24, color: "#10B981", glowColor: "#10B981" },
    { id: "research", label: "RESEARCH", group: "category", radius: 24, color: "#10B981", glowColor: "#10B981" },
    { id: "interests", label: "INTERESTS", group: "category", radius: 24, color: "#10B981", glowColor: "#10B981" },

    // LANGUAGES
    { id: "cpp", label: "C++ & C", group: "leaf", radius: 14, color: "#6EE7B7", glowColor: "#10B981", description: "The Builder's Bread and Butter — sockets, networking" },
    { id: "python", label: "Python", group: "leaf", radius: 14, color: "#6EE7B7", glowColor: "#10B981", description: "Primary tool for AI/ML and rapid prototyping" },
    { id: "js_ts", label: "JS / TypeScript", group: "leaf", radius: 13, color: "#6EE7B7", glowColor: "#10B981", description: "Extensive web development stack" },
    { id: "java_kotlin", label: "Java / Kotlin", group: "leaf", radius: 11, color: "#6EE7B7", glowColor: "#10B981", description: "Mobile components & Android dev" },
    { id: "bash", label: "Bash / Shell", group: "leaf", radius: 12, color: "#6EE7B7", glowColor: "#10B981", description: "Automation & terminal workflows" },

    // BACKEND
    { id: "fastapi", label: "FastAPI", group: "leaf", radius: 14, color: "#6EE7B7", glowColor: "#10B981", description: "High-performance APIs (TrustChain, CogniTrust)" },
    { id: "nodejs", label: "Node.js & Express", group: "leaf", radius: 13, color: "#6EE7B7", glowColor: "#10B981", description: "Backend logic and server architecture" },
    { id: "socketio", label: "Socket.io", group: "leaf", radius: 12, color: "#6EE7B7", glowColor: "#10B981", description: "Real-time bidirectional networking" },

    // FRONTEND
    { id: "nextjs", label: "Next.js & React", group: "leaf", radius: 14, color: "#6EE7B7", glowColor: "#10B981", description: "Modern, SEO-friendly, scalable UIs" },
    { id: "tailwind", label: "Tailwind CSS", group: "leaf", radius: 13, color: "#6EE7B7", glowColor: "#10B981", description: "Minimalist, aesthetic utility styling" },
    { id: "framer", label: "Framer Motion", group: "leaf", radius: 12, color: "#6EE7B7", glowColor: "#10B981", description: "Physics-based animations and layout transitions" },

    // DATA & AI
    { id: "pytorch", label: "TensorFlow / PyTorch", group: "leaf", radius: 14, color: "#6EE7B7", glowColor: "#10B981", description: "Neural classifiers & image segregation pipelines" },
    { id: "teachable", label: "Google Teachable Machine", group: "leaf", radius: 11, color: "#6EE7B7", glowColor: "#10B981", description: "Practical AI & quick model prototyping" },
    { id: "agents", label: "AI Agents (n8n)", group: "leaf", radius: 13, color: "#6EE7B7", glowColor: "#10B981", description: "Automated workflows and LLM orchestration" },
    { id: "prompt_eng", label: "Structured Prompts", group: "leaf", radius: 13, color: "#6EE7B7", glowColor: "#10B981", description: "Contextually structured prompt engineering" },

    // DATABASE
    { id: "mongodb", label: "MongoDB", group: "leaf", radius: 13, color: "#6EE7B7", glowColor: "#10B981", description: "Flexible NoSQL data handling" },
    { id: "supabase", label: "Supabase", group: "leaf", radius: 12, color: "#6EE7B7", glowColor: "#10B981", description: "Postgres, Auth, and Realtime BaaS" },
    { id: "firebase", label: "Firebase", group: "leaf", radius: 12, color: "#6EE7B7", glowColor: "#10B981", description: "Quick prototyping backend & data stores" },

    // TOOLS (The Vibe Stack)
    { id: "git", label: "Git / GitHub", group: "leaf", radius: 13, color: "#6EE7B7", glowColor: "#10B981", description: "Version control and open-source collaboration" },
    { id: "nmap", label: "Nmap", group: "leaf", radius: 11, color: "#6EE7B7", glowColor: "#10B981", description: "Network mapping and security audits" },
    { id: "vim_arch", label: "Vim & Arch Linux", group: "leaf", radius: 13, color: "#6EE7B7", glowColor: "#10B981", description: "Terminal-centric power user environment" },
    { id: "docker", label: "Docker", group: "leaf", radius: 12, color: "#6EE7B7", glowColor: "#10B981", description: "Containerization and local environments" },
    { id: "claude", label: "Claude", group: "leaf", radius: 12, color: "#6EE7B7", glowColor: "#10B981", description: "AI Pair Programming" },
    { id: "cursor", label: "Cursor", group: "leaf", radius: 12, color: "#6EE7B7", glowColor: "#10B981", description: "AI IDE of choice" },
    { id: "v0", label: "v0.dev", group: "leaf", radius: 11, color: "#6EE7B7", glowColor: "#10B981", description: "Generative UI" },
    { id: "antigravity", label: "Antigravity", group: "leaf", radius: 12, color: "#6EE7B7", glowColor: "#10B981", description: "Advanced Agentic Coding Partner" },

    // RESEARCH
    { id: "litreview", label: "Literature Reviews", group: "leaf", radius: 12, color: "#6EE7B7", glowColor: "#10B981", description: "Independent research and deep dives into academic papers" },
    { id: "lfcc", label: "LFCC", group: "leaf", radius: 13, color: "#6EE7B7", glowColor: "#10B981", description: "Linear Frequency Cepstral Coefficients" },
    { id: "bispectrum", label: "Bispectrum Analysis", group: "leaf", radius: 13, color: "#6EE7B7", glowColor: "#10B981", description: "Higher-order spectral analysis and signal processing" },

    // INTERESTS
    { id: "anime", label: "Anime & Manga", group: "leaf", radius: 11, color: "#6EE7B7", glowColor: "#10B981", description: "Always watching, always reading" },
    { id: "reading", label: "Reading", group: "leaf", radius: 11, color: "#6EE7B7", glowColor: "#10B981", description: "Absorbing knowledge in physical format" },
    { id: "blogging", label: "Blogging", group: "leaf", radius: 11, color: "#6EE7B7", glowColor: "#10B981", description: "Writing about tech (site launching soon!)" },
    { id: "useless_stuff", label: "Building Useless Stuff", group: "leaf", radius: 11, color: "#6EE7B7", glowColor: "#10B981", description: "Creating for the sake of creating" },
    { id: "emerging_ai", label: "Emerging AI Tech", group: "leaf", radius: 12, color: "#6EE7B7", glowColor: "#10B981", description: "First to try every new model and agent" },
];

const CONNECTIONS_DATA: [string, string][] = [
    // Core → Categories
    ["cyphr", "languages"],
    ["cyphr", "backend"],
    ["cyphr", "frontend"],
    ["cyphr", "data_ai"],
    ["cyphr", "database"],
    ["cyphr", "tools"],
    ["cyphr", "research"],
    ["cyphr", "interests"],

    // LANGUAGES
    ["languages", "cpp"],
    ["languages", "python"],
    ["languages", "js_ts"],
    ["languages", "java_kotlin"],
    ["languages", "bash"],

    // BACKEND
    ["backend", "fastapi"],
    ["backend", "nodejs"],
    ["backend", "socketio"],

    // FRONTEND
    ["frontend", "nextjs"],
    ["frontend", "tailwind"],
    ["frontend", "framer"],

    // DATA & AI
    ["data_ai", "pytorch"],
    ["data_ai", "teachable"],
    ["data_ai", "agents"],
    ["data_ai", "prompt_eng"],

    // DATABASE
    ["database", "mongodb"],
    ["database", "supabase"],
    ["database", "firebase"],

    // TOOLS
    ["tools", "git"],
    ["tools", "nmap"],
    ["tools", "vim_arch"],
    ["tools", "docker"],
    ["tools", "claude"],
    ["tools", "cursor"],
    ["tools", "v0"],
    ["tools", "antigravity"],

    // RESEARCH
    ["research", "litreview"],
    ["research", "lfcc"],
    ["research", "bispectrum"],

    // INTERESTS
    ["interests", "anime"],
    ["interests", "reading"],
    ["interests", "blogging"],
    ["interests", "useless_stuff"],
    ["interests", "emerging_ai"],

    // Cross-connections — how the stack interacts
    ["python", "fastapi"],          // Python powers FastAPI
    ["python", "pytorch"],          // Python powers ML
    ["js_ts", "nextjs"],            // TS powers Next.js
    ["js_ts", "nodejs"],            // JS powers Node
    ["nextjs", "tailwind"],         // Next integrates with Tailwind
    ["nextjs", "framer"],           // Next uses Framer for UI
    ["bash", "vim_arch"],           // Shell powers Linux workflow
    ["cpp", "nmap"],                // Low-level connects to networking tools
    ["fastapi", "supabase"],        // Backend to Database
    ["nodejs", "mongodb"],          // Backend to Database
    ["python", "lfcc"],             // Python likely used for signal processing research
    ["python", "bispectrum"],       // Python likely used for bispectrum analysis
    ["emerging_ai", "claude"],      // Interacts with Claude as emerging tech
    ["emerging_ai", "prompt_eng"],  // Uses prompt eng to control emerging AI
];

// Category IDs for circular pre-positioning
const CATEGORY_IDS = ["languages", "backend", "frontend", "data_ai", "database", "tools", "research", "interests"];
const CATEGORY_CHILDREN: Record<string, string[]> = {
    languages: ["cpp", "python", "js_ts", "java_kotlin", "bash"],
    backend: ["fastapi", "nodejs", "socketio"],
    frontend: ["nextjs", "tailwind", "framer"],
    data_ai: ["pytorch", "teachable", "agents", "prompt_eng"],
    database: ["mongodb", "supabase", "firebase"],
    tools: ["git", "nmap", "vim_arch", "docker", "claude", "cursor", "v0", "antigravity"],
    research: ["litreview", "lfcc", "bispectrum"],
    interests: ["anime", "reading", "blogging", "useless_stuff", "emerging_ai"],
};

// ─── Force simulation helpers ───────────────────────────
function getIsMobile(): boolean {
    return typeof window !== "undefined" && window.innerWidth < 768;
}

function initNodes(width: number, height: number): NeuralNode[] {
    const cx = width / 2;
    const cy = height / 2;
    const isMobile = width < 768;
    const catRadius = Math.min(width, height) * (isMobile ? 0.24 : 0.28);
    const leafRadius = Math.min(width, height) * (isMobile ? 0.12 : 0.15);
    const scaleFactor = isMobile ? 0.7 : 1;

    return NODE_DATA.map((nd) => {
        let x = cx;
        let y = cy;

        if (nd.id === "cyphr") {
            x = cx;
            y = cy;
        } else if (nd.group === "category") {
            const idx = CATEGORY_IDS.indexOf(nd.id);
            const angle = (idx / CATEGORY_IDS.length) * Math.PI * 2 - Math.PI / 2;
            x = cx + Math.cos(angle) * catRadius;
            y = cy + Math.sin(angle) * catRadius;
        } else if (nd.group === "leaf") {
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

        return { ...nd, x, y, vx: 0, vy: 0, radius: nd.radius * scaleFactor };
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
            const isMobile = window.innerWidth < 768;
            const h = Math.max(isMobile ? 400 : 550, window.innerHeight - 200);
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
            // CYPHR: very strong center lock, but with lower velocity multiplier to prevent jitter
            if (node.id === "cyphr") {
                node.vx += (cx - node.x) * 0.02;
                node.vy += (cy - node.y) * 0.02;
            } else {
                // Others: gentle center pull to prevent drift
                node.vx += (cx - node.x) * 0.003;
                node.vy += (cy - node.y) * 0.003;
            }

            // Repulsion between all nodes — stronger force, bigger min distance
            for (const other of nodes) {
                if (node.id === other.id) continue;
                const dx = node.x - other.x;
                const dy = node.y - other.y;
                const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);

                // Allow closer proximity before repulsion, specifically for the larger central node
                const minDist = (node.radius + other.radius) * 2.5;

                if (dist < minDist) {
                    // Reduce the repulsion force dramatically for the CYPHR node so it doesn't bounce around
                    const forceMultiplier = node.id === "cyphr" ? 0.1 : 0.8;
                    const force = ((minDist - dist) / dist) * forceMultiplier;
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
            // Core-to-category, category-to-leaf, cross-links — scale on mobile
            const isMobile = getIsMobile();
            let targetDist = isMobile ? 80 : 120;
            if (a.group === "core" || b.group === "core") targetDist = isMobile ? 160 : 250;
            else if (a.group === "category" || b.group === "category") targetDist = isMobile ? 100 : 150;
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

    // Touch handlers for mobile
    const getTouchPos = useCallback((e: React.TouchEvent<HTMLCanvasElement>): { x: number; y: number } | null => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect || !e.touches[0]) return null;
        return {
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top,
        };
    }, []);

    const handleTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
        const pos = getTouchPos(e);
        if (!pos) return;
        const node = getNodeAt(pos.x, pos.y);
        if (node) {
            e.preventDefault();
            dragRef.current = node.id;
            hoveredRef.current = node.id;
            if (node.description) {
                setTooltip({ x: pos.x, y: pos.y, label: node.label, desc: node.description });
            }
        }
    }, [getNodeAt, getTouchPos]);

    const handleTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
        const pos = getTouchPos(e);
        if (!pos) return;
        if (dragRef.current) {
            e.preventDefault();
            const node = nodesRef.current.find((n) => n.id === dragRef.current);
            if (node) {
                node.x = pos.x;
                node.y = pos.y;
                node.vx = 0;
                node.vy = 0;
            }
        }
    }, [getTouchPos]);

    const handleTouchEnd = useCallback(() => {
        dragRef.current = null;
        setTimeout(() => {
            hoveredRef.current = null;
            setTooltip(null);
        }, 1500);
    }, []);

    return (
        <div ref={containerRef} className="relative w-full" style={{ height: dimensions.h }}>
            <canvas
                ref={canvasRef}
                width={dimensions.w}
                height={dimensions.h}
                style={{ width: "100%", height: dimensions.h, touchAction: "pan-y" }}
                className="cursor-crosshair"
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            />

            {/* Tooltip */}
            {tooltip && (
                <div
                    className="absolute pointer-events-none z-20 glass rounded-lg px-3 py-2 max-w-[200px]"
                    style={{
                        left: Math.min(tooltip.x + 16, dimensions.w - 220),
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
