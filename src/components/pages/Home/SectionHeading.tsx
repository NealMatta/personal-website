'use client';

import { useSky } from '@/src/lib/sky/useSky';
import { skyLine } from '@/src/lib/sky/phases';

/*
A section rule and its heading.

The hairline above each section carries the current sky, so the page is
quietly tinted by the time of day without any of the sections themselves
taking on color.
*/

interface SectionHeadingProps {
  title: string;
  /** The paragraph that sits to the right of the heading. */
  description?: React.ReactNode;
  /** A short mono line instead of a paragraph. */
  meta?: string;
}

export default function SectionHeading({
  title,
  description,
  meta,
}: SectionHeadingProps) {
  const { phase } = useSky();

  return (
    <div className="flex flex-col gap-5">
      <div
        aria-hidden="true"
        className="h-[3px] w-full"
        style={{ background: skyLine(phase) }}
      />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="m-0 font-display text-4xl font-extrabold tracking-[-.01em] lg:text-[44px]">
          {title}
        </h2>
        {description && (
          <p className="m-0 max-w-[520px] text-base leading-relaxed text-pencil">
            {description}
          </p>
        )}
        {meta && (
          <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite">
            {meta}
          </span>
        )}
      </div>
    </div>
  );
}
