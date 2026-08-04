# Henrique Alvarez — Portfolio

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)

Personal portfolio and blog, built to demonstrate the stack listed on my
resume rather than just describe it.

## Features

- **Live projects feed** — the Projects section fetches directly from the
  [GitHub API](https://docs.github.com/en/rest) at request time, so it stays
  current as new repos are pushed, with no manual updates or hardcoded data.
- **One-click CV download** — links straight to the current PDF resume.
- **Blog** — short write-ups on what I'm building and learning.
- **Light/dark mode** — follows the visitor's system preference.
- Fully responsive, no client-side JavaScript beyond what Next.js ships by
  default — every section is a server component.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com)
- No UI or icon libraries — icons are hand-written inline SVG
  (`src/components/Icons.tsx`)

## Project structure

```
src/
  app/
    page.tsx            # Home: hero + about + experience + projects + skills + contact
    blog/page.tsx        # Blog index
    blog/[slug]/page.tsx # Blog post
  components/            # Section and UI components
  lib/
    cv-data.ts            # Profile, experience, education, skills (source of truth for the CV content)
    github.ts              # Live GitHub repos fetcher for the Projects section
    blog-posts.ts          # Blog post content
public/
  cv/                     # Downloadable CV PDF
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # eslint
```

## Content

Profile, experience, education, and skills live in `src/lib/cv-data.ts` and
mirror my English CV — updating one doesn't automatically update the other,
so both are kept in sync by hand. Projects are not hardcoded: the section
fetches live from `github.com/ArtesanoWeb` via the public GitHub API.
