"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPostMeta;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-full glass-card rounded-xl p-6 sm:p-7 flex flex-col gap-4 overflow-hidden transition-all duration-300 group-hover:border-emerald-500/20"
      >
        {/* Hover glow */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-transparent pointer-events-none" />

        {/* Top row — date + reading time */}
        <div className="flex items-center gap-4 text-zinc-500 font-mono text-[11px] tracking-wider">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            <span>{post.readingTime}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-mono text-lg sm:text-xl font-bold text-white tracking-tight leading-tight group-hover:text-emerald-50 transition-colors duration-300">
          {post.title}
          <ArrowUpRight className="inline-block w-4 h-4 ml-1.5 text-zinc-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
        </h3>

        {/* Summary */}
        <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3 flex-1">
          {post.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] tracking-wider px-2.5 py-1 rounded-full border border-zinc-800/60 bg-zinc-900/40 text-zinc-500 group-hover:border-emerald-500/15 group-hover:text-zinc-400 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/0 to-transparent group-hover:via-emerald-500/30 transition-all duration-500" />
      </motion.article>
    </Link>
  );
}
