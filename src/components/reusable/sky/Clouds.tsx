import { cloudSet } from '@/src/lib/sky/clouds';

/*
Three clouds drifting left to right across a sky window.

Each cloud is three overlapping ellipses — a base, a top puff and a shadow
— run through a turbulence filter so the edges come out soft and uneven.
The layer is a container so the clouds can travel in `cqw` and cross any
window at the same visual speed regardless of its width.
*/

interface CloudsProps {
  /** Stable key so this window keeps the same sky between renders. */
  seed: string;
  /** Overall cloud size relative to a 240px base. */
  scale?: number;
}

export default function Clouds({ seed, scale = 0.38 }: CloudsProps) {
  const clouds = cloudSet(seed);

  return (
    <span
      className="cloud-layer"
      style={{ '--k': scale } as React.CSSProperties}
      aria-hidden="true"
    >
      {clouds.map((c, i) => (
        <span
          key={i}
          className="cloud animate-drift"
          style={
            {
              '--t': c.top,
              '--s': c.scale,
              '--d': c.duration,
              '--dl': c.delay,
              '--x0': c.startX,
              '--y1': c.driftY1,
              '--y2': c.driftY2,
              opacity: c.opacity,
            } as React.CSSProperties
          }
        >
          <span className={`puff puff-shade filter-cloud-${c.filter}`} />
          <span className={`puff puff-base filter-cloud-${c.filter}`} />
          <span className={`puff puff-top filter-cloud-${c.filter}`} />
        </span>
      ))}
    </span>
  );
}
