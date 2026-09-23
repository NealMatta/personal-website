import type { Status } from '@/src/components/reusable/UI/StatusDot';

/*
Projects: finished work with the thinking written down.

Two kinds of write-up live here. Software gets a case study — the problem,
the approach, how it's built, what I'd change. Things I made with my hands
get a build log instead: specs, steps, a cut list, and what went wrong.

Both come out of this file. Adding a project means adding an entry, not
touching a page.
*/

export type ProjectKind = 'software' | 'woodwork' | '3d-print';

/** The chip on a project card. Each kind gets its own quiet tint. */
export const KIND_STYLE: Record<
  ProjectKind,
  { label: string; background: string; color: string }
> = {
  software: { label: 'Software', background: '#DDEBF1', color: '#1F5F80' },
  woodwork: { label: 'Woodwork', background: '#F1E6D8', color: '#7A4E24' },
  '3d-print': { label: '3D print', background: '#E6E3F1', color: '#4B4380' },
};

export interface Section {
  /** Anchor for the "on this page" rail. */
  id: string;
  heading: string;
  /** One string per paragraph. */
  body: string[];
}

interface ProjectBase {
  slug: string;
  /** The name on the tape label. */
  name: string;
  tilt: number;
  status: Status;
  /** One sentence for the card. */
  summary: string;
  /** The headline on the write-up, which can be longer than the name. */
  title: string;
  /** The line under that headline. */
  dek: string;
  /** Where it came from: a Lab experiment, a class, a pile of offcuts. */
  origin: string;
  stack: string[];
  finishedAt: string | null;
  featured?: boolean;
  coverLabel: string;
  coverSrc?: string | null;
  sections: Section[];
}

export interface SoftwareProject extends ProjectBase {
  kind: 'software';
  role: string;
  /** e.g. "Aug – Sep 2026". */
  built: string;
  links: { label: string; href: string }[];
  /** The three ideas that shaped it, as small taped cards. */
  approach?: { label: string; tilt: number; text: string }[];
  /** The one-line journey the data takes. */
  dataPath?: string;
  /** Lab experiments this grew out of. */
  fromLab?: { code: string; name: string }[];
  relatedNotes?: { title: string; slug: string }[];
}

export interface BuildProject extends ProjectBase {
  kind: 'woodwork' | '3d-print';
  /** Dimensions, build time, cost, finished — shown in the masthead. */
  specs: { label: string; value: string }[];
  /** Wood, finish, hardware — shown in the "Made with" box. */
  materials: { label: string; value: string }[];
  tools: string[];
  steps: { title: string; body: string; photoLabel: string }[];
  cutList?: { part: string; qty: string; size: string }[];
  detailPhotoLabels?: string[];
  downloads?: { label: string; href: string }[];
  /** If it was a class final, the class it came from. */
  fromCurriculum?: { code: string; name: string };
}

export type Project = SoftwareProject | BuildProject;

export function isBuild(project: Project): project is BuildProject {
  return project.kind === 'woodwork' || project.kind === '3d-print';
}

export const PROJECTS: Project[] = [
  {
    slug: 'personal-website-v3',
    kind: 'software',
    name: 'Personal website v3',
    tilt: -2,
    status: 'live',
    featured: true,
    title: 'A second brain I can actually find things in',
    dek: 'One labeled box for every kind of thing I make, a sky that follows your clock, and small live widgets I built for practice.',
    summary:
      'The site you’re on. Rebuilt around labeled boxes and the time of day where you are.',
    origin: 'From EXP-02, EXP-03, EXP-05',
    stack: ['Next.js 15', 'Supabase', 'Tailwind', 'React Query', 'TypeScript'],
    role: 'Design, build, writing',
    built: 'Aug – Sep 2026',
    finishedAt: '2026-09-23',
    coverLabel: 'The home page: the hero sky, the shelf, and the live wires',
    coverSrc: '/projects/personal-website-v3.png',
    links: [
      { label: 'Visit the site', href: '/' },
      {
        label: 'View on GitHub',
        href: 'https://github.com/NealMatta/personal-website',
      },
    ],
    approach: [
      {
        label: 'Boxes',
        tilt: -2,
        text: 'One labeled box per kind of thing: projects, the Lab, writing, and the rest.',
      },
      {
        label: 'Sky',
        tilt: 1.5,
        text: 'Six sky phases picked from your local time, with drifting clouds and the Big Dipper at night.',
      },
      {
        label: 'Live wires',
        tilt: -1,
        text: 'Small widgets built for practice, each with a note on how I built it.',
      },
    ],
    dataPath: 'Source API → /api/route → Supabase cache → React Query → card',
    fromLab: [
      { code: 'EXP-05', name: 'Sky clock' },
      { code: 'EXP-02', name: 'Now playing' },
      { code: 'EXP-03', name: 'Site status' },
    ],
    relatedNotes: [
      {
        title: 'Caching Spotify tokens in a Postgres row',
        slug: 'caching-spotify-tokens-in-a-postgres-row',
      },
      {
        title: 'Labeling everything: masking tape as a system',
        slug: 'labeling-everything',
      },
    ],
    sections: [
      {
        id: 'the-problem',
        heading: 'The problem',
        body: [
          'Everything I make ended up somewhere different. Code on GitHub, recipes in Notion, half-finished experiments on a branch nobody merged, and notes in whichever app I had open. None of it was lost exactly, but finding any particular thing meant remembering where I had put it.',
          'The previous version of this site didn’t help, because it was a portfolio. It showed a few finished things to people who might hire me, and had nowhere to put the unfinished ones. So the unfinished ones stayed scattered.',
        ],
      },
      {
        id: 'the-approach',
        heading: 'The approach',
        body: [
          'If it isn’t labeled, I’ll lose it, so the site works like the boxes at home. Three ideas shaped it:',
        ],
      },
      {
        id: 'how-its-built',
        heading: 'How it’s built',
        body: [
          'Next.js App Router, with a hard split: everything under app/ is a route, a layout or an API handler, and everything else lives in src/. External APIs are only ever called from the server, so no key ever reaches the browser.',
          'The live widgets all follow the same shape. A server component wraps a client component that runs a React Query fetch against an internal route, and that route calls a function in src/apiManagement. The card that finally renders is presentational and takes loading and error states as props, which makes it easy to look at in isolation.',
          'The sky is the one piece of genuine state. It picks one of six phases from the visitor’s own clock, and paints a gradient, drifting clouds, and — after dark — stars and the Big Dipper. The cloud layout comes from a seeded generator so the server and the browser lay out identical skies.',
        ],
      },
      {
        id: 'what-id-change',
        heading: 'What I’d change',
        body: [
          'I seeded the cloud generator to keep hydration stable, then shuffled the cloud bands with sort(() => random() - 0.5). Sort calls its comparator a different number of times in Node than in Chrome, so the two drained the generator differently and every single page load threw a hydration mismatch. A seeded generator only buys you determinism if every draw from it is fixed in count and order — a Fisher-Yates shuffle, not a random comparator.',
          'The other thing: I built the design system and the home page before deciding where the writing and curriculum content would actually live. That was the right call for the look, but it means a few boxes on the shelf currently say "coming next" rather than opening.',
        ],
      },
    ],
  },
  {
    slug: 'henna-and-harmony',
    kind: 'software',
    name: 'Henna & Harmony',
    tilt: 1.5,
    status: 'live',
    title: 'A wedding platform built for the weddings I grew up with',
    dek: 'A planning platform for South Asian and multicultural weddings, where the multi-day, multi-event shape is the default rather than an edge case.',
    summary:
      'A wedding platform for South Asian and multicultural weddings, which I co-founded.',
    origin: 'Co-founded',
    stack: ['[Stack]'],
    role: 'Co-founder',
    built: '[Start] – present',
    finishedAt: null,
    coverLabel: '[Screenshot: Henna & Harmony]',
    links: [],
    sections: [
      {
        id: 'the-problem',
        heading: 'The problem',
        body: [
          '[Two or three sentences: what mainstream wedding tools assume, and where that breaks down for a multi-day celebration with several sides of a family involved.]',
        ],
      },
      {
        id: 'the-approach',
        heading: 'The approach',
        body: ['[What you built first, and why that piece.]'],
      },
      {
        id: 'what-id-change',
        heading: 'What I’d change',
        body: ['[One honest thing you’d do differently.]'],
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/** Newest first; anything unfinished sorts to the front. */
export function projectsByRecency(): Project[] {
  return [...PROJECTS].sort((a, b) =>
    (b.finishedAt ?? '9999').localeCompare(a.finishedAt ?? '9999')
  );
}

export function featuredProject(): Project | undefined {
  return PROJECTS.find((p) => p.featured);
}

export function formatFinished(project: Project): string {
  if (!project.finishedAt) return 'In progress';

  const when = new Date(`${project.finishedAt}T12:00:00`).toLocaleDateString(
    'en-US',
    { month: 'short', year: 'numeric' }
  );
  return `Finished ${when}`;
}
