# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal website for Neal Matta, built mainly to learn Next.js and Supabase. It uses Next.js 15 (App Router), React 18, TypeScript (strict), Tailwind CSS, Supabase, and TanStack React Query.

## Commands

```bash
npm run dev      # start dev server
npm run build    # production build (also type-checks)
npm run lint     # next lint (next/core-web-vitals + next/typescript)
npx prettier --write .   # format (single quotes, semicolons, es5 trailing commas, 80 cols)
```

The repo has no test framework.

## Environment variables

Put these in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`
- `CTA_TRACKER` (Chicago Transit Authority train tracker API key)

## Architecture

**Layout split:** `app/` contains only Next.js routes, layouts, and API route handlers. Everything else is in `src/`. The `@/*` path alias resolves to the repo root, so imports look like `@/src/components/...`, not `@/components/...`.

- `src/apiManagement/`: server-side functions that call external APIs (Spotify, GitHub commits, CTA).
- `src/components/pages/<Page>/`: components used by one page. `src/components/reusable/` holds shared UI — `navigation/`, `sky/`, and `UI/`.
- `src/lib/`: Supabase clients, the React Query provider, the sky engine, and small helpers.
- `src/types/`: `supabase.ts` holds the generated Supabase `Database` types. The other files define domain types, re-exported from `src/types/index.ts`.
- `src/content/`: typed content files — shelf boxes, projects, Lab experiments, About, field notes, quotes. Most page content lives here rather than in a database.

**Data flow for live widgets (Spotify, website status/commits, CTA trains):** the widgets use a Card → Client → View split:
1. `XCard.tsx` is a server component wrapper.
2. `XClient.tsx` (`'use client'`) calls `useQuery` and fetches from an internal route under `app/api/...`.
3. The route handler calls a function in `src/apiManagement/`, so secrets stay on the server.
4. `XView.tsx` is a presentational component that receives `isLoading` / `isError` / data as props.

Add new external-data widgets the same way. Route handlers return JSON through `new Response(JSON.stringify(...))` and follow the 404/500 error shape used in the existing routes.

**Server-rendered pages** (for example `app/projects/[slug]/page.tsx`) are async server components that read from `src/content/` and render directly, with no React Query. `params` is a `Promise` (Next 15) and must be awaited; missing content calls `notFound()`.

**Field notes come from `src/content/posts.ts`.** A note carries the same `sections` shape a case study does, plus the Lab experiment or project it came out of, so `/writing` and `/writing/[slug]` render straight from the file. Headings in there are real; paragraphs still in [brackets] are Neal's to write. `/writing/rss.xml` is a route handler that builds the feed from the same list and takes its absolute URLs from the request, since the site has no configured domain. The masthead card offers RSS and LinkedIn rather than an email signup, because there is no list behind one yet.

**Projects come from `src/content/projects.ts`, not Supabase.** The design needs kind, status, stack, and full case-study sections, none of which the `projects` table has, and a Firebase move is planned — so the table and its `getProject`/`getAllProjects` plumbing were dropped rather than extended. A project is a discriminated union: `SoftwareProject` renders as a case study, `woodwork` and `3d-print` render as a build log with specs and a cut list. Adding a project means adding an entry, not touching a page.

**Supabase has two kinds of client:**
- `src/lib/supabase/db/supabaseClient.ts` is a plain singleton `supabase-js` client using the anon key. It now only serves the `spotify_tokens` table. It calls `createClient` at module scope, so a build without `NEXT_PUBLIC_SUPABASE_URL` set fails on import.
- `src/lib/supabase/auth/{server,client,middleware}.ts` are `@supabase/ssr` cookie-based clients for auth. The server actions in `app/login/actions.ts` use them. Root `middleware.ts` runs `updateSession` only for `/admin`, and redirects users who aren't logged in to `/login`.

**Spotify token caching:** `src/apiManagement/spotify/tokenManager.ts` stores the access token and its expiry in the Supabase `spotify_tokens` table (row `id = 1`). It uses the refresh token only when the stored token has expired.

**Remote images:** `next/image` accepts remote images only from the hosts listed in `next.config.ts` (`i.scdn.co` for Spotify and the Supabase storage host). Add any new image host there.

**Styling — "paper, tape and sky":** the ground is paper (`#F4F1EA`) and ink (`#1C1B19`); color appears *only* inside sky windows. Tailwind colors (`paper`, `card`, `ink`, `pencil`, `graphite`, `rule`, `tape`, `marker`, `status.*`) map to CSS variables in `src/styles/globals.css`. Four typefaces come from `next/font/google` in `app/layout.tsx` and are exposed as CSS variables: Bricolage Grotesque (`font-display`), Instrument Sans (`font-body`), JetBrains Mono (`font-mono`, metadata), Caveat (`font-label`, tape labels only — never body copy). Font Awesome CSS is imported manually there with `autoAddCss = false`, for the pages not yet redesigned.

The design lives in the "Second Brain Redesign" canvas: https://claude.ai/artifact/17YUxwuEjgezbPRiTDATjn

**The sky:** `src/lib/sky/` picks one of six phases (midnight, dawn, sunrise, midday, sunset, dusk) from the *visitor's* local clock. `useSky()` returns the default midday phase until the client mounts, so SSR and hydration agree. `SkyWindow` paints a phase plus its weather — drifting clouds, and stars with the Big Dipper at night. Cloud layout comes from a seeded generator (`src/lib/sky/clouds.ts`); keep every draw from it deterministic and fixed in count, or server and client lay out different skies and hydration breaks.

Sky windows are the only colored surfaces at rest: the hero widget, the closing quote, and the nav's logo mark. Section rules borrow the gradient as a hairline.

**Hover is where the rest of the color lives — but only for links that stay on the site.** The sky means "another room in this house", so a link that leaves (a social mark, a repo, a resume PDF, the LinkedIn button) keeps its own quiet ink-or-tape hover. Two shapes, both component classes in `globals.css`, both firing on `:focus-visible` too:
- `.sky-button` — an internal button. Ink-filled or outlined at rest; on hover the sky fades up over it, the corners soften from `--btn * .16` to `--btn * .32`, and the label reads in `--sky-ink`. Set `--btn` to the button's own height (default 50px) so both radii scale. **Wrap the label in a `<span>`** — the sky is an absolutely positioned `::before` and paints straight over a bare text node.
- `.sky-link` — an internal text link. The sky, turned on its side, wipes in from the left as a 2px underline. Drawn as a background image, not an `::after`, so it survives a line break and never collides with a pseudo-element a component already uses. Used by the nav (the current page keeps its ink underline and sits out the hover), `Breadcrumb` and `TableOfContents`.

A box keeps its own hover — `BoxCard` lifts on a shadow — because a box is a surface, not a link in a line of text.

Both classes read `--sky-gradient`, `--sky-ink` and `--sky-line` from `<html>`. `SkyRoot` (`src/components/reusable/sky/SkyRoot.tsx`, mounted in `app/layout.tsx`) writes them there on mount; the fallbacks in `globals.css` cover the server render. A `SkyWindow` still carries its own phase locally, so nothing on the page needs a sky hook just to answer a cursor.

**Reusable UI** (`src/components/reusable/UI/`): `Tape` (a tilted masking-tape label), `BoxCard` (a labeled box), `StatusDot` (live / prototype / idea / shelved), `Chip`, `InfoTip` (the ⓘ on a live card, showing its data path and tools), `PageIntro` (a section page's masthead — `stats` for counts on the right, `aside` for a card there instead), `FilterPills`, `Breadcrumb`, `PhotoSlot`, `TableOfContents` and `ProseSection`. The last two are what a write-up is made of, shared by project case studies, build logs and field notes; the `Section` shape they read lives in `src/types/content.ts`.

**Notes:**
- `app/_starting-project/` is the leftover create-next-app template. The `_` prefix keeps it out of routing.
- `app/lab/dashboard/layout.tsx` renders its own `<html>`/`<body>`.
- The redesign is landing in passes. Done: the design system, nav/footer, Home, About, Projects (index, case study, build log), Laboratory and Field notes. Still to build: Curriculum and Commonplace. Nav entries and shelf boxes for unbuilt sections are marked `soon` rather than linking to 404s.
- Images the site doesn't have yet render as `PhotoSlot` — a labeled dashed frame that becomes the picture once given a `src`. Real assets go in `public/`.
