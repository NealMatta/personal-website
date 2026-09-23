import type { Status } from '@/src/components/reusable/UI/StatusDot';
import type { Section } from '@/src/types/content';

/*
Field notes.

Short write-ups of what I build and learn. Each one carries the same
shape a project case study does — a dek, a list of sections, and the
thing it's about — so the archive, the article and the "on this page"
rail all read from one file.

These live here as typed data for now; once the shape settles they move
to a real store and the pages stop importing this file.

The headings are real. Paragraphs still in [brackets] are mine to write.
*/

export interface Post {
  slug: string;
  title: string;
  /** One line under the title. */
  dek: string;
  topic: string;
  /** ISO date, so ordering and formatting stay honest. */
  publishedAt: string;
  /** ISO date, only when the note has been edited since. */
  updatedAt?: string;
  readingMinutes: number;
  /** Notes that are written but not published yet. */
  draft?: boolean;
  /** What the cover photo shows. Doubles as alt text once there's a src. */
  coverLabel: string;
  coverSrc?: string | null;
  sections: Section[];
  /** The one-line journey the data takes, when the note is about wiring. */
  dataPath?: string;
  /** The Lab experiment the note is about. */
  relatedLab?: { code: string; name: string; status: Status; blurb: string };
  /** The project the note came out of. */
  relatedProject?: { slug: string; name: string };
}

export const POSTS: Post[] = [
  {
    slug: 'caching-spotify-tokens-in-a-postgres-row',
    title: 'Caching Spotify tokens in a Postgres row',
    dek: 'Why my now-playing card only refreshes the token when it actually expires, and why one row in Supabase is enough.',
    topic: 'APIs',
    publishedAt: '2026-09-12',
    updatedAt: '2026-09-20',
    readingMinutes: 6,
    coverLabel:
      'The now-playing card on the home page, mid-refresh [replace with a real screenshot]',
    dataPath:
      'Spotify API → /api/spotify/recentSong → tokenManager.ts → spotify_tokens (id = 1) → React Query',
    relatedLab: {
      code: 'EXP-02',
      name: 'Now playing',
      status: 'live',
      blurb: 'The live card this note is about.',
    },
    relatedProject: {
      slug: 'personal-website-v3',
      name: 'Personal website v3',
    },
    sections: [
      {
        id: 'the-problem',
        heading: 'The problem',
        body: [
          '[Open with the problem in one or two sentences: a Spotify access token lasts an hour, the refresh token lasts forever, and asking for a new access token on every page load spends a request to learn something I already knew.]',
          '[Say what breaks when you get it wrong — rate limits, a card that flickers, a secret that ends up in the browser.]',
        ],
      },
      {
        id: 'one-row-id-1',
        heading: 'One row, id = 1',
        body: [
          '[Describe the table: a single row holding the access token and the moment it expires. There is only ever one of me, so there is only ever one row, and `id = 1` is the whole primary key story.]',
          '[Why a table rather than memory: serverless functions are cold more often than they are warm, so anything cached in a module variable is gone by the next request.]',
        ],
      },
      {
        id: 'refresh-on-expiry',
        heading: 'Refresh on expiry',
        body: [
          '[Walk through tokenManager.ts: read the row, compare the expiry to now, and only spend the refresh token once the stored one has actually run out.]',
        ],
      },
      {
        id: 'what-id-change',
        heading: "What I'd change",
        body: [
          '[The honest part: what this does not handle yet, and what I would do differently with a second consumer of the same token.]',
        ],
      },
    ],
  },
  {
    slug: 'card-client-view',
    title: 'Card → Client → View: how I structure live widgets',
    dek: 'A small pattern that keeps secrets on the server and components boring.',
    topic: 'Architecture',
    publishedAt: '2026-08-19',
    readingMinutes: 8,
    coverLabel:
      'The live wires row: three cards, three data sources [replace with a real screenshot]',
    dataPath:
      'External API → src/apiManagement → app/api route handler → Client (React Query) → View',
    relatedProject: {
      slug: 'personal-website-v3',
      name: 'Personal website v3',
    },
    sections: [
      {
        id: 'three-files-one-widget',
        heading: 'Three files, one widget',
        body: [
          '[Introduce the split: a server Card that renders the frame, a Client that owns the query, and a View that only knows about props.]',
        ],
      },
      {
        id: 'why-the-route-handler',
        heading: 'Why the route handler in the middle',
        body: [
          '[The secret never leaves the server. The browser talks to my own route, my route talks to the vendor, and the API key stays in the environment.]',
        ],
      },
      {
        id: 'loading-and-error-as-props',
        heading: 'Loading and error as props',
        body: [
          '[Why the View takes isLoading and isError rather than calling the hook itself: it makes every state something you can render on purpose.]',
        ],
      },
      {
        id: 'when-not-to-use-it',
        heading: 'When not to use it',
        body: [
          '[Pages that read from a content file render on the server and skip all of this. The pattern is for data that changes while you are looking at it.]',
        ],
      },
    ],
  },
  {
    slug: 'labeling-everything',
    title: 'Labeling everything: masking tape as a system',
    dek: 'IKEA bins, garage boxes, deli containers, and why this site works the same way.',
    topic: 'Organization',
    publishedAt: '2026-07-08',
    readingMinutes: 4,
    coverLabel: 'A shelf of labeled bins at home [replace with a real photo]',
    relatedProject: {
      slug: 'personal-website-v3',
      name: 'Personal website v3',
    },
    sections: [
      {
        id: 'the-bin-rule',
        heading: 'The bin rule',
        body: [
          '[The rule at home: a box without a label is a box you open twice. Write on the tape before the thing goes in.]',
        ],
      },
      {
        id: 'what-a-label-has-to-say',
        heading: 'What a label has to say',
        body: [
          '[A good label answers "is what I want in here?" from across the room. That is a different job from a title.]',
        ],
      },
      {
        id: 'the-site-is-a-shelf',
        heading: 'The site is a shelf',
        body: [
          '[How the same rule turned into this redesign: four numbered sections, a tape label on every box, and nothing filed anywhere it cannot be found again.]',
        ],
      },
    ],
  },
  {
    slug: 'cta-arrival-board',
    title: 'Building a CTA arrival board in an afternoon',
    dek: 'Polling, stale times and what “live” really means.',
    topic: 'Laboratory',
    publishedAt: '2026-06-24',
    readingMinutes: 5,
    coverLabel: 'The Red Line arrival board [replace with a real screenshot]',
    dataPath:
      'CTA Train Tracker → /api/cta/chicagoRedLine → React Query → View',
    relatedLab: {
      code: 'EXP-01',
      name: 'Chicago CTA',
      status: 'live',
      blurb: 'Can an arrival board stay useful with 60-second polling?',
    },
    sections: [
      {
        id: 'the-question',
        heading: 'The question',
        body: [
          '[What I was actually testing: whether a board that refreshes every sixty seconds is still worth looking at when the train is four minutes out.]',
        ],
      },
      {
        id: 'polling-vs-stale-time',
        heading: 'Polling vs stale time',
        body: [
          '[The two knobs React Query gives you, and why they are not the same knob.]',
        ],
      },
      {
        id: 'what-live-means',
        heading: 'What “live” means',
        body: [
          '[The conclusion: "live" is a promise about how wrong the number is allowed to be, not about how often you fetch. Print the age of the data on the card.]',
        ],
      },
    ],
  },
];

/** Newest first, drafts left out. */
export function publishedPosts(): Post[] {
  return POSTS.filter((p) => !p.draft).sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  );
}

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug && !p.draft);
}

/** Every topic in the archive, newest note first, with "All" in front. */
export function postTopics(): string[] {
  return ['All', ...new Set(publishedPosts().map((p) => p.topic))];
}

/**
 * The notes either side of this one. Older is "previous", because that's
 * the direction you read an archive in.
 */
export function postNeighbors(slug: string): {
  previous?: Post;
  next?: Post;
} {
  const ordered = publishedPosts();
  const i = ordered.findIndex((p) => p.slug === slug);
  if (i === -1) return {};
  return { previous: ordered[i + 1], next: ordered[i - 1] };
}

/** The short date the archive rows print, e.g. "Sep 2026". */
export function formatPostDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

/** The full date the byline prints, e.g. "Sep 12, 2026". */
export function formatPostDay(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
