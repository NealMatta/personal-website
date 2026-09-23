import Link from 'next/link';
import type { Quarter, QuarterClock } from '@/src/content/curriculum';
import { courseProgress, stepsForWeek } from '@/src/content/curriculum';
import StepList from '@/src/components/pages/Curriculum/StepList';

/*
What every class owes me this week, in one row of cards.

One step a week per class is the whole design of the thing: if I can't
see the week's four steps at once, the quarter is too heavy.
*/

interface ThisWeekProps {
  quarter: Quarter;
  clock: QuarterClock;
}

export default function ThisWeek({ quarter, clock }: ThisWeekProps) {
  const running = clock.phase !== 'before';

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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quarter.courses.map((course) => {
          const steps = stepsForWeek(course, clock.week);
          const { behind } = courseProgress(course, clock);

          return (
            <div
              key={course.slug}
              className="flex flex-col gap-2 rounded-[10px] border border-rule bg-card px-[18px] pb-4"
              style={{ borderTop: `5px solid ${course.accent}` }}
            >
              <div className="flex items-baseline justify-between pt-3.5">
                <Link
                  href={`/curriculum/${course.slug}`}
                  className="sky-link font-mono text-xs font-medium uppercase tracking-[.06em] no-underline"
                  style={{ color: course.accent }}
                >
                  {course.code}
                </Link>
                <span className="font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
                  {course.credits} cr
                </span>
              </div>

              <span className="font-display text-xl font-bold">
                {course.title}
              </span>

              {steps.length > 0 ? (
                <StepList course={course} steps={steps} />
              ) : (
                <span className="py-2.5 text-sm text-graphite">
                  Nothing this week. Class is done.
                </span>
              )}

              {behind > 0 && (
                <span className="self-start rounded-md bg-[#F6E6CC] px-2.5 py-1.5 text-[13px] text-[#8A4A12]">
                  {behind} {behind === 1 ? 'step' : 'steps'} from earlier weeks
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
