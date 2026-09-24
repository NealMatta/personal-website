import type { Status } from '@/src/components/reusable/UI/StatusDot';

/*
Field notes: the shape of one, and the dates it prints.

The notes themselves are Markdown files in `src/content/field-notes/`,
one file per note, and `src/lib/posts.ts` reads them. This file stays
free of anything that touches the filesystem so client components (the
archive's filter pills) can import the type and the date helpers.
*/

export interface PostSection {
  /** Anchor for the "on this page" rail. */
  id: string;
  /** Empty for any writing that comes before the first `##` heading. */
  heading?: string;
  /** The section's Markdown, rendered. */
  html: string;
}

export interface Post {
  /** The file name, without `.md`. */
  slug: string;
  title: string;
  /** One line under the title. */
  dek: string;
  topic: string;
  /** ISO date, so ordering and formatting stay honest. */
  publishedAt: string;
  /** ISO date, only when the note has been edited since. */
  updatedAt?: string;
  /** Worked out from the word count unless the file sets it. */
  readingMinutes: number;
  /** Notes that are written but not published yet. */
  draft?: boolean;
  /** What the cover photo shows. Doubles as alt text once there's a src. */
  coverLabel: string;
  coverSrc?: string | null;
  sections: PostSection[];
  /** The one-line journey the data takes, when the note is about wiring. */
  dataPath?: string;
  /** The Lab experiment the note is about. */
  relatedLab?: { code: string; name: string; status: Status; blurb: string };
  /** The project the note came out of. */
  relatedProject?: { slug: string; name: string };
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
