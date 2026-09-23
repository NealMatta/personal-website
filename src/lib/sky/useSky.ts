'use client';

import { useEffect, useState } from 'react';
import {
  DEFAULT_PHASE,
  DEFAULT_SUN_TIMES,
  greetingFor,
  phaseFor,
  type SkyPhase,
  type SunTimes,
} from './phases';

interface Sky {
  phase: SkyPhase;
  /** The visitor's local time, ticking once a minute. */
  now: Date | null;
  greeting: string;
  sun: SunTimes;
  /** False until the visitor's clock is known, so SSR and hydration agree. */
  ready: boolean;
}

/*
The server has no idea what time it is where you are, so the first paint
uses the default sky and the real one arrives on mount. Everything that
reads this hook has to look right in both states.
*/
export function useSky(sun: SunTimes = DEFAULT_SUN_TIMES): Sky {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());

    // Tick on the minute rather than every second: the clock only shows
    // hours and minutes, and the phase moves slower still.
    const tick = () => setNow(new Date());
    const msToNextMinute = 60_000 - (Date.now() % 60_000);
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      tick();
      interval = setInterval(tick, 60_000);
    }, msToNextMinute);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return {
    phase: now ? phaseFor(now, sun) : DEFAULT_PHASE,
    now,
    greeting: now ? greetingFor(now) : 'Hello',
    sun,
    ready: now !== null,
  };
}
