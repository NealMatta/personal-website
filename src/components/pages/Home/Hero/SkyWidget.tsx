'use client';

import { useEffect, useState } from 'react';
import SkyWindow from '@/src/components/reusable/sky/SkyWindow';
import { placeFromTimeZone } from '@/src/lib/sky/place';
import {
  formatMinutes,
  type SkyPhase,
  type SunTimes,
} from '@/src/lib/sky/phases';

/*
The primary widget: what the sky looks like where you are, right now.

Until the visitor's clock has been read the window shows the default sky
with the text held back, so the server-rendered markup and the first
client render agree.
*/

interface SkyWidgetProps {
  phase: SkyPhase;
  now: Date | null;
  sun: SunTimes;
}

export default function SkyWidget({ phase, now, sun }: SkyWidgetProps) {
  const [place, setPlace] = useState<string | null>(null);

  useEffect(() => setPlace(placeFromTimeZone()), []);

  const clock = now
    ? now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      })
    : null;

  const date = now
    ? now.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <SkyWindow
      phase={phase}
      seed="hero"
      className="h-full rounded-window"
      cloudScale={0.85}
      dipperClassName="top-6 right-7 w-[190px] h-[251px]"
    >
      <div className="relative flex h-full flex-col justify-between p-7">
        <div className="flex flex-col gap-1">
          <span className="text-[15px] font-semibold">{place ?? ' '}</span>
          <span className="font-display text-[72px] font-normal leading-none">
            {clock ?? ' '}
          </span>
          <span className="mt-1 text-[15px] font-medium">{date ?? ' '}</span>
        </div>

        <div className="flex flex-col gap-3.5">
          <span className="max-w-[360px] text-[17px] leading-snug">
            {phase.line}
          </span>
          <div className="flex gap-6">
            <span className="font-mono text-xs uppercase tracking-[.06em]">
              Sunrise {formatMinutes(sun.sunrise)}
            </span>
            <span className="font-mono text-xs uppercase tracking-[.06em]">
              Sunset {formatMinutes(sun.sunset)}
            </span>
          </div>
        </div>
      </div>
    </SkyWindow>
  );
}
