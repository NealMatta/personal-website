'use client';

import { useState } from 'react';
import Link from 'next/link';
import Chip from '@/src/components/reusable/UI/Chip';
import FilterPills from '@/src/components/reusable/UI/FilterPills';
import { formatPostDate, type Post } from '@/src/content/posts';

/*
Every note, newest first, narrowed by topic.

The filter is the only thing on the Field notes index that needs state,
so it's the only client component here — the rows themselves are plain
links and would render fine without it.
*/

interface NoteArchiveProps {
  posts: Post[];
  topics: string[];
}

export default function NoteArchive({ posts, topics }: NoteArchiveProps) {
  const [topic, setTopic] = useState('All');
  const shown =
    topic === 'All' ? posts : posts.filter((p) => p.topic === topic);

  return (
    <section className="grid grid-cols-1 gap-8 px-6 pb-20 pt-[72px] lg:grid-cols-12 lg:gap-x-6 lg:px-16">
      <div className="flex flex-col gap-5 lg:col-span-3">
        <h2 className="m-0 font-display text-4xl font-extrabold">All notes</h2>
        <FilterPills
          label="Filter by topic"
          options={topics}
          value={topic}
          onChange={setTopic}
          vertical
        />
      </div>

      <div className="flex flex-col border-t-2 border-ink lg:col-span-9">
        {shown.map((post) => (
          <Link
            key={post.slug}
            href={`/writing/${post.slug}`}
            className="group grid grid-cols-1 items-baseline gap-2 border-b border-rule py-6 no-underline sm:grid-cols-[130px_minmax(0,1fr)_120px_80px] sm:gap-6"
          >
            <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite">
              {formatPostDate(post.publishedAt)}
            </span>

            <div className="flex flex-col gap-1.5">
              <span className="font-display text-2xl font-semibold leading-tight group-hover:underline group-hover:underline-offset-4">
                {post.title}
              </span>
              <span className="text-base leading-snug text-pencil">
                {post.dek}
              </span>
            </div>

            <Chip className="justify-self-start">{post.topic}</Chip>

            <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite sm:justify-self-end">
              {post.readingMinutes} min
            </span>
          </Link>
        ))}

        {shown.length === 0 && (
          <p className="m-0 py-10 text-base text-pencil">
            Nothing filed under {topic} yet.
          </p>
        )}
      </div>
    </section>
  );
}
