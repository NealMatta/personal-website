import type { Status } from '@/src/components/reusable/UI/StatusDot';

/*
The Laboratory.

Things I try before they earn a spot on the shelf. Each one says what I'm
testing, what it runs on, and whether it works yet. The question matters
more than the result — a failed experiment still belongs here.
*/

export interface Experiment {
  /** EXP-01, EXP-02… the label on the tape is the name, this is the code. */
  code: string;
  name: string;
  tilt: number;
  status: Status;
  /** What this experiment is actually testing. */
  question: string;
  stack: string[];
  /** Where it can be seen, if anywhere yet. */
  href?: string;
  /** ISO date last worked on; absent for things that are still just ideas. */
  touchedAt?: string;
}

export const EXPERIMENTS: Experiment[] = [
  {
    code: 'EXP-01',
    name: 'Chicago CTA',
    tilt: -2,
    status: 'live',
    question: 'Can a train arrival board stay useful with 60-second polling?',
    stack: ['CTA API', 'React Query', 'Route handlers'],
    href: '/lab/chicagoCTA',
    touchedAt: '2026-06-24',
  },
  {
    code: 'EXP-02',
    name: 'Now playing',
    tilt: 1.5,
    status: 'live',
    question:
      'Caching OAuth tokens in one Supabase row instead of a cache service.',
    stack: ['Spotify API', 'Supabase', 'OAuth'],
    href: '/',
    touchedAt: '2026-09-12',
  },
  {
    code: 'EXP-03',
    name: 'Site status',
    tilt: -1,
    status: 'live',
    question:
      'Showing how active the build is, using nothing but the GitHub API.',
    stack: ['GitHub REST', 'TypeScript'],
    href: '/',
    touchedAt: '2026-08-19',
  },
  {
    code: 'EXP-04',
    name: 'Home dashboard',
    tilt: 2,
    status: 'prototype',
    question:
      'One screen for everything important at home. What belongs on it?',
    stack: ['Next.js layouts', 'Supabase auth'],
    href: '/lab/dashboard',
    touchedAt: '2026-05-02',
  },
  {
    code: 'EXP-05',
    name: 'Sky clock',
    tilt: -1.5,
    status: 'idea',
    question:
      'Theme the site from real sunrise and sunset times for the visitor’s city.',
    stack: ['Sunrise API', 'CSS gradients'],
  },
];

/** Counts for the masthead, in the order the design shows them. */
export function experimentCounts() {
  const by = (status: Status) =>
    EXPERIMENTS.filter((e) => e.status === status).length;

  return [
    { value: by('live'), label: 'Live' },
    { value: by('prototype'), label: 'Prototype' },
    { value: by('idea'), label: 'Idea' },
  ];
}

/** Most recently touched first; ideas, having no date, sort last. */
export function experimentsByRecency(): Experiment[] {
  return [...EXPERIMENTS].sort((a, b) =>
    (b.touchedAt ?? '').localeCompare(a.touchedAt ?? '')
  );
}

export function formatTouched(experiment: Experiment): string {
  if (!experiment.touchedAt) return 'Proposed';

  const when = new Date(`${experiment.touchedAt}T12:00:00`).toLocaleDateString(
    'en-US',
    { month: 'short', year: 'numeric' }
  );
  return `Touched ${when}`;
}
