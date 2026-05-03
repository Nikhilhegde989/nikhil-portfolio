# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server at localhost:5173
npm run build      # production build to dist/
npm run preview    # preview the production build locally
npm run deploy     # build + push to gh-pages branch (legacy, prefer Vercel)
```

No test suite exists. TypeScript and ESLint are the primary correctness checks — run `npm run build` to catch type errors across both React and Astro files.

## Architecture

This is an **Astro 5 SSG site** with React islands. The mental model: Astro owns the pages and layout, React owns interactive components.

### Two distinct rendering contexts

**1. The portfolio SPA** (`src/pages/index.astro` → `src/App.tsx`)
The entire portfolio is a single React app mounted via `<App client:load />`. Sections are React components that scroll into view. Routing is hash-based (`#experience`, `#projects`, etc.). `useActiveSection` drives the navbar highlight. All portfolio data lives in `src/data/portfolioData.ts` — add content there, not in components.

**2. The blog** (`src/pages/blog/`)
Fully static Astro pages. Content lives in `src/content/blog/*.mdx` as Astro Content Collections. `src/layouts/BlogLayout.astro` is the shared shell (navbar, footer, GA, Google Fonts). The blog has its own standalone navbar — it does not use the React `<Navbar>` component.

### Blog content system

Posts are `.mdx` files in `src/content/blog/` with this frontmatter schema (defined in `src/content/config.ts`):

```ts
title: string
summary: string
publishedAt: z.coerce.date()   // YYYY-MM-DD in frontmatter
tags: string[]
readingTime: number            // in minutes, set manually
featured: boolean              // one post shown full-width at top of listing
thumbnail?: string             // optional, gradient fallback used if absent
```

Tag colours and gradients are defined inline in both `src/pages/blog/index.astro` and `src/pages/blog/[slug].astro` — add new tags to both files. Known tags: `postgresql`, `internals`, `performance`, `python`, `fastapi`, `kafka`, `websockets`, `architecture`, `redis`, `security`, `cors`, `web`, `backend`.

### Interactive blog components

`src/components/blog/DemoPlayer.tsx` is a generic step-through visualiser. `CORSDemo.tsx` and `PreflightDemo.tsx` are data files that feed scenarios into it. To embed in MDX:

```mdx
import { CORSDemo } from '../../components/blog/CORSDemo';
<CORSDemo client:load />
```

The `client:load` directive is required for interactivity — without it the component renders static HTML only.

### Chatbot

The floating chat widget (`src/components/ui/ChatBot/`) calls an external rephrase API. It is self-contained and not connected to the blog or content collections.

### SEO infrastructure

- `astro.config.mjs` has `site: 'https://nikhilhegde.com'` — required for sitemap generation
- `@astrojs/sitemap` auto-generates `sitemap.xml` at build time
- `public/robots.txt` points crawlers to the sitemap
- Google Analytics (`G-CYL1PSW02D`) is loaded in both `src/pages/index.astro` and `src/layouts/BlogLayout.astro`

### Deployment

Current setup: `main` branch deploys via `gh-pages`. `blog-preview` branch is connected to Vercel for preview. To add a new Vercel preview: push a branch, import the repo in Vercel, select the branch.
