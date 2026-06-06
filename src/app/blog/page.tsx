import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/blog";
import BlogListingContent from "./blog-listing-content";

export const metadata: Metadata = {
  title: "Blog | CYPHR — Sarthak Gaikwad",
  description:
    "Writings on systems programming, AI pipelines, cybersecurity, and the things I learn along the way.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <Suspense>
      <BlogListingContent posts={posts} tags={tags} />
    </Suspense>
  );
}
