/*
The sky the whole site borrows its color from.

Six phases, picked from the visitor's local clock. Everything here is pure
and server-safe: the client passes in a Date (and, once EXP-05 lands, the
real sunrise and sunset for their city) and gets back a phase.
*/

export type SkyPhaseName =
  | 'midnight'
  | 'dawn'
  | 'sunrise'
  | 'midday'
  | 'sunset'
  | 'dusk';

export interface SkyPhase {
  name: SkyPhaseName;
  /** Shown on the hero window. */
  label: string;
  /** One line about what the sky is doing right now. */
  line: string;
  /** The gradient painted into every window. */
  gradient: string;
  /**
   * The gradient's colour stops on their own, so a shape that isn't a
   * window can rebuild it on a different axis — see `skyLine`.
   */
  stops: string[];
  /** Text color that clears 4.5:1 against that gradient. */
  ink: string;
  /** Lit and shaded faces of the drifting clouds. */
  cloudLight: string;
  cloudShade: string;
  cloudOpacity: number;
  /** Stars and the Big Dipper only come out at night. */
  night: boolean;
}

/*
A field of stars, painted as one background-image so the whole layer can
be faded in and out as a unit.
*/
const star = (x: number, y: number, r: number, alpha: number) =>
  `radial-gradient(circle at ${x}% ${y}%,rgba(255,255,255,${alpha}) 0 ${r}px,transparent ${r + 0.6}px)`;

const STARFIELD = [
  star(17, 34, 0.8, 0.6),
  star(39, 46, 0.8, 0.5),
  star(58, 6, 0.8, 0.6),
  star(76, 28, 0.8, 0.55),
  star(88, 36, 0.9, 0.6),
  star(12, 52, 0.8, 0.45),
  star(27, 60, 1, 0.5),
  star(47, 58, 0.8, 0.4),
  star(72, 54, 1, 0.45),
  star(86, 62, 0.8, 0.35),
  star(36, 4, 0.8, 0.6),
  star(97, 48, 0.8, 0.4),
  star(55, 70, 0.8, 0.3),
  star(20, 74, 0.8, 0.3),
].join(',');

export const SKY_PHASES: Record<SkyPhaseName, SkyPhase> = {
  midnight: {
    name: 'midnight',
    label: 'Midnight',
    line: 'The Big Dipper is up over Canton, and most of the house is asleep.',
    gradient: `${STARFIELD},linear-gradient(165deg,#070B1F 0%,#141B45 50%,#2A2C68 100%)`,
    stops: ['#070B1F', '#141B45', '#2A2C68'],
    ink: '#F4F1EA',
    cloudLight: '#9AA3D1',
    cloudShade: '#3A4078',
    cloudOpacity: 0.35,
    night: true,
  },
  dawn: {
    name: 'dawn',
    label: 'Dawn',
    line: 'First light. The sky is still deciding what color it wants to be.',
    gradient: 'linear-gradient(170deg,#28336A 0%,#6A6CA6 48%,#D6A8BE 100%)',
    stops: ['#28336A', '#6A6CA6', '#D6A8BE'],
    ink: '#F7F4FA',
    cloudLight: '#F6E3EC',
    cloudShade: '#9C8FB8',
    cloudOpacity: 0.8,
    night: false,
  },
  sunrise: {
    name: 'sunrise',
    label: 'Sunrise',
    line: 'The good hour. Coffee, and whatever I said I would finish yesterday.',
    gradient: 'linear-gradient(175deg,#6F9BD6 0%,#E9B3A8 55%,#FFD49A 100%)',
    stops: ['#6F9BD6', '#E9B3A8', '#FFD49A'],
    ink: '#1C1B19',
    cloudLight: '#FFF6EE',
    cloudShade: '#E3B7B0',
    cloudOpacity: 0.9,
    night: false,
  },
  midday: {
    name: 'midday',
    label: 'Midday',
    line: 'Full daylight. Somewhere between a build and a volleyball game.',
    gradient: 'linear-gradient(180deg,#2F7ED8 0%,#6EB0EC 55%,#B9DDF7 100%)',
    stops: ['#2F7ED8', '#6EB0EC', '#B9DDF7'],
    ink: '#10233D',
    cloudLight: '#FFFFFF',
    cloudShade: '#B9CBE0',
    cloudOpacity: 0.95,
    night: false,
  },
  sunset: {
    name: 'sunset',
    label: 'Sunset',
    line: 'The sky does its best work right as I stop looking at it.',
    gradient:
      'linear-gradient(175deg,#34427F 0%,#B55C86 42%,#F08A5D 75%,#FFC978 100%)',
    stops: ['#34427F', '#B55C86', '#F08A5D', '#FFC978'],
    ink: '#FFF8EE',
    cloudLight: '#FFE6D6',
    cloudShade: '#C77A86',
    cloudOpacity: 0.8,
    night: false,
  },
  dusk: {
    name: 'dusk',
    label: 'Dusk',
    line: 'Color draining out of the west. The stars are about to show up.',
    gradient: 'linear-gradient(170deg,#161B4A 0%,#4B3A7C 50%,#A65A86 100%)',
    stops: ['#161B4A', '#4B3A7C', '#A65A86'],
    ink: '#F7EEF4',
    cloudLight: '#E3CFE6',
    cloudShade: '#6D5A8E',
    cloudOpacity: 0.6,
    night: false,
  },
};

/** The phase the server renders before the visitor's clock is known. */
export const DEFAULT_PHASE = SKY_PHASES.midday;

export interface SunTimes {
  /** Minutes after local midnight. */
  sunrise: number;
  sunset: number;
}

/*
Chicago-ish equinox times. EXP-05 replaces these with the visitor's real
sunrise and sunset; until then every sky lines up with a reasonable day.
*/
export const DEFAULT_SUN_TIMES: SunTimes = {
  sunrise: 6 * 60 + 39,
  sunset: 18 * 60 + 48,
};

/**
 * Pick the phase for a moment in the visitor's own time zone.
 *
 * The boundaries are ordered and non-overlapping, so a day walks through
 * midnight → dawn → sunrise → midday → sunset → dusk → midnight.
 */
export function phaseFor(
  date: Date,
  sun: SunTimes = DEFAULT_SUN_TIMES
): SkyPhase {
  const minutes = date.getHours() * 60 + date.getMinutes();

  if (minutes >= sun.sunrise - 75 && minutes < sun.sunrise - 25) {
    return SKY_PHASES.dawn;
  }
  if (minutes >= sun.sunrise - 25 && minutes < sun.sunrise + 60) {
    return SKY_PHASES.sunrise;
  }
  if (minutes >= sun.sunrise + 60 && minutes < sun.sunset - 60) {
    return SKY_PHASES.midday;
  }
  if (minutes >= sun.sunset - 60 && minutes < sun.sunset + 30) {
    return SKY_PHASES.sunset;
  }
  if (minutes >= sun.sunset + 30 && minutes < sun.sunset + 90) {
    return SKY_PHASES.dusk;
  }
  return SKY_PHASES.midnight;
}

/** Format minutes-after-midnight the way the hero prints sun times. */
export function formatMinutes(minutes: number): string {
  const h24 = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  const suffix = h24 < 12 ? 'AM' : 'PM';
  return `${h12}:${String(m).padStart(2, '0')} ${suffix}`;
}

/** The tape label over the hero, which follows the same clock. */
export function greetingFor(date: Date): string {
  const hour = date.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

/**
 * The sky rebuilt on a horizontal axis, for the hairline above each
 * section.
 *
 * A window is tall enough to show a vertical gradient; a 3px rule is not,
 * so running the sky top to bottom there just reads as one flat color.
 * Turned on its side, the same colors travel the width of the page,
 * deepest on the left and fading out to the right.
 */
export function skyLine(phase: SkyPhase): string {
  return `linear-gradient(90deg, ${phase.stops.join(', ')})`;
}

/** The CSS custom properties a window needs to paint this phase. */
export function skyVars(phase: SkyPhase): React.CSSProperties {
  return {
    '--sky-gradient': phase.gradient,
    '--sky-ink': phase.ink,
    '--sky-cloud-light': phase.cloudLight,
    '--sky-cloud-shade': phase.cloudShade,
    '--sky-cloud-opacity': String(phase.cloudOpacity),
  } as React.CSSProperties;
}
