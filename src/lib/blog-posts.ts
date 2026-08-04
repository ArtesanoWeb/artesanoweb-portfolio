export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  paragraphs: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "building-this-portfolio",
    title: "Building this portfolio with Next.js",
    date: "2026-08-04",
    excerpt:
      "Why I built my portfolio with Next.js instead of a no-code builder, and what it's meant to prove.",
    paragraphs: [
      "I'm starting my job search as a software developer, and one of the first things I wanted was a portfolio that actually demonstrates the skills on my resume — not just describes them.",
      "I built this site with Next.js (App Router), TypeScript, and Tailwind CSS — the same stack I've been using at work, including a project I'm currently building called Sinergy (Next.js, NestJS, PostgreSQL, WebSockets). The Projects section below pulls directly from my GitHub account, so it stays up to date as I ship new things.",
      "This is the first post on a blog I plan to keep writing in as I learn — mostly notes on what I build, what breaks, and what I figure out along the way.",
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
