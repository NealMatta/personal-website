---
title: "Building a CTA arrival board in an afternoon"
dek: "Polling, stale times and what “live” really means."
topic: "Laboratory"
publishedAt: 2026-06-24
coverLabel: "The Red Line arrival board [replace with a real screenshot]"
dataPath: "CTA Train Tracker → /api/cta/chicagoRedLine → React Query → View"
relatedLab:
  code: "EXP-01"
  name: "Chicago CTA"
  status: live
  blurb: "Can an arrival board stay useful with 60-second polling?"
---

## The question

[What I was actually testing: whether a board that refreshes every sixty seconds is still worth looking at when the train is four minutes out.]

## Polling vs stale time

[The two knobs React Query gives you, and why they are not the same knob.]

## What “live” means

[The conclusion: "live" is a promise about how wrong the number is allowed to be, not about how often you fetch. Print the age of the data on the card.]
