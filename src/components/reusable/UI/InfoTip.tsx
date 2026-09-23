'use client';

import { useEffect, useRef, useState } from 'react';
import Chip from './Chip';

/*
The ⓘ on a live card: "how I built this".

One sentence in my own voice about what the thing does, the path the data
takes to get here, and chips for the tools. The whole point of the live
wires is that you can see the wiring.
*/

interface InfoTipProps {
  /** Describes which card this explains, for screen readers. */
  label: string;
  children: React.ReactNode;
  /** The one-line data path, e.g. "Spotify API → /api/spotify → cache". */
  dataPath?: string;
  stack?: string[];
}

export default function InfoTip({
  label,
  children,
  dataPath,
  stack = [],
}: InfoTipProps) {
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapper.current?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  return (
    <div className="relative" ref={wrapper}>
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 items-center justify-center rounded-full text-graphite transition-colors hover:text-ink"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v6" />
          <path d="M12 7.5v.01" />
        </svg>
      </button>

      {open && (
        <div
          role="note"
          className="absolute right-0 top-full z-20 flex w-[300px] flex-col gap-3 rounded-xl bg-ink p-[18px] text-paper shadow-[0_18px_40px_rgba(28,27,25,.28)]"
        >
          <span className="font-mono text-xs uppercase tracking-[.06em] text-[#BDB5A5]">
            How I built this
          </span>
          <span className="text-sm leading-relaxed">{children}</span>
          {dataPath && (
            <span className="font-mono text-[11px] leading-[1.8] text-[#E8DDC4]">
              {dataPath}
            </span>
          )}
          {stack.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {stack.map((tool) => (
                <Chip key={tool} tone="dark">
                  {tool}
                </Chip>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
