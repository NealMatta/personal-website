/*
Cloud placement.

Every cloud gets its own band, scale, speed and starting offset so no two
windows drift in lockstep. The values look random but come from a seeded
generator, so the server and the client lay the clouds out identically and
React doesn't complain at hydration.
*/

export interface Cloud {
  /** Distance from the top of the window. */
  top: string;
  scale: string;
  duration: string;
  delay: string;
  startX: string;
  /** Slight vertical wander at the two middle keyframes. */
  driftY1: string;
  driftY2: string;
  opacity: string;
  /** Which turbulence filter roughens this cloud's edges. */
  filter: 'a' | 'b' | 'c';
}

/** mulberry32 — small, fast, and stable across server and client. */
function seeded(seed: number) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function hash(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const BANDS: Array<[number, number]> = [
  [2, 20],
  [26, 44],
  [50, 66],
];

const FILTERS = ['a', 'b', 'c'] as const;

/**
 * Three clouds for one window. Pass a stable key (the widget's name) so
 * that window keeps the same sky on every render.
 */
export function cloudSet(key: string): Cloud[] {
  const random = seeded(hash(key));
  const range = (min: number, max: number) => min + random() * (max - min);

  // Shuffle which cloud takes which band, so the big one isn't always high.
  const bands = [...BANDS].sort(() => random() - 0.5);

  return bands.map((band, i) => {
    const duration = range(90, 165);
    return {
      top: `${range(band[0], band[1]).toFixed(1)}%`,
      scale: range(0.55, 1).toFixed(2),
      duration: `${duration.toFixed(1)}s`,
      // A negative delay starts the cloud mid-crossing instead of off-screen.
      delay: `${(-range(0, duration)).toFixed(1)}s`,
      startX: `${range(0, 70).toFixed(1)}cqw`,
      driftY1: `${range(-8, 8).toFixed(1)}px`,
      driftY2: `${range(-8, 8).toFixed(1)}px`,
      opacity: range(0.7, 1).toFixed(2),
      filter: FILTERS[i],
    };
  });
}
