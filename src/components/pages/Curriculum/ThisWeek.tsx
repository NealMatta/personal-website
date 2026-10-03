import Link from 'next/link';
import type { Course, Quarter, QuarterClock } from '@/src/content/curriculum';
import {
  courseProgress,
  courseSteps,
  stepsForWeek,
} from '@/src/content/curriculum';
import StepList from '@/src/components/pages/Curriculum/StepList';

/*
What every class owes me this week, as one ledger.

A step or two a week per class is the whole design of the thing: if I
can't see the week at a glance, the quarter is too heavy. Each class sits
on the left and links to its page, its steps sit on the right, and one bar
across the top has a segment per step. A step that's done sinks under the
open ones, so what's left is always at the top of its class.
*/

interface ThisWeekProps {
  quarter: Quarter;
  clock: QuarterClock;
}

/* Why a class has nothing this week: not started, between steps, or done. */
function idleNote(course: Course, week: number): string {
  if (course.startWeek && week < course.startWeek)
    return `Starts week ${course.startWeek}.`;
  const last = Math.max(0, ...courseSteps(course).map((s) => s.week));
  return week > last
    ? 'Nothing this week. Class is done.'
    : 'Nothing due this week.';
}

export default function ThisWeek({ quarter, clock }: ThisWeekProps) {
  const running = clock.phase !== 'before';

  const classes = quarter.courses.map((course) => {
    const steps = stepsForWeek(course, clock.week);
    /* Open steps first, then done ones, each keeping its order. */
    return {
      course,
      steps: [...steps.filter((s) => !s.done), ...steps.filter((s) => s.done)],
    };
  });

  const segments = classes.flatMap(({ course, steps }) =>
    steps.map((s) => ({ course, step: s }))
  );
  const doneCount = segments.filter(({ step }) => step.done).length;

  return (
    <section className="flex flex-col gap-5 px-6 pt-14 lg:px-16">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="m-0 font-display text-3xl font-extrabold lg:text-[40px]">
          {running ? 'This week' : 'Up first: week 1'}
        </h2>
        <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite">
          Week {clock.week} · {clock.weekStart(clock.week)} –{' '}
          {clock.weekEnd(clock.week)}
        </span>
      </div>

      {segments.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-medium uppercase tracking-[.06em] text-ink">
            {doneCount} of {segments.length} done this week
          </span>
          <div className="flex h-2.5 gap-[3px]" aria-hidden="true">
            {segments.map(({ course, step }, i) => (
              <span
                key={`${course.slug}-${step.id ?? i}`}
                className="flex-1 rounded-[3px]"
                style={{
                  background: step.done ? course.accent : course.tint,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-[10px] border border-rule bg-card">
        {classes.map(({ course, steps }, i) => {
          const done = steps.filter((s) => s.done).length;
          const percent = steps.length
            ? Math.round((done / steps.length) * 100)
            : 0;
          const { behind } = courseProgress(course, clock);

          return (
            <div
              key={course.slug}
              className={`grid grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)] ${
                i > 0 ? 'border-t-2 border-rule' : ''
              }`}
            >
              <Link
                href={`/curriculum/${course.slug}`}
                className="group flex flex-col gap-1.5 border-b border-rule px-6 py-[18px] text-ink no-underline transition-colors hover:bg-wash focus-visible:bg-wash md:border-b-0 md:border-r"
              >
                <span className="flex items-center justify-between">
                  <span
                    className="rounded-[5px] px-2 py-1 font-mono text-xs font-medium uppercase tracking-[.06em]"
                    style={{ background: course.tint, color: course.accent }}
                  >
                    {course.code}
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-[13px] text-graphite transition-transform group-hover:translate-x-1 group-hover:text-ink group-focus-visible:translate-x-1"
                  >
                    →
                  </span>
                </span>
                <span>
                  <span className="sky-link font-display text-[19px] font-bold leading-tight group-hover:bg-[length:100%_2px] group-focus-visible:bg-[length:100%_2px]">
                    {course.title}
                  </span>
                </span>
                <span className="mt-1 flex items-center gap-2.5">
                  <span
                    className="block h-1.5 flex-1 overflow-hidden rounded-full"
                    style={{ background: course.tint }}
                  >
                    <span
                      className="block h-full rounded-full"
                      style={{
                        width: `${percent}%`,
                        background: course.accent,
                      }}
                    />
                  </span>
                  <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
                    {steps.length ? `${done} of ${steps.length}` : '—'} ·{' '}
                    {course.credits} cr
                  </span>
                </span>
                {behind > 0 && (
                  <span className="mt-1 self-start rounded-md bg-[var(--warn-bg)] px-2.5 py-1 text-[13px] text-[var(--warn-fg)]">
                    {behind} {behind === 1 ? 'step' : 'steps'} from earlier
                    weeks
                  </span>
                )}
              </Link>

              <div className="py-1.5 pl-5 pr-6">
                {steps.length > 0 ? (
                  <StepList course={course} steps={steps} divided />
                ) : (
                  <p className="m-0 py-[18px] text-[15px] text-graphite">
                    {idleNote(course, clock.week)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
