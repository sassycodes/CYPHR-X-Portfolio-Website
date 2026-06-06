"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { mdxComponents } from "@/components/mdx-components";
import type { BlogPost } from "@/lib/blog";

interface BlogPostContentProps {
  post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-xs text-zinc-500 hover:text-emerald-400 transition-colors duration-300 mb-10 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Transmissions</span>
          </Link>
        </motion.div>

        {/* Post header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          {/* Meta row */}
          <div className="flex items-center gap-4 text-zinc-500 font-mono text-[11px] tracking-wider mb-5">
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
          <h1 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-5">
            {post.title}
          </h1>

          {/* Summary */}
          <p className="text-zinc-500 text-[15px] leading-relaxed max-w-2xl">
            {post.summary}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${tag}`}
                className="font-mono text-[10px] tracking-wider px-2.5 py-1 rounded-full border border-zinc-800/60 bg-zinc-900/40 text-zinc-500 hover:border-emerald-500/20 hover:text-emerald-400 transition-all duration-300"
              >
                {tag}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-emerald-500/20 via-zinc-800 to-transparent mt-8" />
        </motion.header>

        {/* Post content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="blog-prose"
        >
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  [
                    rehypePrettyCode,
                    {
                      theme: "github-dark-dimmed",
                      keepBackground: false,
                    },
                  ],
                ],
              },
            }}
          />
        </motion.article>

        {/* Post footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-zinc-800/50"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-xs text-zinc-500 hover:text-emerald-400 transition-colors duration-300 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>All Transmissions</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
