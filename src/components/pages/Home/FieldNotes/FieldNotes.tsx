import Link from 'next/link';
import Chip from '@/src/components/reusable/UI/Chip';
import SectionHeading from '../SectionHeading';
import { publishedPosts, formatPostDate } from '@/src/content/posts';

/*
The four most recent field notes, each row opening the note it names.
*/

export default function FieldNotes() {
  const posts = publishedPosts().slice(0, 4);

  return (
    <section className="flex flex-col gap-8 px-6 pb-16 lg:px-16">
      <SectionHeading title="Field notes" meta="Newest first" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-6">
        <div className="flex flex-col gap-4 lg:col-span-4">
          <p className="m-0 text-base leading-relaxed text-pencil">
            Short write-ups of what I build and learn. New posts go out on
            LinkedIn too.
          </p>
          <Link href="/writing" className="text-[15px] font-semibold">
            All field notes →
          </Link>
        </div>

        <div className="flex flex-col lg:col-span-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/writing/${post.slug}`}
              className="group grid grid-cols-1 items-baseline gap-2 border-b border-rule py-6 no-underline sm:grid-cols-[120px_minmax(0,1fr)_160px] sm:gap-6"
            >
              <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite">
                {formatPostDate(post.publishedAt)}
              </span>

              <div className="flex flex-col gap-1.5">
                <h3 className="m-0 font-display text-2xl font-semibold leading-tight group-hover:underline group-hover:underline-offset-4">
                  {post.title}
                </h3>
                <p className="m-0 text-[15px] leading-snug text-pencil">
                  {post.dek}
                </p>
              </div>

              <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-1.5">
                <Chip>{post.topic}</Chip>
                <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite">
                  {post.readingMinutes} min
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
