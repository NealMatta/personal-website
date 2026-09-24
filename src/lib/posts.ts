import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { Post, PostSection } from '@/src/content/posts';

/*
Reads the field notes out of `src/content/field-notes/`.

One Markdown file is one note: the frontmatter carries the title, dek,
dates and whatever it's related to, and every `##` heading in the body
starts a section, which is what the "on this page" rail lists. Adding a
note means adding a file — no code, no database — and Vercel publishes it
on the next push.

Files whose names start with `_` (the template) are ignored.

Server-only: it reads the filesystem, so client components import from
`src/content/posts.ts` instead.
*/

const DIR = path.join(process.cwd(), 'src', 'content', 'field-notes');
const WORDS_PER_MINUTE = 225;

/** YAML turns a bare `2026-09-12` into a Date; the pages want the string. */
function isoDate(value: unknown): string | undefined {
  if (value == null || value === '') return undefined;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

/** "What I'd change" → "what-id-change", the way GitHub anchors headings. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/['’‘"“”`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Splits the body on `##` headings, leaving fenced code alone. A heading
 * can pin its own anchor with `## Heading {#my-anchor}`.
 */
function toSections(markdown: string): PostSection[] {
  const chunks: { heading?: string; id?: string; lines: string[] }[] = [
    { lines: [] },
  ];
  let inFence = false;

  for (const line of markdown.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    const match = !inFence && line.match(/^##\s+(.+?)\s*$/);
    if (match) {
      const custom = match[1].match(/^(.*?)\s*\{#([\w-]+)\}$/);
      chunks.push({
        heading: custom ? custom[1] : match[1],
        id: custom ? custom[2] : undefined,
        lines: [],
      });
    } else {
      chunks[chunks.length - 1].lines.push(line);
    }
  }

  const used = new Set<string>();
  return chunks
    .filter((c) => c.heading || c.lines.join('').trim())
    .map((c, i) => {
      let id = c.id ?? (c.heading ? slugify(c.heading) : `intro-${i}`);
      while (used.has(id)) id = `${id}-${i}`;
      used.add(id);
      return {
        id,
        heading: c.heading,
        html: marked.parse(c.lines.join('\n').trim(), {
          async: false,
          gfm: true,
        }) as string,
      };
    });
}

function readPost(file: string): Post {
  const slug = file.replace(/\.md$/, '');
  const { data, content } = matter(
    fs.readFileSync(path.join(DIR, file), 'utf8')
  );

  for (const field of ['title', 'dek', 'topic', 'publishedAt']) {
    if (!data[field]) {
      throw new Error(
        `Field note "${file}" is missing "${field}" in its frontmatter.`
      );
    }
  }

  const words = content.split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title: String(data.title),
    dek: String(data.dek),
    topic: String(data.topic),
    publishedAt: isoDate(data.publishedAt)!,
    updatedAt: isoDate(data.updatedAt),
    readingMinutes:
      Number(data.readingMinutes) ||
      Math.max(1, Math.ceil(words / WORDS_PER_MINUTE)),
    draft: data.draft === true,
    coverLabel: data.coverLabel ? String(data.coverLabel) : String(data.title),
    coverSrc: data.coverSrc ?? null,
    dataPath: data.dataPath,
    relatedLab: data.relatedLab,
    relatedProject: data.relatedProject,
    sections: toSections(content),
  };
}

let cache: Post[] | undefined;

function allPosts(): Post[] {
  /* Re-read in dev so an edited file shows up on refresh. */
  if (cache && process.env.NODE_ENV === 'production') return cache;
  cache = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .map(readPost);
  return cache;
}

/** Newest first, drafts left out. */
export function publishedPosts(): Post[] {
  return allPosts()
    .filter((p) => !p.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPost(slug: string): Post | undefined {
  return publishedPosts().find((p) => p.slug === slug);
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
