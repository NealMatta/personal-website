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

- `src/apiManagement/`: server-side functions that call external APIs (Spotify, GitHub commits, CTA) or query Supabase (projects).
- `src/components/pages/<Page>/`: components used by one page. `src/components/reusable/` holds shared UI (NavBar, Footer, cards, PageHeader).
- `src/lib/`: Supabase clients, the React Query provider, the sky engine, and small helpers.
- `src/types/`: `supabase.ts` holds the generated Supabase `Database` types. The other files define domain types, re-exported from `src/types/index.ts`.
- `src/content/`: typed content files (shelf boxes, field notes, quotes) for the sections that don't have a data store yet.

**Data flow for live widgets (Spotify, website status/commits, CTA trains):** the widgets use a Card → Client → View split:
1. `XCard.tsx` is a server component wrapper.
2. `XClient.tsx` (`'use client'`) calls `useQuery` and fetches from an internal route under `app/api/...`.
3. The route handler calls a function in `src/apiManagement/`, so secrets stay on the server.
4. `XView.tsx` is a presentational component that receives `isLoading` / `isError` / data as props.

Add new external-data widgets the same way. Route handlers return JSON through `new Response(JSON.stringify(...))` and follow the 404/500 error shape used in the existing routes.

**Server-rendered pages** (for example `app/projects/[projectID]/page.tsx`) are async server components that call `src/apiManagement` directly, with no React Query. `params` is a `Promise` (Next 15) and must be awaited. `getProject` calls `notFound()` when no row exists.

**Supabase has two kinds of client:**
- `src/lib/supabase/db/supabaseClient.ts` is a plain singleton `supabase-js` client using the anon key. It handles data queries (`projects` with `projectimages`/`projectdetails` joins) and the `spotify_tokens` table.
- `src/lib/supabase/auth/{server,client,middleware}.ts` are `@supabase/ssr` cookie-based clients for auth. The server actions in `app/login/actions.ts` use them. Root `middleware.ts` runs `updateSession` only for `/admin`, and redirects users who aren't logged in to `/login`.

**Spotify token caching:** `src/apiManagement/spotify/tokenManager.ts` stores the access token and its expiry in the Supabase `spotify_tokens` table (row `id = 1`). It uses the refresh token only when the stored token has expired.

**Remote images:** `next/image` accepts remote images only from the hosts listed in `next.config.ts` (`i.scdn.co` for Spotify and the Supabase storage host). Add any new image host there.

**Styling — "paper, tape and sky":** the ground is paper (`#F4F1EA`) and ink (`#1C1B19`); color appears *only* inside sky windows. Tailwind colors (`paper`, `card`, `ink`, `pencil`, `graphite`, `rule`, `tape`, `marker`, `status.*`) map to CSS variables in `src/styles/globals.css`. Four typefaces come from `next/font/google` in `app/layout.tsx` and are exposed as CSS variables: Bricolage Grotesque (`font-display`), Instrument Sans (`font-body`), JetBrains Mono (`font-mono`, metadata), Caveat (`font-label`, tape labels only — never body copy). Font Awesome CSS is imported manually there with `autoAddCss = false`, for the pages not yet redesigned.

The design lives in the "Second Brain Redesign" canvas: https://claude.ai/artifact/17YUxwuEjgezbPRiTDATjn

**The sky:** `src/lib/sky/` picks one of six phases (midnight, dawn, sunrise, midday, sunset, dusk) from the *visitor's* local clock. `useSky()` returns the default midday phase until the client mounts, so SSR and hydration agree. `SkyWindow` paints a phase plus its weather — drifting clouds, and stars with the Big Dipper at night. Cloud layout comes from a seeded generator (`src/lib/sky/clouds.ts`); keep every draw from it deterministic and fixed in count, or server and client lay out different skies and hydration breaks.

Sky windows are the only colored surfaces: the hero widget, the closing quote, and the nav's logo mark. Section rules borrow the gradient as a hairline.

**Reusable UI:** `Tape` (a tilted masking-tape label), `BoxCard` (a labeled box), `StatusDot` (live / prototype / shelved), `Chip`, and `InfoTip` — the ⓘ on a live card that shows the data path and tools behind it.

**Notes:**
- `app/_starting-project/` is the leftover create-next-app template. The `_` prefix keeps it out of routing.
- `app/lab/dashboard/layout.tsx` renders its own `<html>`/`<body>`.
- The redesign is landing in passes. Home, the design system and the nav/footer are done; About, Projects, Laboratory, Field notes, Curriculum and Commonplace still need rebuilding. Nav entries and shelf boxes for unbuilt sections are marked `soon` rather than linking to 404s.
