import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FieldNote from '@/src/components/pages/Writing/FieldNote';
import { getPost, postNeighbors, publishedPosts } from '@/src/lib/posts';

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return publishedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};

  return {
    title: `${post.title} — Neal Matta`,
    description: post.dek,
  };
}

export default async function FieldNotePage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const { previous, next } = postNeighbors(post.slug);

  return (
    <>
      <FieldNote post={post} />

      <section className="grid grid-cols-1 gap-6 px-6 pb-[72px] lg:grid-cols-12 lg:gap-x-6 lg:px-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-8 lg:col-start-3">
          {previous ? (
            <Link
              href={`/writing/${previous.slug}`}
              className="flex flex-col gap-2 border-t-2 border-ink py-6 no-underline"
            >
              <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite">
                ← Previous
              </span>
              <span className="font-display text-[22px] font-semibold">
                {previous.title}
              </span>
            </Link>
          ) : (
            <Link
              href="/writing"
              className="flex flex-col gap-2 border-t-2 border-ink py-6 no-underline"
            >
              <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite">
                ← Back to
              </span>
              <span className="font-display text-[22px] font-semibold">
                All field notes
              </span>
            </Link>
          )}

          {next && (
            <Link
              href={`/writing/${next.slug}`}
              className="flex flex-col gap-2 border-t-2 border-ink py-6 no-underline sm:text-right"
            >
              <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite">
                Next →
              </span>
              <span className="font-display text-[22px] font-semibold">
                {next.title}
              </span>
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
