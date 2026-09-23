import { skyVars, type SkyPhase } from '@/src/lib/sky/phases';
import BigDipper from './BigDipper';
import Clouds from './Clouds';

/*
A window onto the sky.

This is the only place color is allowed on the page: the hero widget, the
quote block, the logo mark. Everything else stays paper and ink. Children
render on top of the weather, so give them `relative`.
*/

interface SkyWindowProps {
  phase: SkyPhase;
  /** Stable key so this window keeps its own cloud arrangement. */
  seed: string;
  className?: string;
  /** Cloud scale; banners want bigger clouds than cards. */
  cloudScale?: number;
  /** Where the Big Dipper sits, on night skies. */
  dipperClassName?: string;
  children?: React.ReactNode;
}

const STARS = {
  a: 'radial-gradient(circle at 8% 12%,rgba(255,255,255,1) 0 1.2px,rgba(255,255,255,.3) 2.2px,transparent 4.2px),radial-gradient(circle at 44% 14%,rgba(255,255,255,1) 0 1.1px,rgba(255,255,255,.3) 2.1px,transparent 4.1px),radial-gradient(circle at 5% 28%,rgba(255,255,255,1) 0 1.1px,rgba(255,255,255,.3) 2.1px,transparent 4.1px)',
  b: 'radial-gradient(circle at 24% 8%,rgba(255,255,255,1) 0 1.1px,rgba(255,255,255,.3) 2.1px,transparent 4.1px),radial-gradient(circle at 52% 30%,rgba(255,255,255,1) 0 1.3px,rgba(255,255,255,.3) 2.3px,transparent 4.3px),radial-gradient(circle at 15% 20%,rgba(255,255,255,1) 0 1.1px,rgba(255,255,255,.3) 2.1px,transparent 4.1px),radial-gradient(circle at 34% 34%,rgba(255,255,255,1) 0 1.1px,rgba(255,255,255,.3) 2.1px,transparent 4.1px)',
  c: 'radial-gradient(circle at 31% 22%,rgba(255,255,255,1) 0 1.6px,rgba(255,255,255,.3) 2.6px,transparent 4.6px),radial-gradient(circle at 48% 38%,rgba(255,255,255,1) 0 1.1px,rgba(255,255,255,.3) 2.1px,transparent 4.1px)',
};

export default function SkyWindow({
  phase,
  seed,
  className = '',
  cloudScale = 0.38,
  dipperClassName = 'top-6 right-7 w-[190px] h-[251px]',
  children,
}: SkyWindowProps) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        ...skyVars(phase),
        background: phase.gradient,
        color: phase.ink,
      }}
    >
      {phase.night && (
        <>
          <span
            className="twinkle-layer animate-twinkle"
            style={{ background: STARS.a }}
            aria-hidden="true"
          />
          <span
            className="twinkle-layer twinkle-layer-b animate-twinkle"
            style={{ background: STARS.b }}
            aria-hidden="true"
          />
          <span
            className="twinkle-layer twinkle-layer-c animate-twinkle"
            style={{ background: STARS.c }}
            aria-hidden="true"
          />
          <BigDipper className={dipperClassName} />
        </>
      )}
      <Clouds seed={seed} scale={cloudScale} />
      {children}
    </div>
  );
}
