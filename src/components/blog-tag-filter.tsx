"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface BlogTagFilterProps {
  tags: string[];
}

export default function BlogTagFilter({ tags }: BlogTagFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag");

  function handleTagClick(tag: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (tag) {
      params.set("tag", tag);
    } else {
      params.delete("tag");
    }
    router.push(`/blog?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* "All" button */}
      <button
        onClick={() => handleTagClick(null)}
        className={cn(
          "font-mono text-[11px] tracking-wider px-3 py-1.5 rounded-full border transition-all duration-300",
          !activeTag
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
            : "border-zinc-800/60 bg-zinc-900/40 text-zinc-500 hover:border-zinc-700/60 hover:text-zinc-400"
        )}
      >
        All
      </button>

      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={cn(
            "font-mono text-[11px] tracking-wider px-3 py-1.5 rounded-full border transition-all duration-300",
            activeTag === tag
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
              : "border-zinc-800/60 bg-zinc-900/40 text-zinc-500 hover:border-zinc-700/60 hover:text-zinc-400"
          )}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
