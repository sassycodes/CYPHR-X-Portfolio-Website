"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";
import BlogCard from "@/components/blog-card";
import BlogTagFilter from "@/components/blog-tag-filter";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
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

interface BlogListingContentProps {
  posts: BlogPostMeta[];
  tags: string[];
}

export default function BlogListingContent({
  posts,
  tags,
}: BlogListingContentProps) {
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag");

  const filteredPosts = activeTag
    ? posts.filter((post) => post.tags.includes(activeTag))
    : posts;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-zinc-600 tracking-widest">
              06
            </span>
            <span className="w-8 h-px bg-zinc-800" />
            <span className="font-mono text-xs text-zinc-600 tracking-widest uppercase">
              Blog
            </span>
          </div>
          <h1 className="font-mono text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Transmissions
          </h1>
          <p className="font-mono text-sm text-zinc-500 mt-3 max-w-lg">
            <span className="text-emerald-500/50 mr-1">{">"}</span>
            Deep dives into systems, AI, security, and the rabbit holes I
            fall into while building things.
          </p>
        </motion.div>

        {/* Tag filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <BlogTagFilter tags={tags} />
        </motion.div>

        {/* Blog post grid */}
        {filteredPosts.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={activeTag ?? "all"}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {filteredPosts.map((post) => (
              <motion.div key={post.slug} variants={itemVariants}>
                <BlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-20 gap-4"
          >
            <div className="p-4 rounded-full border border-zinc-800/60 bg-zinc-900/30">
              <FileText className="w-6 h-6 text-zinc-600" />
            </div>
            <p className="font-mono text-sm text-zinc-600 tracking-wider">
              No posts found for this tag.
            </p>
          </motion.div>
        )}

        {/* Post count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <span className="font-mono text-[10px] text-zinc-600 tracking-widest">
            {filteredPosts.length} POST{filteredPosts.length !== 1 ? "S" : ""}{" "}
            · CYPHR TRANSMISSIONS
          </span>
        </motion.div>
      </div>
    </div>
  );
}
