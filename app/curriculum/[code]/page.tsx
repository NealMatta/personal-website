import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ClassDetail from '@/src/components/pages/Curriculum/ClassDetail';
import { allCourses, getCourse, quarterClock } from '@/src/content/curriculum';

type Params = Promise<{ code: string }>;

export const revalidate = 3600;

export function generateStaticParams() {
  return allCourses().map(({ course }) => ({ code: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const found = getCourse((await params).code);
  if (!found) return {};

  return {
    title: `${found.course.title} — Neal Matta`,
    description: `${found.course.code}, ${found.quarter.label}. Final: ${found.course.final}`,
  };
}

export default async function ClassPage({ params }: { params: Params }) {
  const found = getCourse((await params).code);

  if (!found) {
    notFound();
  }

  const { course, quarter } = found;
  const clock = quarterClock(quarter, new Date());

  /* The other classes in the same quarter, so a class isn't a dead end. */
  const siblings = quarter.courses.filter((c) => c.slug !== course.slug);

  return (
    <>
      <ClassDetail course={course} quarter={quarter} clock={clock} />

      {siblings.length > 0 && (
        <section className="flex flex-col gap-4 px-6 pb-[72px] lg:px-16">
          <h2 className="m-0 border-t-2 border-ink pt-6 font-mono text-xs uppercase tracking-[.06em] text-graphite">
            Also in {quarter.label}
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {siblings.map((sibling) => (
              <Link
                key={sibling.slug}
                href={`/curriculum/${sibling.slug}`}
                className="flex flex-col gap-1 rounded-[10px] border border-rule bg-card px-[18px] py-4 no-underline transition-colors hover:border-ink"
                style={{ borderTop: `5px solid ${sibling.accent}` }}
              >
                <span
                  className="font-mono text-xs font-medium uppercase tracking-[.06em]"
                  style={{ color: sibling.accent }}
                >
                  {sibling.code} · {sibling.credits} cr
                </span>
                <span className="font-display text-xl font-bold">
                  {sibling.title}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
