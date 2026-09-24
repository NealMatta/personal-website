---
title: "Card → Client → View: how I structure live widgets"
dek: "A small pattern that keeps secrets on the server and components boring."
topic: "Architecture"
publishedAt: 2026-08-19
coverLabel: "The live wires row: three cards, three data sources [replace with a real screenshot]"
dataPath: "External API → src/apiManagement → app/api route handler → Client (React Query) → View"
relatedProject:
  slug: personal-website-v3
  name: "Personal website v3"
---

## Three files, one widget

[Introduce the split: a server Card that renders the frame, a Client that owns the query, and a View that only knows about props.]

## Why the route handler in the middle

[The secret never leaves the server. The browser talks to my own route, my route talks to the vendor, and the API key stays in the environment.]

## Loading and error as props

[Why the View takes isLoading and isError rather than calling the hook itself: it makes every state something you can render on purpose.]

## When not to use it

[Pages that read from a content file render on the server and skip all of this. The pattern is for data that changes while you are looking at it.]
