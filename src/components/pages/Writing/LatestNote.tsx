import Link from 'next/link';
import PhotoSlot from '@/src/components/reusable/UI/PhotoSlot';
import Tape from '@/src/components/reusable/UI/Tape';
import { formatPostDate, type Post } from '@/src/content/posts';

/*
The newest note, given the whole width and a piece of tape.

One box, one label: the same shape the featured project uses, so the two
sections read as the same shelf.
*/

export default function LatestNote({ post }: { post: Post }) {
  return (
    <section className="px-6 pt-14 lg:px-16">
      <Link
        href={`/writing/${post.slug}`}
        className="relative grid grid-cols-1 items-center gap-8 rounded-box border border-rule bg-card px-6 pb-8 pt-11 no-underline lg:grid-cols-2 lg:gap-x-8 lg:px-10"
      >
        <Tape tilt={-2} size={26} className="absolute -top-[18px] left-7">
          Latest
        </Tape>

        <PhotoSlot
          label={post.coverLabel}
          src={post.coverSrc}
          className="h-[240px] rounded-xl lg:h-[340px]"
          tone="paper"
          sizes="(max-width: 1024px) 100vw, 45vw"
        />

        <div className="flex flex-col gap-4">
          <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite">
            {formatPostDate(post.publishedAt)} · {post.topic} ·{' '}
            {post.readingMinutes} min read
          </span>
          <h2 className="m-0 font-display text-3xl font-extrabold leading-tight tracking-[-.01em] lg:text-[44px]">
            {post.title}
          </h2>
          <p className="m-0 text-lg leading-relaxed text-pencil lg:text-[19px]">
            {post.dek}
          </p>
          <span className="text-base font-semibold">Read the note →</span>
        </div>
      </Link>
    </section>
  );
}
