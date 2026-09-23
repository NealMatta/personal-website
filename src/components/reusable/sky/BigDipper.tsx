/*
The Big Dipper as it hangs over Canton, Michigan — where I learned to find
it. Only comes out on the night sky.

The dotted line running up from Dubhe is the pointer to Polaris.
*/

interface Star {
  x: number;
  y: number;
  r: number;
}

/** The seven stars of the dipper, bowl first, then out along the handle. */
const STARS: Star[] = [
  { x: 78.3, y: 87.0, r: 0.94 },
  { x: 78.2, y: 102.0, r: 0.79 },
  { x: 56.3, y: 106.0, r: 0.78 },
  { x: 50.6, y: 94.4, r: 0.55 },
  { x: 35.3, y: 91.5, r: 0.95 },
  { x: 23.5, y: 88.4, r: 0.83 },
  { x: 21.6, y: 86.0, r: 0.37 },
  { x: 6.0, y: 96.1, r: 0.93 },
];

/** Polaris, at the end of the pointer line. */
const POLARIS: Star = { x: 78.8, y: 6.0, r: 0.9 };

const OUTLINE =
  '6.0,96.1 23.5,88.4 35.3,91.5 50.6,94.4 78.3,87.0 78.2,102.0 56.3,106.0 50.6,94.4';

export default function BigDipper({ className = '' }: { className?: string }) {
  const all = [...STARS, POLARIS];

  return (
    <svg
      viewBox="0 0 84.8 112.0"
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      focusable="false"
    >
      {/* Pointer to Polaris */}
      <line
        x1="78.3"
        y1="85.0"
        x2="78.8"
        y2="9.0"
        stroke="rgba(255,255,255,.22)"
        strokeWidth=".35"
        strokeDasharray="0.6 2"
        strokeLinecap="round"
      />
      {/* The dipper itself */}
      <polyline
        points={OUTLINE}
        fill="none"
        stroke="rgba(255,255,255,.4)"
        strokeWidth=".45"
        strokeDasharray="1.8 1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {all.map((s, i) => (
        <g
          key={`${s.x}-${s.y}`}
          className="dipper-star animate-dipper"
          // Staggered so the constellation breathes rather than blinks.
          style={{ animationDelay: `${(-i * 0.9).toFixed(1)}s` }}
        >
          <circle cx={s.x} cy={s.y} r={s.r * 3} fill="rgba(255,255,255,.1)" />
          <circle cx={s.x} cy={s.y} r={s.r} fill="#FFFFFF" />
        </g>
      ))}
    </svg>
  );
}
