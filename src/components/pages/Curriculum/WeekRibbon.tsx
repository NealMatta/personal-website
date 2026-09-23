import type { Quarter, QuarterClock } from '@/src/content/curriculum';

/*
Thirteen weeks in a row.

The whole quarter at a glance: which week we're in, which ones are spent,
and where the exams fall. A filled dot is a final, a hollow one a midterm,
and a spent week is crossed out the way a paper calendar is.
*/

interface WeekRibbonProps {
  quarter: Quarter;
  clock: QuarterClock;
}

/* The pencil cross over a week that's gone. */
const CROSS =
  'linear-gradient(to top right, transparent calc(50% - 1px), rgba(28,27,25,.28) 50%, transparent calc(50% + 1px)), linear-gradient(to bottom right, transparent calc(50% - 1px), rgba(28,27,25,.28) 50%, transparent calc(50% + 1px))';

export default function WeekRibbon({ quarter, clock }: WeekRibbonProps) {
  const weeks = Array.from({ length: quarter.weeks }, (_, i) => i + 1);
  const running = clock.phase !== 'before';

  return (
    <section className="mx-6 flex flex-col gap-3.5 border-t-2 border-ink pt-5 lg:mx-16">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-mono text-xs uppercase tracking-[.06em] text-pencil">
          {quarter.weeks} weeks ·{' '}
          {running
            ? `Week ${clock.week} highlighted`
            : `Week 1 starts ${clock.weekStart(1)}`}
        </span>

        <span className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-ink" />
            <span className="font-mono text-[11px] uppercase tracking-[.06em] text-pencil">
              Final exam
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full border-2 border-ink" />
            <span className="font-mono text-[11px] uppercase tracking-[.06em] text-pencil">
              Midterm
            </span>
          </span>
        </span>
      </div>

      {/*
      Thirteen cells never fit a phone, so the ribbon scrolls sideways
      there and each cell keeps a readable floor.
      */}
      <div className="-mx-6 overflow-x-auto px-6 pb-1 lg:mx-0 lg:overflow-visible lg:px-0">
        <ol className="m-0 grid list-none grid-flow-col gap-1.5 p-0 [grid-auto-columns:minmax(96px,1fr)] lg:grid-flow-row lg:[grid-template-columns:repeat(13,minmax(0,1fr))]">
          {weeks.map((week) => {
            const now = running && week === clock.week;
            const spent = running && week < clock.week;

            const pins = quarter.courses.flatMap((course) => [
              ...(course.finalWeek === week
                ? [{ code: `${course.dept} final`, final: true, course }]
                : []),
              ...(course.midtermWeek === week
                ? [{ code: `${course.dept} mid`, final: false, course }]
                : []),
            ]);

            return (
              <li
                key={week}
                aria-current={now ? 'date' : undefined}
                className={`flex min-h-[104px] flex-col gap-1.5 rounded-[10px] border p-2.5 pb-3 ${
                  now
                    ? 'border-ink bg-ink text-paper'
                    : spent
                      ? 'border-rule bg-[#E6E0D2] opacity-60'
                      : 'border-rule bg-card'
                }`}
                style={spent ? { backgroundImage: CROSS } : undefined}
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[.06em]">
                    W{week}
                  </span>
                  <span className="text-[11px] opacity-75">
                    {clock.weekStart(week)}
                  </span>
                </div>

                {pins.map((pin) => (
                  <span
                    key={pin.code}
                    className="flex items-center gap-1.5"
                    title={pin.final ? 'Final exam' : 'Midterm'}
                  >
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full border-2"
                      style={{
                        borderColor: now ? 'var(--paper)' : pin.course.accent,
                        background: pin.final
                          ? now
                            ? 'var(--paper)'
                            : pin.course.accent
                          : 'transparent',
                      }}
                    />
                    <span className="font-mono text-[10px] uppercase tracking-[.04em]">
                      {pin.code}
                    </span>
                  </span>
                ))}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
