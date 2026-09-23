import type { Quarter } from '@/src/content/curriculum';
import { CREDIT_LOAD, quarterCredits } from '@/src/content/curriculum';

/*
A quarter that hasn't started.

There's no week to be in and nothing to be behind on, so a planning
quarter shows the classes and the finals they're pointed at — and says
plainly when a syllabus hasn't been written yet.
*/

export default function PlannedClasses({ quarter }: { quarter: Quarter }) {
  const credits = quarterCredits(quarter);

  return (
    <section className="mx-6 flex flex-col gap-3.5 border-t-2 border-ink pb-20 pt-6 lg:mx-16">
      <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="m-0 font-display text-3xl font-extrabold lg:text-[40px]">
          Planned classes
        </h2>
        <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite">
          {credits} of ~{CREDIT_LOAD} credits planned
        </span>
      </div>

      {quarter.courses.length === 0 ? (
        <div className="flex flex-col gap-2 py-8">
          <span className="font-display text-2xl font-bold">
            Nothing planned yet
          </span>
          <span className="max-w-[560px] text-base leading-relaxed text-pencil">
            Classes I&rsquo;d like to take land here first, rough ideas
            included. Each one gets a syllabus before the quarter starts.
          </span>
        </div>
      ) : (
        quarter.courses.map((course) => (
          <div
            key={course.slug}
            className="grid grid-cols-1 items-center gap-4 overflow-hidden rounded-xl border border-rule bg-card py-[22px] pl-5 pr-6 lg:grid-cols-[6px_280px_minmax(0,1fr)_200px] lg:gap-6 lg:py-0 lg:pl-0"
          >
            {/* The class color: a full-width cap stacked, an edge in a row. */}
            <span
              aria-hidden="true"
              className="-ml-5 -mr-6 -mt-[22px] mb-1 block h-1.5 lg:m-0 lg:h-auto lg:self-stretch"
              style={{ background: course.accent }}
            />

            <div className="flex flex-col gap-1 lg:py-[22px]">
              <span
                className="font-mono text-xs font-medium uppercase tracking-[.06em]"
                style={{ color: course.accent }}
              >
                {course.code} · {course.credits} cr
              </span>
              <span className="font-display text-[26px] font-bold leading-tight">
                {course.title}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
                Final exam
              </span>
              <span className="text-base leading-snug">{course.final}</span>
            </div>

            <span className="justify-self-start rounded-md bg-[#ECE6D8] px-2 py-[5px] font-mono text-[11px] uppercase tracking-[.06em] text-pencil">
              {course.units.length > 0
                ? `${course.units.length} units`
                : 'Syllabus not built yet'}
            </span>
          </div>
        ))
      )}
    </section>
  );
}
