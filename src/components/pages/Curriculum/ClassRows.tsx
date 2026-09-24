import Link from 'next/link';
import type { Quarter, QuarterClock, Course } from '@/src/content/curriculum';
import {
  checkInsFor,
  courseProgress,
  formatCurriculumDay,
} from '@/src/content/curriculum';

/*
Every class in the quarter, one row each.

The row is the whole class in a line: what the final is, how far along
the units are, what's next, and whether I've shown up lately. The
segmented bar is one segment per unit, so a class that's three units deep
and stalled in the fourth reads differently from one that's evenly
behind.
*/

interface ClassRowsProps {
  quarter: Quarter;
  clock: QuarterClock;
}

/** The attendance note at the end of the row. */
function attendance(course: Course, clock: QuarterClock) {
  const [last] = checkInsFor(course.slug);

  if (last) {
    return {
      label: `Checked in ${formatCurriculumDay(last.at)}`,
      fg: '#1E6B3E',
      bg: '#DCEBDD',
    };
  }

  /* Nothing to be behind on before week 2. */
  if (clock.phase !== 'before' && clock.week > 1) {
    return {
      label: `No check-in in ${clock.week - 1} ${clock.week === 2 ? 'week' : 'weeks'}`,
      fg: '#8A4A12',
      bg: '#F6E6CC',
    };
  }

  return { label: 'No check-ins yet', fg: 'var(--graphite)', bg: '#ECE6D8' };
}

export default function ClassRows({ quarter, clock }: ClassRowsProps) {
  return (
    <section className="flex flex-col gap-3.5 px-6 pt-16 lg:px-16">
      <h2 className="m-0 mb-1.5 font-display text-3xl font-extrabold lg:text-[40px]">
        Classes
      </h2>

      {quarter.courses.map((course) => {
        const progress = courseProgress(course, clock);
        const note = attendance(course, clock);

        return (
          <Link
            key={course.slug}
            href={`/curriculum/${course.slug}`}
            className="group grid grid-cols-1 items-center gap-4 overflow-hidden rounded-xl border border-rule bg-card py-[22px] pl-5 pr-6 no-underline transition-[border-color,box-shadow] hover:border-ink hover:shadow-[0_8px_20px_rgba(28,27,25,.08)] lg:grid-cols-[6px_250px_250px_minmax(0,1fr)_200px_140px] lg:gap-6 lg:py-0 lg:pl-0"
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
              <span className="font-display text-2xl font-bold leading-tight group-hover:underline group-hover:underline-offset-4">
                {course.title}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
                Final · Wk {course.finalWeek}
                {course.finalOn.startsWith('Week')
                  ? ''
                  : ` · ${course.finalOn}`}
              </span>
              <span className="text-sm leading-snug text-marker">
                {course.final}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="flex gap-1">
                {progress.units.map((unit) => (
                  <span
                    key={unit.n}
                    title={`Unit ${unit.n}: ${unit.title}`}
                    className="h-2.5 basis-0 overflow-hidden rounded-full"
                    style={{ flexGrow: unit.total, background: course.tint }}
                  >
                    <span
                      className="block h-full rounded-full"
                      style={{
                        width: `${Math.round((unit.done / unit.total) * 100)}%`,
                        background: course.accent,
                      }}
                    />
                  </span>
                ))}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
                {progress.percent}% · {progress.done} of {progress.total} steps
                · {progress.units.length} units
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
                {progress.next?.week != null
                  ? `Next · Wk ${progress.next.week}`
                  : 'Next up'}
              </span>
              <span className="text-sm leading-snug">
                {progress.next ? progress.next.text : 'All steps done'}
              </span>
            </div>

            <span
              className="justify-self-start rounded-md px-2 py-[5px] font-mono text-[11px] uppercase tracking-[.06em]"
              style={{ color: note.fg, background: note.bg }}
            >
              {note.label}
            </span>
          </Link>
        );
      })}
    </section>
  );
}
