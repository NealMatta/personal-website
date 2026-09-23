'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { Quarter } from '@/src/content/curriculum';
import { quarterCredits } from '@/src/content/curriculum';

/*
The quarter title, and the way you get to another one.

The title is the control: click the big "Q4 2026" and the other quarters
drop out from under it. Each one is a real link to `?quarter=…`, so a
quarter can be shared, bookmarked and opened in a new tab — the menu only
owns whether it's showing.
*/

interface QuarterSwitcherProps {
  quarters: Quarter[];
  current: Quarter;
}

export default function QuarterSwitcher({
  quarters,
  current,
}: QuarterSwitcherProps) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  /* A click anywhere else, or Escape, puts the menu away. */
  useEffect(() => {
    if (!open) return;

    const onClick = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={wrap} className="relative">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`Switch quarter, showing ${current.label}`}
        onClick={() => setOpen((v) => !v)}
        className="group flex items-center gap-3.5 rounded-xl border-none bg-transparent p-0 pr-3 text-ink"
      >
        <h1 className="m-0 font-display text-5xl font-extrabold leading-[.95] tracking-[-.03em] sm:text-7xl lg:text-[104px]">
          {current.label}
        </h1>
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-ink transition-colors group-hover:bg-ink group-hover:text-paper group-focus-visible:bg-ink group-focus-visible:text-paper"
          style={{ transform: open ? 'rotate(180deg)' : undefined }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-30 mt-3 flex w-[min(440px,calc(100vw-48px))] flex-col gap-0.5 rounded-2xl border border-ink bg-card p-2 shadow-[0_18px_40px_rgba(28,27,25,.18)]">
          {quarters.map((quarter) => {
            const here = quarter.slug === current.slug;
            const count = quarter.courses.length;

            return (
              <Link
                key={quarter.slug}
                href={`/curriculum?quarter=${quarter.slug}`}
                aria-current={here ? 'page' : undefined}
                onClick={() => setOpen(false)}
                className={`grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-1 rounded-[10px] px-4 py-3.5 no-underline hover:bg-[#ECE6D8] ${
                  here ? 'bg-[#ECE6D8]' : ''
                }`}
              >
                <span className="font-display text-2xl font-bold">
                  {quarter.label}
                </span>
                <span
                  className={`rounded-full px-2 py-[3px] font-mono text-[10px] uppercase tracking-[.06em] ${
                    quarter.state === 'current'
                      ? 'bg-ink text-paper'
                      : 'bg-tape text-marker'
                  }`}
                >
                  {quarter.state === 'current' ? 'Now' : 'Planning'}
                </span>
                <span className="text-sm text-pencil">
                  {count
                    ? `${count} ${count === 1 ? 'class' : 'classes'} · ${quarterCredits(quarter)} credits`
                    : 'Nothing planned yet'}
                </span>
                <span />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
