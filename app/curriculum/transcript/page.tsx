import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/src/components/reusable/UI/Breadcrumb';
import PageIntro from '@/src/components/reusable/UI/PageIntro';
import {
  courseGrade,
  formatCurriculumDay,
  quarters,
  transcriptTotals,
} from '@/src/content/curriculum';

export const metadata: Metadata = {
  title: 'Transcript — Neal Matta',
  description:
    'Every class I’ve taken, by quarter. Credits only count once the final is passed.',
};

/*
The transcript.

One table per quarter, oldest habits and all. A quarter still being
planned prints in dashes, because nothing has been attempted yet — and
credits stay uncounted until the final is passed.
*/
export default function Transcript() {
  const totals = transcriptTotals();
  const terms = quarters();

  return (
    <>
      <div className="mx-6 pt-10 lg:mx-16">
        <Breadcrumb
          trail={[
            { label: 'Home', href: '/' },
            { label: 'Curriculum', href: '/curriculum' },
            { label: 'Transcript' },
          ]}
        />
      </div>

      <PageIntro
        title="Transcript"
        description="Every class I’ve taken, by quarter. Credits only count once the final is passed."
        stats={[
          {
            value: `${totals.earned}/${totals.attempted}`,
            label: 'Credits earned',
          },
          {
            value: `${totals.passed}/${totals.classes}`,
            label: 'Classes passed',
          },
          { value: totals.checkIns, label: 'Check-ins' },
        ]}
      />

      {terms.map((quarter) => {
        const planning = quarter.state === 'planning';

        return (
          <section
            key={quarter.slug}
            className="flex flex-col gap-3 px-6 pt-12 lg:px-16"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2
                className={`m-0 font-display text-[32px] font-extrabold ${
                  planning ? 'text-graphite' : ''
                }`}
              >
                <Link
                  href={`/curriculum?quarter=${quarter.slug}`}
                  className="sky-link no-underline"
                >
                  {quarter.label}
                </Link>{' '}
                <span className="text-[22px] font-normal text-graphite">
                  · {planning ? 'planned' : quarter.name}
                </span>
              </h2>
              <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite">
                {quarter.range}
              </span>
            </div>

            <div
              className={`flex flex-col ${
                planning
                  ? 'border-t border-dashed border-[#9A948A]'
                  : 'border-t-2 border-ink'
              }`}
            >
              {/* Column heads are for columns: an empty quarter has none. */}
              {quarter.courses.length > 0 && (
                <div className="hidden grid-cols-[130px_minmax(0,1fr)_110px_110px_150px] gap-6 border-b border-rule py-3 font-mono text-[11px] uppercase tracking-[.06em] text-graphite lg:grid">
                  <span>Code</span>
                  <span>Class</span>
                  <span>Credits</span>
                  <span>Grade</span>
                  <span className="text-right">Passed</span>
                </div>
              )}

              {quarter.courses.length === 0 ? (
                <p className="m-0 py-8 text-base text-pencil">
                  Nothing planned in {quarter.label} yet.
                </p>
              ) : (
                quarter.courses.map((course) => {
                  const grade = courseGrade(course);

                  return (
                    <Link
                      key={course.slug}
                      href={`/curriculum/${course.slug}`}
                      className="group grid grid-cols-1 items-baseline gap-2 border-b border-rule py-[18px] no-underline lg:grid-cols-[130px_minmax(0,1fr)_110px_110px_150px] lg:gap-6"
                    >
                      <span
                        className="font-mono text-xs font-medium uppercase tracking-[.06em]"
                        style={{ color: course.accent }}
                      >
                        {course.code}
                      </span>

                      <span className="font-display text-xl font-semibold group-hover:underline group-hover:underline-offset-4">
                        {course.title}
                      </span>

                      <span className="text-base">{course.credits}</span>

                      <span
                        title={grade.title}
                        className="justify-self-start rounded px-2 py-1 font-mono text-[11px] uppercase tracking-[.06em]"
                        style={{ background: grade.bg, color: grade.fg }}
                      >
                        {grade.grade}
                      </span>

                      <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite lg:text-right">
                        {course.passedOn
                          ? formatCurriculumDay(course.passedOn)
                          : '—'}
                      </span>
                    </Link>
                  );
                })
              )}
            </div>
          </section>
        );
      })}

      <p className="m-0 px-6 pb-20 pt-6 font-mono text-[11px] uppercase tracking-[.06em] text-graphite lg:px-16">
        P passed · IP in progress · INC incomplete, rolls into next quarter · W
        withdrawn
      </p>
    </>
  );
}
