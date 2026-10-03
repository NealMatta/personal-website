'use client';

import { useEffect, useRef, useState } from 'react';
import { chooseTheme } from '@/src/lib/theme/theme';
import { useTheme } from '@/src/lib/theme/useTheme';

/*
The light switch.

Shows whatever is up — the sun by day, the moon by night — and a press
sets it in the west while the other rises in the east, the way the real
sky does it. Which glyph is up comes from `data-theme` in CSS, not from
this component's state, so the first paint is right before React runs.

It keeps a plain ink hover rather than the sky: flipping the lights
doesn't take you to another room.
*/

/* Matches the 0.7s arc in globals.css, plus a frame to land. */
const ARC_MS = 750;

export default function ThemeButton({
  className = '',
}: {
  className?: string;
}) {
  const theme = useTheme();
  const [setting, setSetting] = useState<'sun' | 'moon' | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const toggle = () => {
    const night = theme === 'dark';
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = document.documentElement;

    window.clearTimeout(timer.current);

    if (!calm) root.classList.add('theme-fading');
    setSetting(night ? 'moon' : 'sun');
    chooseTheme(night ? 'light' : 'dark');

    timer.current = window.setTimeout(() => {
      setSetting(null);
      root.classList.remove('theme-fading');
    }, ARC_MS);
  };

  const night = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={night ? 'Switch to day' : 'Switch to night'}
      aria-pressed={night}
      className={`relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-rule bg-transparent p-0 text-ink transition-colors hover:border-ink focus-visible:border-ink ${className}`}
    >
      <svg
        className="theme-orb theme-orb-sun"
        data-setting={setting === 'sun' ? '' : undefined}
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
      </svg>
      <svg
        className="theme-orb theme-orb-moon"
        data-setting={setting === 'moon' ? '' : undefined}
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
      </svg>
    </button>
  );
}
