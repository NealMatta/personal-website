'use client';

import { useEffect } from 'react';
import { useSky } from '@/src/lib/sky/useSky';
import { skyLine } from '@/src/lib/sky/phases';

/*
Publishes the visitor's sky to the document root.

A `SkyWindow` carries its own phase, but a hover can happen anywhere on
the page, and none of those links want a sky hook of their own. So the
phase is written once onto <html> and everything else — `.sky-button`,
`.sky-link` — reads it from CSS.

Renders nothing. The fallback values in globals.css cover the server
render and the first paint, so SSR and hydration agree and the color
arrives on mount along with the rest of the sky.
*/
export default function SkyRoot() {
  const { phase } = useSky();

  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty('--sky-gradient', phase.gradient);
    root.setProperty('--sky-ink', phase.ink);
    root.setProperty('--sky-line', skyLine(phase));
  }, [phase]);

  return null;
}
