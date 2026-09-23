'use client';

import { useRef, useState } from 'react';
import SkyWidget from './SkyWidget';
import GitHubWidget from './GitHubWidget';
import { useSky } from '@/src/lib/sky/useSky';

/*
The stack of widgets beside the headline.

The sky is the one you land on; GitHub activity is a swipe away. Arrows
appear on hover, dots sit underneath, and on a touch screen you can just
drag it.
*/

const WIDGETS = [
  { key: 'sky', label: 'Sky and local time' },
  { key: 'github', label: 'GitHub activity' },
];

/* Ignore small drags, which are usually the start of a vertical scroll. */
const SWIPE_THRESHOLD = 48;

export default function WidgetStack() {
  const { phase, now, sun } = useSky();
  const [index, setIndex] = useState(0);
  const dragStart = useRef<number | null>(null);

  const go = (next: number) =>
    setIndex(Math.min(Math.max(next, 0), WIDGETS.length - 1));

  const onPointerDown = (e: React.PointerEvent) => {
    dragStart.current = e.clientX;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStart.current === null) return;
    const dx = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    go(dx < 0 ? index + 1 : index - 1);
  };

  return (
    <div className="flex flex-col gap-2.5">
      <div
        className="group relative h-[400px] touch-pan-y select-none rounded-window"
        role="region"
        aria-roledescription="carousel"
        aria-label="Widgets"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {index > 0 && (
          <Arrow
            side="left"
            label="Previous widget"
            onClick={() => go(index - 1)}
          />
        )}
        {index < WIDGETS.length - 1 && (
          <Arrow
            side="right"
            label="Next widget"
            onClick={() => go(index + 1)}
          />
        )}

        {WIDGETS.map((w, i) => {
          const active = i === index;
          return (
            <div
              key={w.key}
              aria-hidden={!active}
              // Inert slots keep their layout but stay out of the tab order.
              // Only set when inactive: `inert="false"` still applies.
              {...(active ? {} : { inert: true })}
              className="absolute inset-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(.2,.7,.2,1)]"
              style={{
                opacity: active ? 1 : 0,
                transform: active ? 'none' : `translateX(${(i - index) * 6}%)`,
                pointerEvents: active ? 'auto' : 'none',
              }}
            >
              {w.key === 'sky' ? (
                <SkyWidget phase={phase} now={now} sun={sun} />
              ) : (
                <GitHubWidget />
              )}
            </div>
          );
        })}
      </div>

      <div
        role="group"
        aria-label="Choose a widget"
        className="flex items-center justify-center gap-0.5"
      >
        {WIDGETS.map((w, i) => (
          <button
            key={w.key}
            type="button"
            aria-label={w.label}
            aria-current={i === index}
            onClick={() => go(i)}
            className="flex h-[22px] w-[22px] items-center justify-center border-none bg-transparent p-0"
          >
            <span
              className="h-[7px] w-[7px] rounded-full transition-[background-color,transform] duration-300"
              style={{
                background: i === index ? 'var(--ink)' : 'var(--rule)',
                transform: `scale(${i === index ? 1.15 : 1})`,
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function Arrow({
  side,
  label,
  onClick,
}: {
  side: 'left' | 'right';
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`absolute top-1/2 z-[3] -mt-5 flex h-10 w-10 items-center justify-center rounded-full border-none bg-[rgba(251,250,246,.82)] p-0 text-ink opacity-0 shadow-[0_4px_14px_rgba(28,27,25,.18)] backdrop-blur-lg transition-[opacity,transform] duration-200 hover:bg-card focus-visible:opacity-100 group-hover:opacity-100 ${
        side === 'left'
          ? 'left-3.5 -translate-x-1.5 group-hover:translate-x-0'
          : 'right-3.5 translate-x-1.5 group-hover:translate-x-0'
      }`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={side === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
      </svg>
    </button>
  );
}
