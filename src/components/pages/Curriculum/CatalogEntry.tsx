import type { CatalogCourse, StepKind } from '@/src/content/curriculum';

/*
One class in the catalog, printed the way a college prints its offerings:
code, title and credits, a line on what it's for, the midterm and the
final, and what it asks for every week. The full syllabus folds away
underneath, since most readers only want the summary.
*/

const KIND_LABEL: Record<StepKind, string> = {
  midterm: 'Midterm',
  final: 'Final',
  buffer: 'Buffer',
};

export default function CatalogEntry({ course }: { course: CatalogCourse }) {
  const steps = course.units.reduce((n, u) => n + u.steps.length, 0);
  const lastWeek = Math.max(0, ...course.units.map((u) => u.to));

  return (
    <article
      id={course.slug}
      className="flex scroll-mt-24 flex-col gap-5 rounded-[10px] border border-rule bg-card px-6 py-6"
      style={{ borderLeft: `5px solid ${course.accent}` }}
    >
      <header className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="font-mono text-xs font-medium uppercase tracking-[.06em]"
            style={{ color: course.accent }}
          >
            {course.code}
          </span>
          <span
            className="rounded-md px-2 py-1 font-mono text-[11px] uppercase tracking-[.06em]"
            style={{ background: course.tint, color: course.accent }}
          >
            {course.credits} credits
          </span>
          {lastWeek > 0 && (
            <span className="font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
              {lastWeek} weeks · {course.units.length} units
            </span>
          )}
        </div>
        <h2 className="m-0 font-display text-[28px] font-bold leading-tight">
          {course.title}
        </h2>
        <p className="m-0 max-w-[720px] text-base leading-relaxed text-copy">
          {course.why}
        </p>
      </header>

      <dl className="m-0 grid grid-cols-1 gap-5 border-t border-rule pt-5 lg:grid-cols-2">
        <div className="flex flex-col gap-1">
          <dt className="font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
            Midterm · Wk {course.midtermWeek}
          </dt>
          <dd className="m-0 text-base leading-snug">{course.midterm}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
            Final · Wk {course.finalWeek}
          </dt>
          <dd className="m-0 text-base leading-snug">{course.final}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
            Every week
          </dt>
          <dd className="m-0">
            <ul className="m-0 flex list-disc flex-col gap-1 pl-5 text-base leading-snug">
              {course.syllabus.weeklyMinimum.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
            When &amp; where
          </dt>
          <dd className="m-0 text-base leading-snug">
            {course.syllabus.whenWhere}
          </dd>
        </div>
      </dl>

      {course.units.length > 0 && (
        <details className="group border-t border-rule pt-4">
          <summary className="cursor-pointer list-none font-mono text-xs uppercase tracking-[.06em] text-graphite hover:text-ink [&::-webkit-details-marker]:hidden">
            <span className="inline-block transition-transform group-open:rotate-90">
              ›
            </span>{' '}
            Full syllabus · {steps} steps
          </summary>

          <div className="mt-4 flex flex-col gap-5">
            {course.units.map((unit) => (
              <div key={unit.n} className="flex flex-col gap-2">
                <div className="flex flex-wrap items-baseline gap-3 border-b border-rule pb-1.5">
                  <span
                    className="font-mono text-xs font-medium uppercase tracking-[.06em]"
                    style={{ color: course.accent }}
                  >
                    Unit {unit.n}
                  </span>
                  <span className="font-display text-lg font-semibold">
                    {unit.title}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
                    {unit.from === unit.to
                      ? `Wk ${unit.from}`
                      : `Wk ${unit.from}–${unit.to}`}
                  </span>
                </div>

                <ol className="m-0 flex list-none flex-col gap-1.5 p-0">
                  {unit.steps.map((step, i) => (
                    <li
                      key={step.id ?? i}
                      className="grid grid-cols-[52px_minmax(0,1fr)] gap-3 text-[15px] leading-snug"
                    >
                      <span className="pt-0.5 font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
                        Wk {step.week}
                      </span>
                      <span>
                        {step.kind && (
                          <span className="mr-2 rounded bg-wash px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[.06em] text-pencil">
                            {KIND_LABEL[step.kind]}
                          </span>
                        )}
                        {step.text}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </details>
      )}
    </article>
  );
}
