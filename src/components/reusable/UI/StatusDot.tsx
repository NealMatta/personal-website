/*
Where something stands: live, still a prototype, just an idea, or shelved.

Used on Lab experiments, project cards and the live wires. The color never
carries the meaning on its own — the label is always next to it.
*/

export type Status = 'live' | 'prototype' | 'idea' | 'shelved';

const COLORS: Record<Status, string> = {
  live: 'var(--live)',
  prototype: 'var(--prototype)',
  // An idea and a shelved thing are both "not running", and read the same.
  idea: 'var(--shelved)',
  shelved: 'var(--shelved)',
};

const LABELS: Record<Status, string> = {
  live: 'Live',
  prototype: 'Prototype',
  idea: 'Idea',
  shelved: 'Shelved',
};

interface StatusDotProps {
  status: Status;
  /** Overrides the default label, e.g. "Red Line · Chicago stop". */
  label?: string;
  /** A bare dot, for places that caption it themselves. */
  bare?: boolean;
  /** Any color, for one-offs like the CTA Red Line. */
  color?: string;
  className?: string;
}

export function statusLabel(status: Status): string {
  return LABELS[status];
}

export default function StatusDot({
  status,
  label,
  bare = false,
  color,
  className = '',
}: StatusDotProps) {
  const dot = (
    <span
      className="h-2 w-2 shrink-0 rounded-full"
      style={{ background: color ?? COLORS[status] }}
    />
  );

  if (bare) return dot;

  return (
    <span className={`flex items-center gap-2 ${className}`}>
      {dot}
      <span className="font-mono text-xs uppercase tracking-[.06em] text-pencil">
        {label ?? LABELS[status]}
      </span>
    </span>
  );
}
