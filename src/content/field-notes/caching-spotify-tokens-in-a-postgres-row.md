---
title: "Caching Spotify tokens in a Postgres row"
dek: "Why my now-playing card only refreshes the token when it actually expires, and why one row in Supabase is enough."
topic: "APIs"
publishedAt: 2026-09-12
updatedAt: 2026-09-20
coverLabel: "The now-playing card on the home page, mid-refresh [replace with a real screenshot]"
dataPath: "Spotify API → /api/spotify/recentSong → tokenManager.ts → spotify_tokens (id = 1) → React Query"
relatedLab:
  code: "EXP-02"
  name: "Now playing"
  status: live
  blurb: "The live card this note is about."
relatedProject:
  slug: personal-website-v3
  name: "Personal website v3"
---

## The problem

[Open with the problem in one or two sentences: a Spotify access token lasts an hour, the refresh token lasts forever, and asking for a new access token on every page load spends a request to learn something I already knew.]

[Say what breaks when you get it wrong — rate limits, a card that flickers, a secret that ends up in the browser.]

## One row, id = 1

[Describe the table: a single row holding the access token and the moment it expires. There is only ever one of me, so there is only ever one row, and `id = 1` is the whole primary key story.]

[Why a table rather than memory: serverless functions are cold more often than they are warm, so anything cached in a module variable is gone by the next request.]

## Refresh on expiry

[Walk through tokenManager.ts: read the row, compare the expiry to now, and only spend the refresh token once the stored one has actually run out.]

## What I'd change

[The honest part: what this does not handle yet, and what I would do differently with a second consumer of the same token.]
