import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog — Henrique Alvarez",
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
      <p className="mt-2 text-muted">Notes on what I&apos;m building and learning.</p>

      <div className="mt-10 space-y-8">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
            <p className="text-sm text-muted">{formatDate(post.date)}</p>
            <h2 className="mt-1 text-xl font-semibold group-hover:text-accent">
              {post.title}
            </h2>
            <p className="mt-2 text-foreground/90">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
