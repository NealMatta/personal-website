/*
Field notes.

Short write-ups of what I build and learn. These live here as typed data
for now; once the shape settles they move to a real store and the pages
stop importing this file.
*/

export interface Post {
  slug: string;
  title: string;
  /** One line under the title. */
  dek: string;
  topic: string;
  /** ISO date, so ordering and formatting stay honest. */
  publishedAt: string;
  readingMinutes: number;
  /** Notes that are written but not published yet. */
  draft?: boolean;
}

export const POSTS: Post[] = [
  {
    slug: 'caching-spotify-tokens-in-a-postgres-row',
    title: 'Caching Spotify tokens in a Postgres row',
    dek: 'Why my now-playing card only refreshes the token when it actually expires.',
    topic: 'APIs',
    publishedAt: '2026-09-12',
    readingMinutes: 6,
  },
  {
    slug: 'card-client-view',
    title: 'Card → Client → View: how I structure live widgets',
    dek: 'A small pattern that keeps secrets on the server and components boring.',
    topic: 'Architecture',
    publishedAt: '2026-08-19',
    readingMinutes: 8,
  },
  {
    slug: 'labeling-everything',
    title: 'Labeling everything: masking tape as a system',
    dek: 'IKEA bins, garage boxes, deli containers, and why this site works the same way.',
    topic: 'Organization',
    publishedAt: '2026-07-08',
    readingMinutes: 4,
  },
  {
    slug: 'cta-arrival-board',
    title: 'Building a CTA arrival board in an afternoon',
    dek: 'Polling, stale times and what “live” really means.',
    topic: 'Laboratory',
    publishedAt: '2026-06-24',
    readingMinutes: 5,
  },
];

/** Newest first, drafts left out. */
export function publishedPosts(): Post[] {
  return POSTS.filter((p) => !p.draft).sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  );
}

/** The short date the archive rows print, e.g. "Sep 2026". */
export function formatPostDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}
